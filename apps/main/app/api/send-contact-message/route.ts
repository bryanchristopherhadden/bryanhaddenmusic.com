import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '../../lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Send contact form email to Bryan
    const emailResult = await sendContactEmail(
      'bryanchrishadden@gmail.com', // Send to Bryan
      name,
      email,
      subject,
      message
    );

    if (emailResult.success) {
      console.log(`Contact form message sent from ${name} (${email})`);
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully'
      });
    } else {
      console.error('Failed to send contact form email:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Failed to process contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}