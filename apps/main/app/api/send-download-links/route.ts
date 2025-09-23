import { NextRequest, NextResponse } from 'next/server';
import { sendDownloadEmail } from '../../lib/email-service';

// Initialize Twilio client
const twilio = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN ? 
  require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN) : null;

// Generate secure download token
function generateDownloadToken(phoneNumber: string, productType: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return Buffer.from(`${phoneNumber}:${productType}:${timestamp}:${random}`).toString('base64');
}

// Get download links based on actual purchased items
function getDownloadLinks(cartItems: any[], token: string, baseUrl: string) {
  if (!cartItems || cartItems.length === 0) {
    // Fallback if no cart items provided
    return [
      `${baseUrl}/api/download?token=${token}&file=beats&index=0`,
      `${baseUrl}/api/download?token=${token}&file=beats&index=1`,
    ];
  }

  // Generate links for each purchased item
  return cartItems.map((item, index) => {
    // Determine file type based on item properties or default to beats
    const fileType = item.type === 'lease' ? 'beats' : 'beats'; // You can adjust this logic
    return `${baseUrl}/api/download?token=${token}&file=${fileType}&index=${index}&itemId=${item.id}`;
  });
}

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, email, cartItems = [], paymentIntentId } = await request.json();

    // Validate input
    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate secure download token (valid for 24 hours)
    const downloadToken = generateDownloadToken(phoneNumber, 'music_beats'); // Use default product type for token
    
    // Get base URL (use environment variable or construct from request)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   `${request.nextUrl.protocol}//${request.nextUrl.host}`;
    
    // Get download links based on actual purchased items
    const downloadLinks = getDownloadLinks(cartItems, downloadToken, baseUrl);
    
    // Format phone number for SMS
    let formattedPhone = phoneNumber.replace(/\D/g, '');
    if (!formattedPhone.startsWith('1') && formattedPhone.length === 10) {
      formattedPhone = '1' + formattedPhone;
    }
    formattedPhone = '+' + formattedPhone;

    // Create SMS message with download links
    const message = `🎵 Your Bryan Hadden Music downloads are ready!\n\n` +
                   `Click these links to download:\n\n` +
                   downloadLinks.map((link, index) => `${index + 1}. ${link}`).join('\n') +
                   `\n\nLinks expire in 24 hours. Enjoy your music! 🎶`;

    console.log(`Sending download links to ${formattedPhone} and ${email}`);
    console.log(`Download token: ${downloadToken}`);
    console.log(`Cart items: ${cartItems.length} items`, cartItems);

    let smsSent = false;
    let emailSent = false;

    // Send SMS with download links
    if (twilio && process.env.TWILIO_PHONE_NUMBER) {
      try {
        const smsResult = await twilio.messages.create({
          body: message,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: formattedPhone
        });

        console.log(`Download links SMS sent! Message SID: ${smsResult.sid}`);
        smsSent = true;
        
      } catch (smsError) {
        console.error('Failed to send download links SMS:', smsError);
      }
    } else {
      console.log('Twilio not configured - skipping SMS');
    }

    // Send email with download links
    const productType = cartItems.length > 0 ? 'music_beats' : 'music_beats'; // Determine product type
    const emailResult = await sendDownloadEmail(email, downloadLinks, phoneNumber, productType, cartItems);
    if (emailResult.success) {
      console.log(`Download links email sent to ${email}`);
      emailSent = true;
    } else {
      console.error('Failed to send download links email:', emailResult.error);
    }

    // CRITICAL: Ensure at least one delivery method succeeded
    if (!smsSent && !emailSent) {
      console.error('CRITICAL: Both SMS and email delivery failed!');
      return NextResponse.json(
        { 
          error: 'Failed to deliver download links via any method',
          downloadToken,
          downloadLinks,
          fallbackLinks: downloadLinks // Include links as fallback
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Download links sent via ${smsSent ? 'SMS' : ''}${smsSent && emailSent ? ' and ' : ''}${emailSent ? 'email' : ''}`,
      downloadToken,
      downloadLinks,
      smsSent,
      emailSent,
      // Include links in response for testing/fallback
      fallbackLinks: downloadLinks
    });

  } catch (error) {
    console.error('Failed to send download links:', error);
    return NextResponse.json(
      { error: 'Failed to send download links' },
      { status: 500 }
    );
  }
}
