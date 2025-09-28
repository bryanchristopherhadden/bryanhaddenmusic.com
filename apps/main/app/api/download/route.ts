import { NextRequest, NextResponse } from 'next/server';

// Validate download token (now works with email or phone)
function validateDownloadToken(token: string, identifier: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [tokenIdentifier, productType, timestamp, random] = decoded.split(':');
    
    // Check if token is for the correct identifier (email or phone)
    if (tokenIdentifier !== identifier) {
      return false;
    }
    
    // Check if token is not older than 24 hours
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    return tokenAge < maxAge;
  } catch (error) {
    return false;
  }
}

// Get file name based on parameters (no filesystem access)
function getFileName(fileType: string, index: number, itemId?: string): string | null {
  // Static mapping - no filesystem access
  const fileMappings: { [key: string]: string[] } = {
    'beats': [
      'Disaster.mp3',
      'Easy.mp3',
      'EMPTY CHAMBER.mp3',
      'Everything.mp3',
      'First Class.m4a',
      'I Want You.mp3',
      'Late Text.mp3',
      'Lets Get Even.m4a',
      'Lost Out There.mp3',
      'Lost One.mp3',
      'Shroomie Girl.mp3',
      'SOMETHING OUTTA NOTHIN.mp3',
      'Sugarrrr.mp3',
      'Talk Back.mp3',
      'THE DRUGS TAKE ME AWAY.mp3',
      'Uber Black.m4a',
      'DEFINITION.mp3',
      'DEMISE V2.mp3',
      'FURTHER BEAT.wav',
      'pretty-chaos-1-v2.mp3',
      'pretty-chaos-3.mp3',
      'SAVE FACE1.mp3',
      'STAY TRUE.mp3',
      'Top Tier.mp3'
    ],
    'songs': [
      'Bantu Bliss.mp3',
      'Coexist.mp3',
      'First Class.m4a',
      'Just Crush.mp3',
      'Lets Get Even.m4a',
      'Pull Up.mp3',
      'Right Back.mp3',
      'Sapiosexual.mp3',
      'Shroomie Girl.mp3',
      'Still Waters.mp3',
      'Uber Black.m4a'
    ]
  };

  const files = fileMappings[fileType];
  if (!files || index >= files.length) {
    return null;
  }

  return files[index];
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const fileType = searchParams.get('file');
    const index = parseInt(searchParams.get('index') || '0');
    const itemId = searchParams.get('itemId');

    console.log('Download request:', { token, fileType, index, itemId, url: request.url });

    // Validate parameters
    if (!token || !fileType || isNaN(index)) {
      console.log('Invalid parameters:', { token: !!token, fileType, index });
      const errorUrl = new URL('/download-error', request.url);
      errorUrl.searchParams.set('error', 'Invalid download link');
      errorUrl.searchParams.set('details', 'This download link appears to be corrupted or incomplete');
      return NextResponse.redirect(errorUrl.toString());
    }

    // Extract identifier (email or phone) from token for validation
    let identifier: string;
    try {
      const decoded = Buffer.from(token, 'base64').toString();
      identifier = decoded.split(':')[0];
    } catch (error) {
      const errorUrl = new URL('/download-error', request.url);
      errorUrl.searchParams.set('error', 'Invalid download link');
      errorUrl.searchParams.set('details', 'This download link is not valid or has been tampered with');
      return NextResponse.redirect(errorUrl.toString());
    }

    // Validate token
    if (!validateDownloadToken(token, identifier)) {
      const errorUrl = new URL('/download-error', request.url);
      errorUrl.searchParams.set('error', 'Download link expired');
      errorUrl.searchParams.set('details', 'This download link has expired. Download links are valid for 24 hours after purchase');
      return NextResponse.redirect(errorUrl.toString());
    }

    // Get file name (no filesystem access)
    const fileName = getFileName(fileType, index, itemId);
    if (!fileName) {
      console.log('File not found in mapping:', { fileType, index, itemId });
      const errorUrl = new URL('/download-error', request.url);
      errorUrl.searchParams.set('error', 'Download not available');
      errorUrl.searchParams.set('details', 'The requested file is no longer available for download');
      return NextResponse.redirect(errorUrl.toString());
    }

    console.log('Token valid, redirecting to static file:', fileName);

    // Instead of serving the file through the serverless function, redirect to the static file
    // This avoids bundling large files into the serverless function
    const staticFileUrl = `/${fileType}/${fileName}`;
    
    // Create response with redirect to static file
    const response = NextResponse.redirect(new URL(staticFileUrl, request.url).toString());
    
    // Add download headers
    response.headers.set('Content-Disposition', `attachment; filename="${fileName}"`);
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    return response;

  } catch (error) {
    console.error('Download failed:', error);
    const errorUrl = new URL('/download-error', request.url);
    errorUrl.searchParams.set('error', 'Download service temporarily unavailable');
    errorUrl.searchParams.set('details', 'We are experiencing technical difficulties. Please try again later or contact support');
    return NextResponse.redirect(errorUrl.toString());
  }
}
