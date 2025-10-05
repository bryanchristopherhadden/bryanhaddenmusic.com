# Google Ads & Analytics Setup Guide

## Overview
This guide will help you set up proper Google Analytics 4 and Google Ads conversion tracking to get accurate, actionable data from your campaigns.

## 1. Google Analytics 4 Setup

### Step 1: Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property for your music site
3. Copy your Measurement ID (format: G-XXXXXXXXXX)

### Step 2: Update Configuration
Replace `GA_MEASUREMENT_ID` in `app/layout.tsx` with your actual GA4 Measurement ID:

```typescript
// Replace this line:
src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"

// With your actual ID:
src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
```

### Step 3: Enable Enhanced E-commerce
1. In GA4, go to Admin > Data Streams
2. Select your web stream
3. Enable Enhanced E-commerce
4. Configure conversion events

## 2. Google Ads Conversion Tracking

### Step 1: Create Conversion Actions
1. Go to [Google Ads](https://ads.google.com/)
2. Tools & Settings > Conversions
3. Create new conversion actions:
   - **Purchase**: Track completed purchases
   - **Add to Cart**: Track cart additions
   - **Begin Checkout**: Track checkout starts

### Step 2: Get Conversion IDs
For each conversion action, copy:
- Conversion ID (format: AW-XXXXXXXXX)
- Conversion Label (format: XXXXXXXXXX)

### Step 3: Update Configuration
Replace placeholders in `app/layout.tsx`:

```typescript
// Replace this line:
gtag('config', 'AW-CONVERSION_ID', {

// With your actual conversion ID:
gtag('config', 'AW-123456789', {
```

And in `app/music/page.tsx`:

```typescript
// Replace this line:
trackGoogleAdsConversion('AW-CONVERSION_ID', 'CONVERSION_LABEL', cartTotal, 'USD');

// With your actual values:
trackGoogleAdsConversion('AW-123456789', 'AbCdEfGhIj', cartTotal, 'USD');
```

## 3. Enhanced Conversions Setup

### Step 1: Enable Enhanced Conversions
1. In Google Ads, go to your conversion action
2. Click "Edit settings"
3. Enable "Enhanced conversions"
4. Choose "Google tag (gtag.js)"

### Step 2: Add Customer Data
The tracking code will automatically capture:
- Email addresses (from payment forms)
- Transaction IDs
- Purchase values

## 4. Google Ads Integration with GA4

### Step 1: Link Accounts
1. In GA4, go to Admin > Product Links
2. Click "Google Ads Links"
3. Link your Google Ads account

### Step 2: Import Conversions
1. In Google Ads, go to Tools & Settings > Linked accounts
2. Click "Google Analytics"
3. Import conversion actions from GA4

## 5. Third-Party Tools (Recommended)

### Supermetrics (Best for Data Unification)
- **Cost**: $99/month
- **Benefits**: 
  - Unifies Google Ads, GA4, and Stripe data
  - Automated reporting
  - Custom dashboards
  - Data export to Google Sheets

### AgencyAnalytics (Best for Reporting)
- **Cost**: $49/month
- **Benefits**:
  - Automated client reports
  - White-label options
  - Live dashboards
  - Google Ads performance monitoring

### Zapier (Best for Automation)
- **Cost**: $20/month
- **Benefits**:
  - Automate data flows
  - Connect multiple platforms
  - Real-time data sync
  - Custom workflows

## 6. Key Metrics to Track

### Google Ads Metrics
- **Cost Per Acquisition (CPA)**: Cost per purchase
- **Return on Ad Spend (ROAS)**: Revenue per dollar spent
- **Conversion Rate**: Percentage of clicks that convert
- **Quality Score**: Ad relevance and landing page experience

### GA4 E-commerce Metrics
- **Revenue**: Total sales from Google Ads traffic
- **Transactions**: Number of purchases
- **Average Order Value**: Revenue per transaction
- **Cart Abandonment Rate**: Percentage of abandoned checkouts

### Custom Metrics
- **Beat Preview Rate**: Percentage of users who preview beats
- **Genre Performance**: Which genres convert best
- **License Type Performance**: Lease vs. purchase conversion rates

## 7. Attribution Models

### Recommended Settings
- **Google Ads**: Data-driven attribution
- **GA4**: Data-driven attribution
- **Lookback Window**: 30 days for clicks, 1 day for views

### Why This Matters
- **First-click**: Credits the first interaction
- **Last-click**: Credits the final interaction
- **Data-driven**: Uses machine learning to assign credit

## 8. Testing Your Setup

### Step 1: Test Conversions
1. Make a test purchase
2. Check GA4 Real-time reports
3. Verify Google Ads conversion tracking
4. Confirm Enhanced Conversions data

### Step 2: Validate Data
1. Compare GA4 and Google Ads data
2. Check for discrepancies
3. Verify attribution is working
4. Test different traffic sources

## 9. Common Issues & Solutions

### Issue: Discrepancies Between Platforms
**Solution**: 
- Use consistent attribution models
- Check timezone settings
- Verify conversion windows
- Enable Enhanced Conversions

### Issue: Missing Conversion Data
**Solution**:
- Check gtag implementation
- Verify conversion IDs
- Test in incognito mode
- Check ad blockers

### Issue: Inaccurate Revenue Tracking
**Solution**:
- Verify currency settings
- Check decimal precision
- Validate transaction IDs
- Test with different amounts

## 10. Next Steps

1. **Set up GA4** with your Measurement ID
2. **Configure Google Ads** conversion tracking
3. **Test the implementation** with a small campaign
4. **Choose a third-party tool** for data unification
5. **Monitor performance** and optimize based on data

## Support Resources

- [Google Analytics Help Center](https://support.google.com/analytics)
- [Google Ads Help Center](https://support.google.com/google-ads)
- [GA4 E-commerce Setup Guide](https://support.google.com/analytics/answer/9216061)
- [Google Ads Conversion Tracking](https://support.google.com/google-ads/answer/1722022)

## Contact
If you need help with implementation, contact your developer or Google Ads support.
