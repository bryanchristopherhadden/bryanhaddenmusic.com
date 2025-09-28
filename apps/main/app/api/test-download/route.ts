import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileType = searchParams.get('type') || 'beats';
    const index = parseInt(searchParams.get('index') || '0');

    console.log('Test download request:', { fileType, index });

    // Static file mapping - no filesystem access
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
      const errorUrl = new URL('/download-error', request.url);
      errorUrl.searchParams.set('error', 'Download not available');
      errorUrl.searchParams.set('details', 'The requested file is not available for download');
      return NextResponse.redirect(errorUrl.toString());
    }

    const fileName = files[index];

    console.log('Test redirecting to file:', fileName);

    // Redirect to static file instead of serving through function
    // This avoids bundling large files into the serverless function
    const staticFileUrl = `/${fileType}/${fileName}`;
    
    // Create response with redirect to static file
    const response = NextResponse.redirect(new URL(staticFileUrl, request.url).toString());
    
    // Add download headers
    response.headers.set('Content-Disposition', `attachment; filename="${fileName}"`);
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    
    return response;

  } catch (error) {
    console.error('Test download failed:', error);
    const errorUrl = new URL('/download-error', request.url);
    errorUrl.searchParams.set('error', 'Download service temporarily unavailable');
    errorUrl.searchParams.set('details', 'Please try again later or contact support if the issue persists');
    return NextResponse.redirect(errorUrl.toString());
  }
}