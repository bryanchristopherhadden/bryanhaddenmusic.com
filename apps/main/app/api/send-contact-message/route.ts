import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create email transporter using the same Google app configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Email template for contact form
function createContactEmailTemplate(
  name: string,
  email: string,
  subject: string,
  message: string
): { subject: string; html: string; text: string } {
  const emailSubject = `Portfolio Contact: ${subject}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Portfolio Contact</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #667eea;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #1a1a1a;
          margin-bottom: 10px;
        }
        .contact-info {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          border-left: 4px solid #667eea;
        }
        .message-section {
          background: #ffffff;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .message-content {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 6px;
          border-left: 3px solid #667eea;
          white-space: pre-wrap;
          font-family: inherit;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          color: #666;
          font-size: 14px;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">💼 Portfolio Contact</div>
          <h1>New Contact Form Submission</h1>
          <p>Someone has reached out through your portfolio contact form.</p>
        </div>
        
        <div class="contact-info">
          <h3>Contact Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
        </div>
        
        <div class="message-section">
          <h3>Message</h3>
          <div class="message-content">${message}</div>
        </div>
        
        <div class="footer">
          <p>This message was sent from your portfolio contact form.</p>
          <p>Reply directly to this email to respond to ${name}.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
Portfolio Contact Form Submission

Contact Details:
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

This message was sent from your portfolio contact form.
Reply directly to this email to respond to ${name}.
  `;
  
  return { subject: emailSubject, html, text };
}

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

    // Check if email service is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('Email service not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const transporter = createTransporter();
    const { subject: emailSubject, html, text } = createContactEmailTemplate(name, email, subject, message);

    const mailOptions = {
      from: `"Bryan Hadden Portfolio" <${process.env.EMAIL_USER}>`,
      to: 'bryanchrishadden@gmail.com',
      replyTo: email, // Set reply-to as the sender's email
      subject: emailSubject,
      text: text,
      html: html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully:', result.messageId);
    
    return NextResponse.json({
      success: true,
      message: 'Contact message sent successfully'
    });

  } catch (error) {
    console.error('Failed to send contact email:', error);
    return NextResponse.json(
      { error: 'Failed to send contact message' },
      { status: 500 }
    );
  }
}
