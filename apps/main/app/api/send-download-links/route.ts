import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { deserializeOrderItems, getBeat } from '../../lib/beat-catalog';
import { createDownloadToken } from '../../lib/download-token';
import { sendDownloadEmail } from '../../lib/email-service';

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment processing not configured' },
        { status: 500 }
      );
    }

    const { paymentIntentId } = await request.json();

    if (typeof paymentIntentId !== 'string' || !paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment reference is required' },
        { status: 400 }
      );
    }

    // The payment is the source of truth for who paid and what they bought
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Payment has not completed' },
        { status: 402 }
      );
    }

    const { email, phoneNumber, items } = paymentIntent.metadata;
    const purchasedItems = deserializeOrderItems(items || '');
    if (!email || purchasedItems.length === 0) {
      return NextResponse.json(
        { error: 'Payment is missing order details' },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
                   `${request.nextUrl.protocol}//${request.nextUrl.host}`;

    const downloadLinks = purchasedItems.map((item) =>
      `${baseUrl}/api/download?token=${encodeURIComponent(createDownloadToken(email, item.id))}`
    );
    const emailItems = purchasedItems.map((item) => ({
      title: getBeat(item.id)?.title,
      type: item.type,
    }));

    const emailResult = await sendDownloadEmail(email, downloadLinks, phoneNumber || '', 'music_beats', emailItems);

    // The customer has paid, so return the links if the email fails
    if (!emailResult.success) {
      console.error('Failed to send download links email:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to deliver download links via email', fallbackLinks: downloadLinks },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Download links sent via email',
      smsSent: false,
      emailSent: true,
    });

  } catch (error) {
    console.error('Failed to send download links:', error);
    return NextResponse.json(
      { error: 'Failed to send download links' },
      { status: 500 }
    );
  }
}
