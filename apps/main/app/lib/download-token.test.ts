import { beforeEach, describe, expect, it } from 'vitest';
import { createDownloadToken, verifyDownloadToken } from './download-token';

const DAY_MS = 24 * 60 * 60 * 1000;

describe('download tokens', () => {
  beforeEach(() => {
    process.env.DOWNLOAD_TOKEN_SECRET = 'test-secret';
  });

  it('accepts a valid token', () => {
    const token = createDownloadToken('a@example.com', 'uberblack', 1000);
    expect(verifyDownloadToken(token, 2000)).toMatchObject({ email: 'a@example.com', itemId: 'uberblack' });
  });

  it('rejects an expired token', () => {
    const token = createDownloadToken('a@example.com', 'uberblack', 1000);
    expect(verifyDownloadToken(token, 1000 + DAY_MS)).toBeNull();
  });

  it('rejects a tampered payload', () => {
    const [, signature] = createDownloadToken('a@example.com', 'uberblack').split('.');
    const forged = Buffer.from(JSON.stringify({ email: 'a@example.com', itemId: 'toptier', expires: Date.now() + DAY_MS })).toString('base64url');
    expect(verifyDownloadToken(`${forged}.${signature}`)).toBeNull();
  });

  it('rejects a token signed with another secret', () => {
    const token = createDownloadToken('a@example.com', 'uberblack');
    process.env.DOWNLOAD_TOKEN_SECRET = 'other-secret';
    expect(verifyDownloadToken(token)).toBeNull();
  });

  it('rejects the old unsigned token format', () => {
    const legacy = Buffer.from(`a@example.com:music_beats:${Date.now()}:abc`).toString('base64');
    expect(verifyDownloadToken(legacy)).toBeNull();
  });

  it('fails closed without a secret', () => {
    delete process.env.DOWNLOAD_TOKEN_SECRET;
    expect(() => createDownloadToken('a@example.com', 'uberblack')).toThrow();
  });
});
