import { createHmac, timingSafeEqual } from 'crypto';

const TOKEN_LIFETIME_MS = 24 * 60 * 60 * 1000; // 24 hours

export interface DownloadTokenPayload {
  email: string;
  itemId: string;
  expires: number;
}

function sign(encodedPayload: string): Buffer {
  const secret = process.env.DOWNLOAD_TOKEN_SECRET;
  if (!secret) {
    throw new Error('DOWNLOAD_TOKEN_SECRET is not configured');
  }
  return createHmac('sha256', secret).update(encodedPayload).digest();
}

export function createDownloadToken(email: string, itemId: string, now: number = Date.now()): string {
  const payload: DownloadTokenPayload = { email, itemId, expires: now + TOKEN_LIFETIME_MS };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${encodedPayload}.${sign(encodedPayload).toString('base64url')}`;
}

// Returns the payload only if the signature is valid and the token has not expired
export function verifyDownloadToken(token: string, now: number = Date.now()): DownloadTokenPayload | null {
  const [encodedPayload, signature, ...rest] = token.split('.');
  if (!encodedPayload || !signature || rest.length > 0) {
    return null;
  }

  const expected = sign(encodedPayload);
  const received = Buffer.from(signature, 'base64url');
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) {
    return null;
  }

  const payload: DownloadTokenPayload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString());
  return payload.expires > now ? payload : null;
}
