import { NextRequest, NextResponse } from 'next/server';

// Analytics API endpoint for external services
// This can be used to send data to Plausible, Matomo, or other analytics services

export async function POST(request: NextRequest) {
  try {
    const event = await request.json();
    
    // Log the event (you can replace this with actual analytics service calls)
    console.log('📊 Analytics Event Received:', event);
    
    // Example: Send to Plausible Analytics
    // await sendToPlausible(event);
    
    // Example: Send to Matomo
    // await sendToMatomo(event);
    
    // Example: Send to custom database
    // await saveToDatabase(event);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics API Error:', error);
    return NextResponse.json({ error: 'Failed to process analytics event' }, { status: 500 });
  }
}

// Example function to send to Plausible Analytics
async function sendToPlausible(event: any) {
  const PLAUSIBLE_DOMAIN = process.env.PLAUSIBLE_DOMAIN; // Your domain
  const PLAUSIBLE_API_KEY = process.env.PLAUSIBLE_API_KEY; // Your API key
  
  if (!PLAUSIBLE_DOMAIN || !PLAUSIBLE_API_KEY) {
    console.log('Plausible credentials not configured');
    return;
  }
  
  try {
    const response = await fetch('https://plausible.io/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Music Analytics',
      },
      body: JSON.stringify({
        domain: PLAUSIBLE_DOMAIN,
        name: event.event,
        url: window.location.href,
        props: event.properties,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Plausible API error: ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to send to Plausible:', error);
  }
}

// Example function to send to Matomo
async function sendToMatomo(event: any) {
  const MATOMO_URL = process.env.MATOMO_URL; // Your Matomo instance URL
  const MATOMO_SITE_ID = process.env.MATOMO_SITE_ID; // Your site ID
  
  if (!MATOMO_URL || !MATOMO_SITE_ID) {
    console.log('Matomo credentials not configured');
    return;
  }
  
  try {
    const params = new URLSearchParams({
      idsite: MATOMO_SITE_ID,
      rec: '1',
      action_name: event.event,
      url: window.location.href,
      ...event.properties,
    });
    
    const response = await fetch(`${MATOMO_URL}/matomo.php?${params}`, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error(`Matomo API error: ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to send to Matomo:', error);
  }
}

// Example function to save to database
async function saveToDatabase(event: any) {
  // This would connect to your database and save the event
  // Example with Prisma:
  /*
  await prisma.analyticsEvent.create({
    data: {
      event: event.event,
      properties: event.properties,
      timestamp: new Date(event.timestamp),
      sessionId: event.sessionId,
      sessionDuration: event.sessionDuration,
      pageDuration: event.pageDuration,
    },
  });
  */
}
