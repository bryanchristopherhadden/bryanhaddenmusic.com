import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileType = searchParams.get('type') || 'beats';
    const index = parseInt(searchParams.get('index') || '0');

    console.log('Test download request:', { fileType, index });

    // Get file path
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
      const errorUrl = new URL('/download-error', request.url);
      errorUrl.searchParams.set('error', 'Download not available');
      errorUrl.searchParams.set('details', 'The requested file is not available for download');
      return NextResponse.redirect(errorUrl.toString());
    }

    const fileName = files[index];
    const filePath = join(process.cwd(), 'public', fileType, fileName);

    console.log('Test serving file:', { filePath, fileName });

    // Check if file exists
    try {
      await stat(filePath);
      console.log('File exists, serving:', fileName);
    } catch (error) {
      console.log('File not found:', filePath, error);
      const errorUrl = new URL('/download-error', request.url);
      errorUrl.searchParams.set('error', 'Download temporarily unavailable');
      errorUrl.searchParams.set('details', 'The requested file is currently not available');
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

    console.log('Successfully serving file:', fileName, 'Size:', fileBuffer.length);

    // Return file
    return new NextResponse(fileBuffer, {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('Test download failed:', error);
    const errorUrl = new URL('/download-error', request.url);
    errorUrl.searchParams.set('error', 'Download service temporarily unavailable');
    errorUrl.searchParams.set('details', 'Please try again later or contact support if the issue persists');
    return NextResponse.redirect(errorUrl.toString());
  }
}
