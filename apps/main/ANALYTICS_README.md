# Music Page Analytics System

This analytics system tracks user behavior on your music page to help you understand:
- Where people click
- If they visit other pages on the site
- Where/when they bounce from the checkout flow
- Whether people enter the checkout flow at all

## 🎯 What's Being Tracked

### Page Interactions
- **Page Views**: When users visit the music page
- **Search**: What users search for and how many results they get
- **Filter**: Genre filtering and result counts
- **Beat Previews**: When users start/stop listening to beat previews

### Shopping Cart
- **Add to Cart**: Which beats are added and what license type
- **Remove from Cart**: What gets removed
- **Cart Opens**: When users view their cart

### Checkout Flow
- **Checkout Started**: When users click checkout
- **Payment Form Shown**: When payment form appears
- **Payment Completed**: Successful purchases
- **Checkout Abandoned**: When users leave without completing

### Help & Support
- **Help Opened**: When users open the help modal
- **Contact Clicked**: When users click to email you

## 🚀 How to Use

### View Analytics Dashboard
1. Visit your music page (`/music`)
2. Look for the green analytics button (📊) in the bottom-right corner
3. Click it to open the analytics dashboard
4. View real-time stats and recent events

### Export Data
- Click "Export Data" in the dashboard to download all analytics as JSON
- Data is stored in browser's localStorage for persistence

### Clear Data
- Click "Clear Data" to reset all analytics (useful for testing)

## 🔧 Free Analytics Alternatives

### Recommended: Plausible Analytics
- **Privacy-first**: No cookies, GDPR compliant
- **Simple**: Clean, easy-to-understand dashboard
- **Free**: Up to 10k pageviews/month
- **Setup**: Sign up at plausible.io, add your domain

### Other Options
1. **Matomo**: Open-source, self-hosted, full control
2. **Clicky**: Real-time tracking, heatmaps
3. **Simple Analytics**: Minimalist approach

## 🔌 Integration with External Services

The system is designed to easily integrate with external analytics services:

### Plausible Integration
1. Sign up at plausible.io
2. Add environment variables:
   ```bash
   PLAUSIBLE_DOMAIN=yourdomain.com
   PLAUSIBLE_API_KEY=your_api_key
   ```
3. Uncomment the Plausible code in `/app/api/analytics/route.ts`

### Matomo Integration
1. Set up Matomo instance
2. Add environment variables:
   ```bash
   MATOMO_URL=https://your-matomo-instance.com
   MATOMO_SITE_ID=your_site_id
   ```
3. Uncomment the Matomo code in `/app/api/analytics/route.ts`

## 📊 Understanding Your Data

### Key Metrics to Watch
- **Conversion Rate**: `checkouts / page_views`
- **Cart Abandonment**: `checkout_abandoned / checkout_started`
- **Popular Beats**: Most previewed beats
- **Search Patterns**: What users are looking for
- **Session Duration**: How long users stay

### Common Insights
- **High cart adds, low checkouts**: Payment process issues
- **Many searches, few results**: Need more beats in popular genres
- **Short sessions**: Page might be confusing or slow
- **High help clicks**: Users need more guidance

## 🛠️ Customization

### Adding New Events
Edit `/app/lib/analytics.ts` to add new tracking methods:

```typescript
trackCustomEvent(data: any): void {
  this.addEvent({
    event: 'custom_event',
    properties: data
  });
}
```

### Modifying Dashboard
Edit `/app/components/AnalyticsDashboard.tsx` to:
- Add new metrics
- Change the layout
- Add charts/graphs
- Filter events by type

## 🔒 Privacy & Compliance

- **No Personal Data**: Only tracks interactions, not personal info
- **Local Storage**: Data stays in user's browser until exported
- **GDPR Compliant**: No cookies, minimal data collection
- **User Control**: Users can clear their data anytime

## 🚨 Troubleshooting

### No Data Showing
- Check browser console for errors
- Ensure localStorage is enabled
- Try refreshing the page

### Dashboard Not Opening
- Check for JavaScript errors
- Verify all imports are correct
- Check browser compatibility

### Events Not Tracking
- Check network tab for API calls
- Verify analytics functions are called
- Check console for error messages

## 📈 Next Steps

1. **Set up external service** (Plausible recommended)
2. **Monitor key metrics** for a week
3. **Identify bottlenecks** in checkout flow
4. **Optimize based on data** (popular genres, pricing, etc.)
5. **A/B test changes** to improve conversion

## 💡 Pro Tips

- **Export data weekly** to keep backups
- **Monitor during peak hours** for real-time insights
- **Track before/after** making changes to measure impact
- **Focus on checkout flow** - that's where money is made
- **Watch search terms** - tells you what users want

---

**Need help?** The analytics system is designed to be simple and self-contained. All data is stored locally and can be easily exported or cleared as needed.
