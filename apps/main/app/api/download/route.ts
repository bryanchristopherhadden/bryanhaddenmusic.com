import { NextRequest, NextResponse } from 'next/server';
import { getBeat } from '../../lib/beat-catalog';
import { verifyDownloadToken } from '../../lib/download-token';

function redirectToError(request: NextRequest, error: string, details: string) {
  const errorUrl = new URL('/download-error', request.url);
  errorUrl.searchParams.set('error', error);
  errorUrl.searchParams.set('details', details);
  return NextResponse.redirect(errorUrl.toString());
}

export async function GET(request: NextRequest) {
  try {
    const token = new URL(request.url).searchParams.get('token');

    if (!token) {
      return redirectToError(request, 'Invalid download link', 'This download link appears to be corrupted or incomplete');
    }

    const payload = verifyDownloadToken(token);
    if (!payload) {
      return redirectToError(request, 'Download link invalid or expired', 'Download links are valid for 24 hours after purchase');
    }

    const beat = getBeat(payload.itemId);
    if (!beat) {
      return redirectToError(request, 'Download not available', 'The requested file is no longer available for download');
    }

    // Redirect to the static file to avoid bundling large files into the serverless function
    const staticFileUrl = `/beats/${encodeURIComponent(beat.filename)}`;
    const response = NextResponse.redirect(new URL(staticFileUrl, request.url).toString());
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');

    return response;

  } catch (error) {
    console.error('Download failed:', error);
    return redirectToError(request, 'Download service temporarily unavailable', 'We are experiencing technical difficulties. Please try again later or contact support');
  }
}
