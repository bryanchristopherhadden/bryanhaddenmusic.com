import { NextRequest, NextResponse } from 'next/server';
import { sendDownloadEmail } from '../../lib/email-service';

// Generate secure download token
function generateDownloadToken(identifier: string, productType: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return Buffer.from(`${identifier}:${productType}:${timestamp}:${random}`).toString('base64');
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
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate secure download token (valid for 24 hours) - use email as identifier
    const downloadToken = generateDownloadToken(email, 'music_beats');
    
    // Get base URL (use environment variable or construct from request)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   `${request.nextUrl.protocol}//${request.nextUrl.host}`;
    
    // Get download links based on actual purchased items
    const downloadLinks = getDownloadLinks(cartItems, downloadToken, baseUrl);
    
    console.log(`Sending download links to ${email}${phoneNumber ? ` and ${phoneNumber}` : ''}`);
    console.log(`Download token: ${downloadToken}`);
    console.log(`Cart items: ${cartItems.length} items`, cartItems);

    let smsSent = false;
    let emailSent = false;

    // Skip SMS - Twilio not configured
    console.log('Phone number not provided or Twilio not configured - skipping SMS');

    // Send email with download links
    const productType = cartItems.length > 0 ? 'music_beats' : 'music_beats'; // Determine product type
    const emailResult = await sendDownloadEmail(email, downloadLinks, phoneNumber || '', productType, cartItems);
    if (emailResult.success) {
      console.log(`Download links email sent to ${email}`);
      emailSent = true;
    } else {
      console.error('Failed to send download links email:', emailResult.error);
    }

    // CRITICAL: Ensure email delivery succeeded (SMS is optional)
    if (!emailSent) {
      console.error('CRITICAL: Email delivery failed!');
      return NextResponse.json(
        { 
          error: 'Failed to deliver download links via email',
          downloadToken,
          downloadLinks,
          fallbackLinks: downloadLinks // Include links as fallback
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Download links sent via ${smsSent && emailSent ? 'SMS and email' : smsSent ? 'SMS' : 'email'}`,
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
