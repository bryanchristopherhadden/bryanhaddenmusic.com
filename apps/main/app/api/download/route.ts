import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';

// Validate download token
function validateDownloadToken(token: string, phoneNumber: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [tokenPhone, productType, timestamp, random] = decoded.split(':');
    
    // Check if token is for the correct phone number
    if (tokenPhone !== phoneNumber) {
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

// Get file path and name based on parameters
async function getFilePath(fileType: string, index: number, itemId?: string): Promise<{ filePath: string, fileName: string } | null> {
  // If we have an itemId, try to find the specific file
  if (itemId) {
    try {
      // Load beats data to find the correct filename
      const beatsPath = join(process.cwd(), 'public', 'beats.json');
      const beatsData = JSON.parse(await readFile(beatsPath, 'utf-8'));
      
      // Find the beat with matching ID
      const beat = beatsData.find((song: any) => song.id === itemId);
      if (beat && beat.filename) {
        const fileName = beat.filename;
        const filePath = join(process.cwd(), 'public', fileType, fileName);
        return { filePath, fileName };
      }
    } catch (error) {
      console.log('Failed to load beats data, falling back to index mapping:', error);
    }
  }

  // Fallback to index-based mapping
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
      'Shroomie Girl.mp3',
      'SOMETHING OUTTA NOTHIN.mp3',
      'Sugarrrr.mp3',
      'Talk Back.mp3',
      'THE DRUGS TAKE ME AWAY.mp3',
      'Uber Black.m4a'
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

  const fileName = files[index];
  const filePath = join(process.cwd(), 'public', fileType, fileName);
  
  return { filePath, fileName };
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

    // Extract phone number from token for validation
    let phoneNumber: string;
    try {
      const decoded = Buffer.from(token, 'base64').toString();
      phoneNumber = decoded.split(':')[0];
    } catch (error) {
      const errorUrl = new URL('/download-error', request.url);
      errorUrl.searchParams.set('error', 'Invalid download link');
      errorUrl.searchParams.set('details', 'This download link is not valid or has been tampered with');
      return NextResponse.redirect(errorUrl.toString());
    }

    // Validate token
    if (!validateDownloadToken(token, phoneNumber)) {
      const errorUrl = new URL('/download-error', request.url);
      errorUrl.searchParams.set('error', 'Download link expired');
      errorUrl.searchParams.set('details', 'This download link has expired. Download links are valid for 24 hours after purchase');
      return NextResponse.redirect(errorUrl.toString());
    }

    // Get file information
    const fileInfo = await getFilePath(fileType, index, itemId);
    if (!fileInfo) {
      console.log('File not found in mapping:', { fileType, index, itemId });
      const errorUrl = new URL('/download-error', request.url);
      errorUrl.searchParams.set('error', 'Download not available');
      errorUrl.searchParams.set('details', 'The requested file is no longer available for download');
      return NextResponse.redirect(errorUrl.toString());
    }

    const { filePath, fileName } = fileInfo;
    console.log('Attempting to serve file:', { filePath, fileName });

    // Check if file exists
    try {
      await stat(filePath);
      console.log('File exists, serving:', fileName);
    } catch (error) {
      console.log('File not found on filesystem:', filePath, error);
      const errorUrl = new URL('/download-error', request.url);
      errorUrl.searchParams.set('error', 'Download temporarily unavailable');
      errorUrl.searchParams.set('details', 'The requested file is currently not available. Please try again later');
      return NextResponse.redirect(errorUrl.toString());
    }

    // Read file
    const fileBuffer = await readFile(filePath);

    // Set appropriate headers for file download
    const headers = new Headers({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Length': fileBuffer.length.toString(),
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    // Return file
    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('Download failed:', error);
    const errorUrl = new URL('/download-error', request.url);
    errorUrl.searchParams.set('error', 'Download service temporarily unavailable');
    errorUrl.searchParams.set('details', 'We are experiencing technical difficulties. Please try again later or contact support');
    return NextResponse.redirect(errorUrl.toString());
  }
}
