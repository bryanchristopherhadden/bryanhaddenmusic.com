import { NextRequest, NextResponse } from 'next/server';
import { getVerificationCode, removeVerificationCode, isCodeExpired } from '../../lib/verification-store';

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, code } = await request.json();

    // Validate input
    if (!phoneNumber || !code) {
      return NextResponse.json(
        { error: 'Phone number and code are required' },
        { status: 400 }
      );
    }

    // Get stored verification data
    const storedData = getVerificationCode(phoneNumber);

    if (!storedData) {
      return NextResponse.json(
        { error: 'No verification code found for this phone number' },
        { status: 404 }
      );
    }

    // Check if code has expired
    if (isCodeExpired(storedData)) {
      removeVerificationCode(phoneNumber);
      return NextResponse.json(
        { error: 'Verification code has expired' },
        { status: 400 }
      );
    }

    // Verify the code (accept test codes for demo)
    if (storedData.code !== code && code !== '123456' && code !== '000000') {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Code is valid, remove it from storage
    removeVerificationCode(phoneNumber);

    // In a real app, you might want to create a session or JWT token here
    const verificationToken = `verified_${phoneNumber}_${Date.now()}`;

    return NextResponse.json({
      success: true,
      message: 'Phone number verified successfully',
      verificationToken,
    });

  } catch (error) {
    console.error('SMS verification failed:', error);
    return NextResponse.json(
      { error: 'Failed to verify SMS code' },
      { status: 500 }
    );
  }
}
