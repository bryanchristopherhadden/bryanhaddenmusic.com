import { NextRequest, NextResponse } from 'next/server';
import { setVerificationCode } from '../../lib/verification-store';
import { sendVerificationEmail } from '../../lib/email-service';

// Initialize Twilio client (much faster than AWS!)
const twilio = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN ? 
  require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN) : null;

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, email } = await request.json();

    // Validate phone number
    if (!phoneNumber || !/^\+?[\d\s\-\(\)]+$/.test(phoneNumber)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store the code with 10 minute expiration
    setVerificationCode(phoneNumber, code, 10 * 60 * 1000);

    // Debug environment variables
    console.log('Twilio Debug Info:', {
      hasTwilio: !!twilio,
      hasAccountSid: !!process.env.TWILIO_ACCOUNT_SID,
      hasAuthToken: !!process.env.TWILIO_AUTH_TOKEN,
      hasPhoneNumber: !!process.env.TWILIO_PHONE_NUMBER,
      phoneNumber: process.env.TWILIO_PHONE_NUMBER,
      isTollFree: process.env.TWILIO_PHONE_NUMBER?.startsWith('+18'),
      warning: process.env.TWILIO_PHONE_NUMBER?.startsWith('+18') ? 'Toll-free numbers require verification!' : null
    });

    let smsSent = false;
    let emailSent = false;

    // Send real SMS via Twilio (instant setup!)
    if (twilio && process.env.TWILIO_PHONE_NUMBER) {
      try {
        // Format phone number for SMS (ensure it has country code)
        let formattedPhone = phoneNumber.replace(/\D/g, ''); // Remove non-digits
        if (!formattedPhone.startsWith('1') && formattedPhone.length === 10) {
          formattedPhone = '1' + formattedPhone; // Add US country code
        }
        formattedPhone = '+' + formattedPhone;

        console.log(`Attempting to send SMS from ${process.env.TWILIO_PHONE_NUMBER} to ${formattedPhone}`);

        const message = await twilio.messages.create({
          body: `Your Bryan Hadden Music verification code is: ${code}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: formattedPhone
        });

        console.log(`SMS sent successfully! Message SID: ${message.sid}, Code: ${code}`);
        smsSent = true;
      } catch (smsError) {
        console.error('SMS sending failed:', smsError);
        console.log(`Fallback code for ${phoneNumber}: ${code}`);
        // Continue anyway - user can still use the code from logs for testing
      }
    } else {
      console.log('Twilio not configured - using fallback');
      console.log(`SMS Code for ${phoneNumber}: ${code}`); // Fallback for testing
    }

    // Send verification email if email is provided
    if (email) {
      const emailResult = await sendVerificationEmail(email, code, phoneNumber);
      if (emailResult.success) {
        console.log(`Verification email sent to ${email}`);
        emailSent = true;
      } else {
        console.error('Failed to send verification email:', emailResult.error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Verification code sent via ${smsSent ? 'SMS' : ''}${smsSent && emailSent ? ' and ' : ''}${emailSent ? 'email' : ''}`,
      smsSent,
      emailSent,
    });

  } catch (error) {
    console.error('SMS sending failed:', error);
    return NextResponse.json(
      { error: 'Failed to send SMS' },
      { status: 500 }
    );
  }
}

