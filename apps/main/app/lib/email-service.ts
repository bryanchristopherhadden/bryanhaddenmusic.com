import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  // For development, you can use Gmail or any SMTP service
  // For production, consider using SendGrid, AWS SES, or similar
  return nodemailer.createTransport({
    service: 'gmail', // You can change this to your preferred service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your app password
    },
  });
};

// Email template for verification code
export function createVerificationEmailTemplate(
  verificationCode: string,
  phoneNumber: string
): { subject: string; html: string; text: string } {
  const subject = `🎵 Bryan Hadden Music - Verification Code`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verification Code</title>
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
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #1a1a1a;
          margin-bottom: 10px;
        }
        .code-section {
          background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
          color: white;
          border-radius: 12px;
          padding: 30px;
          margin: 20px 0;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .verification-code {
          font-size: 36px;
          font-weight: bold;
          letter-spacing: 8px;
          margin: 20px 0;
          background: rgba(255, 255, 255, 0.15);
          padding: 20px;
          border-radius: 8px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
        }
        .warning {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 6px;
          padding: 15px;
          margin: 20px 0;
          color: #856404;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🎵 Bryan Hadden Music</div>
          <h1>Verification Code</h1>
          <p>Please use this code to verify your phone number and complete your purchase.</p>
        </div>
        
        <div class="code-section">
          <h3>Your Verification Code</h3>
          <div class="verification-code">${verificationCode}</div>
          <p>Enter this code in the verification field to continue</p>
        </div>
        
        <div class="warning">
          <strong>⏰ Important:</strong> This verification code will expire in 10 minutes for security reasons.
        </div>
        
        <div style="margin-top: 30px;">
          <p>If you didn't request this verification code, please ignore this email.</p>
          <p>For security, never share this code with anyone.</p>
        </div>
        
        <div class="footer">
          <p>Thank you for your interest in Bryan Hadden Music! 🎶</p>
          <p>© 2024 Bryan Hadden Music. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
🎵 Bryan Hadden Music - Verification Code

Please use this code to verify your phone number and complete your purchase.

Your Verification Code: ${verificationCode}

Enter this code in the verification field to continue.

⏰ Important: This verification code will expire in 10 minutes for security reasons.

If you didn't request this verification code, please ignore this email.
For security, never share this code with anyone.

Thank you for your interest in Bryan Hadden Music! 🎶
© 2024 Bryan Hadden Music. All rights reserved.
  `;
  
  return { subject, html, text };
}

// Send verification email
export async function sendVerificationEmail(
  to: string,
  verificationCode: string,
  phoneNumber: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if email service is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('Email service not configured - skipping verification email');
      return { success: false, error: 'Email service not configured' };
    }

    const transporter = createTransporter();
    const { subject, html, text } = createVerificationEmailTemplate(verificationCode, phoneNumber);

    const mailOptions = {
      from: `"Bryan Hadden Music" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully:', result.messageId);
    
    return { success: true };
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Email template for download links
export function createDownloadEmailTemplate(
  downloadLinks: string[],
  phoneNumber: string,
  productType: string,
  cartItems: any[] = []
): { subject: string; html: string; text: string } {
  const productName = productType === 'music_beats' ? 'Beats' : 
                     productType === 'music_songs' ? 'Songs' : 'Music';
  
  const subject = `🎵 Your Bryan Hadden Music ${productName} Downloads Are Ready!`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Music Downloads</title>
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
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #1a1a1a;
          margin-bottom: 10px;
        }
        .download-section {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 25px;
          margin: 20px 0;
          border: 1px solid #e9ecef;
        }
        .download-link {
          display: block;
          background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
          color: white;
          text-decoration: none;
          padding: 15px 25px;
          border-radius: 8px;
          margin: 12px 0;
          text-align: center;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .download-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          background: linear-gradient(135deg, #333333 0%, #1a1a1a 100%);
        }
        .track-info {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.8);
          margin-top: 5px;
        }
        .warning {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 6px;
          padding: 15px;
          margin: 20px 0;
          color: #856404;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🎵 Bryan Hadden Music</div>
          <h1>Your Downloads Are Ready!</h1>
          <p>Thank you for your purchase! Your ${productName} downloads are ready for you.</p>
        </div>
        
        <div class="download-section">
          <h3>Download Your Music</h3>
          <p>Click any of the links below to download your files:</p>
          
          ${downloadLinks.map((link, index) => {
            const trackName = cartItems[index] ? cartItems[index].title : `Track ${index + 1}`;
            const trackType = cartItems[index] ? cartItems[index].type : 'Purchase';
            return `
              <a href="${link}" class="download-link">
                Download ${trackName}
                <div class="track-info">${trackType.charAt(0).toUpperCase() + trackType.slice(1)}</div>
              </a>
            `;
          }).join('')}
        </div>
        
        <div class="warning">
          <strong>⏰ Important:</strong> These download links will expire in 24 hours for security reasons. 
          Please download your files soon!
        </div>
        
        <div style="margin-top: 30px;">
          <h3>Need Help?</h3>
          <p>If you have any issues with your downloads or need assistance, please contact us at:</p>
          <ul>
            <li>📧 Email: support@bryanhaddenmusic.com</li>
            <li>📱 Phone: ${phoneNumber}</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>Thank you for supporting independent music! 🎶</p>
          <p>© 2024 Bryan Hadden Music. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
🎵 Bryan Hadden Music - Your Downloads Are Ready!

Thank you for your purchase! Your ${productName} downloads are ready for you.

Download Links:
${downloadLinks.map((link, index) => {
  const trackName = cartItems[index] ? cartItems[index].title : `Track ${index + 1}`;
  return `${index + 1}. ${trackName} - ${link}`;
}).join('\n')}

⏰ Important: These download links will expire in 24 hours for security reasons.

Need Help?
Email: support@bryanhaddenmusic.com
Phone: ${phoneNumber}

Thank you for supporting independent music! 🎶
© 2024 Bryan Hadden Music. All rights reserved.
  `;
  
  return { subject, html, text };
}

// Send email with download links
export async function sendDownloadEmail(
  to: string,
  downloadLinks: string[],
  phoneNumber: string,
  productType: string,
  cartItems: any[] = []
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if email service is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('Email service not configured - skipping email send');
      return { success: false, error: 'Email service not configured' };
    }

    const transporter = createTransporter();
    const { subject, html, text } = createDownloadEmailTemplate(downloadLinks, phoneNumber, productType, cartItems);

    const mailOptions = {
      from: `"Bryan Hadden Music" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    
    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
