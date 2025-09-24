# Vercel Deployment Setup Guide
**Setting up a new computer to deploy Bryan Hadden's music website to Vercel via Cursor**

## Prerequisites

### Required Software
1. **Node.js** (>=18.0.0)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version && npm --version`

2. **Git**
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify installation: `git --version`

3. **Cursor IDE**
   - Download from [cursor.sh](https://cursor.sh/)
   - Install and set up with your account

## Account Setup

### 1. GitHub Access
- Ensure you have access to the repository: `bryanhaddenmusic.com`
- Clone the repository:
  ```bash
  git clone https://github.com/[username]/bryanhaddenmusic.com.git
  cd bryanhaddenmusic.com
  ```

### 2. Vercel Account Setup
- Sign up/login at [vercel.com](https://vercel.com/)
- Connect your GitHub account to Vercel
- Install Vercel CLI:
  ```bash
  npm install -g vercel
  ```
- Login to Vercel CLI:
  ```bash
  vercel login
  ```

## Project Configuration

### 1. Environment Variables
You'll need to set up the following environment variables in Vercel dashboard:

**Required for Stripe Integration:**
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key

**Required for SMS/Communication:**
- `TWILIO_ACCOUNT_SID` - Twilio account SID
- `TWILIO_AUTH_TOKEN` - Twilio auth token
- `TWILIO_PHONE_NUMBER` - Twilio phone number

**Required for AWS SNS:**
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_REGION` - AWS region (e.g., us-east-1)

**Required for Email Service:**
- Email service credentials (if using EmailJS or similar)

### 2. Project Structure
This is a monorepo with the following structure:
```
bryanhaddenmusic.com/
├── apps/main/          # Main Next.js application
├── packages/shared/    # Shared components
├── vercel.json        # Vercel deployment configuration
└── package.json       # Root package.json with workspaces
```

### 3. Install Dependencies
```bash
# From project root
npm install

# Install main app dependencies
npm install --prefix apps/main
```

## Vercel Project Setup

### 1. Link Project to Vercel
From the project root directory:
```bash
vercel link
```
- Select your team/account
- Link to existing project or create new one
- Choose `apps/main` as the root directory when prompted

### 2. Vercel Configuration
The project includes a `vercel.json` file with the following configuration:
```json
{
  "buildCommand": "cd apps/main && npm run build",
  "outputDirectory": "apps/main/.next",
  "installCommand": "npm install && npm install --prefix apps/main"
}
```

### 3. Set Environment Variables in Vercel
1. Go to your Vercel dashboard
2. Select your project
3. Navigate to Settings → Environment Variables
4. Add all the required environment variables listed above

## Development Workflow

### 1. Local Development
```bash
# Start development server
npm run dev

# Or from main app directory
cd apps/main
npm run dev
```

### 2. Building for Production
```bash
# From project root
npm run build

# Or from main app directory
cd apps/main
npm run build
```

### 3. Deployment Options

**Option A: Automatic Deployment (Recommended)**
- Push changes to main branch on GitHub
- Vercel will automatically detect changes and deploy

**Option B: Manual Deployment via CLI**
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

**Option C: Deploy via Cursor**
- Use Cursor's built-in terminal
- Run deployment commands as needed
- Cursor integrates well with Vercel CLI

## Important File Locations

### Configuration Files
- `/vercel.json` - Vercel deployment settings
- `/apps/main/next.config.js` - Next.js configuration
- `/package.json` - Root workspace configuration
- `/apps/main/package.json` - Main app dependencies

### Source Code
- `/apps/main/app/` - Next.js 13+ app directory
- `/packages/shared/` - Shared components and utilities

### Static Assets
- `/apps/main/public/` - Public assets (songs, videos, images)

## Common Issues & Solutions

### 1. Node Version Mismatch
- Ensure Node.js version is >=18.0.0
- Use `nvm` to manage Node versions if needed

### 2. Build Failures
- Check that all environment variables are set
- Verify dependencies are installed: `npm install`
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

### 3. Deployment Issues
- Verify Vercel project is linked: `vercel link`
- Check build logs in Vercel dashboard
- Ensure all environment variables are configured

### 4. Asset Loading Issues
- Verify static assets are in `/apps/main/public/`
- Check asset paths in code match file structure

## Security Notes

### Environment Variables
- **NEVER** commit `.env` files to git
- All sensitive keys should be set in Vercel dashboard only
- Use different keys for development vs production

### API Keys Required
Make sure you have access to:
- Stripe account with API keys
- Twilio account for SMS functionality
- AWS account for SNS services
- Any email service credentials

## Quick Start Checklist

- [ ] Install Node.js (>=18.0.0)
- [ ] Install Git
- [ ] Install Cursor IDE
- [ ] Clone repository
- [ ] Install Vercel CLI (`npm install -g vercel`)
- [ ] Login to Vercel (`vercel login`)
- [ ] Install project dependencies (`npm install`)
- [ ] Link project to Vercel (`vercel link`)
- [ ] Set environment variables in Vercel dashboard
- [ ] Test local build (`npm run build`)
- [ ] Deploy to production (`vercel --prod`)

## Contact Information

If you encounter issues during setup, verify:
1. All environment variables are correctly set
2. Dependencies are properly installed
3. Vercel project is linked to correct repository
4. Build process completes successfully locally

---

**Last Updated:** September 2025  
**Project:** Bryan Hadden Music Website  
**Framework:** Next.js 15+ with Vercel deployment
