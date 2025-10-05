# Email Service Setup Guide

## Current Issue
The contact form is failing because email service environment variables are not configured.

## Solution: Set up Gmail SMTP

### Step 1: Create Environment Variables File
Create a file called `.env.local` in your `apps/main/` directory with the following content:

```bash
# Email Configuration for Contact Form
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Step 2: Gmail Setup
1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this 16-character password (not your regular Gmail password)

### Step 3: Update .env.local
Replace the placeholders with your actual values:
```bash
EMAIL_USER=bryanchrishadden@gmail.com
EMAIL_PASSWORD=abcd-efgh-ijkl-mnop  # Your actual app password
```

### Alternative: Use SendGrid (Recommended for Production)
For production, consider using SendGrid instead:

```bash
# In .env.local
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_FROM=bryanchrishadden@gmail.com
```

Then update the email service to use SendGrid instead of Gmail SMTP.

## Restart Required
After setting up the environment variables, restart your development server:
```bash
npm run dev
```

## Testing
Once configured, the contact form should work without the "Email service not configured" error.
