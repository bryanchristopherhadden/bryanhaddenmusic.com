import { NextResponse } from 'next/server';

export async function GET() {
  // Get current timestamp
  const timestamp = new Date().toISOString();
  
  // Create response data
  const responseData = {
    success: true,
    message: "API request processed successfully",
    data: {
      timestamp: timestamp,
      serverTime: Date.now(),
      requestMethod: "GET",
      endpoint: "/api/test"
    }
  };
  
  // Return the response
  return NextResponse.json(responseData);
}

export async function POST() {
  // Get current timestamp
  const timestamp = new Date().toISOString();
  
  // Create response data
  const responseData = {
    success: true,
    message: "API request processed successfully",
    data: {
      timestamp: timestamp,
      serverTime: Date.now(),
      requestMethod: "POST",
      endpoint: "/api/test"
    }
  };
  
  // Return the response
  return NextResponse.json(responseData);
}

