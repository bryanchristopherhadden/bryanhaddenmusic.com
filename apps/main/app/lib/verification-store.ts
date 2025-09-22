// Simple in-memory store for demo purposes
// In production, use Redis, database, or other persistent storage
interface VerificationData {
  code: string;
  expires: number;
}

export const verificationCodes = new Map<string, VerificationData>();

export const setVerificationCode = (phoneNumber: string, code: string, expiresInMs: number = 600000) => {
  const expires = Date.now() + expiresInMs;
  verificationCodes.set(phoneNumber, { code, expires });
};

export const getVerificationCode = (phoneNumber: string): VerificationData | undefined => {
  return verificationCodes.get(phoneNumber);
};

export const removeVerificationCode = (phoneNumber: string): boolean => {
  return verificationCodes.delete(phoneNumber);
};

export const isCodeExpired = (data: VerificationData): boolean => {
  return Date.now() > data.expires;
};
