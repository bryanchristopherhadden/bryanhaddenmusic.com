# Bryan Hadden Music - Documentation

This folder contains documentation for the Bryan Hadden Music website and application.

## Project Structure

- `apps/main/` - Main Next.js application
- `packages/shared/` - Shared components and utilities
- `docs/` - Project documentation

## Features

- Music streaming and purchase
- SMS verification system
- Stripe payment integration
- Portfolio showcase

## Development

See the main README.md in the root directory for setup instructions.

**Development Mode:**
- Local testing charges only **$0.50** instead of full price (Stripe minimum)
- Production charges the full amount as expected
- Automatic detection based on `NODE_ENV`

## API Endpoints

- `/api/send-sms` - Send SMS verification code
- `/api/verify-sms` - Verify SMS code
- `/api/create-payment-intent` - Create Stripe payment intent

## Testing

### SMS/Email Verification Test Codes
- `000000` - Test verification code (always passes)
- `123456` - Alternative test verification code (always passes)

**Verification Delivery:**
- Codes sent via **both SMS and email** for maximum convenience
- Users can check either their phone or email for the verification code
- Same 6-digit code works from both delivery methods

### Stripe Test Card Numbers

**Successful Payment:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., `12/25`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any 5-digit code (e.g., `12345`)

**Failed Payment (Declined):**
- Card: `4000 0000 0000 0002`
- Expiry: Any future date (e.g., `12/25`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any 5-digit code (e.g., `12345`)

**Other Test Cards:**
- `4000 0000 0000 9995` - Insufficient funds
- `4000 0000 0000 0069` - Expired card
- `4000 0000 0000 0119` - Processing error

### Digital Wallet Payment Methods

**Apple Pay:**
- Only available on Safari (Mac/iOS) or Chrome with Touch ID
- Requires domain verification in Stripe Dashboard
- Must have cards saved in Apple Wallet

**Google Pay:**
- Available on Chrome/Android devices
- Requires cards saved in Google Pay
- Works on most modern browsers

**Requirements:**
- HTTPS enabled (required for production)
- Payment methods enabled in Stripe Dashboard
- Domain verified (for Apple Pay)

### Email Configuration

To enable email delivery of download links, add these environment variables:

```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**Gmail Setup:**
1. Enable 2-factor authentication on your Gmail account
2. Generate an "App Password" for this application
3. Use the app password (not your regular password) in `EMAIL_PASSWORD`

**Alternative Email Services:**
- SendGrid
- AWS SES
- Mailgun
- Postmark

Update the email service configuration in `/app/lib/email-service.ts` if using a different provider.

### Download Delivery

After successful payment, users receive download links via:
- **SMS** (via Twilio)
- **Email** (via configured email service)
- **Fallback links** in API response for testing

**Features:**
- Links are generated only for **actually purchased items** (no more multiple unwanted links!)
- Email templates show **actual track names** instead of generic "Track 1, Track 2"
- Links are valid for 24 hours and tied to the user's phone number for security
- Professional email design with improved colors and branding

### Testing Downloads Locally

**Test Download Endpoint:**
```
http://localhost:3000/api/test-download?type=beats&index=0
```

This will download the first beat file for testing. You can change:
- `type=beats` or `type=songs`
- `index=0` through `index=14` for beats, `index=0` through `index=10` for songs

**Debugging:**
- Check browser console for download request logs
- Check terminal/console for server-side download logs
- Download links now point to `/api/download` (fixed from `/download`)
- **Styled error pages** instead of blank JSON error responses
- Error page shows at `/download-error` with helpful messages and actions
- **User-friendly error messages** that don't expose system information
