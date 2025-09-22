import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment processing not configured' },
        { status: 500 }
      );
    }

    const { amount, phoneNumber } = await request.json();

    // Validate input
    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Create real Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        phoneNumber,
        product: 'music_beats',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount,
      currency: 'usd',
    });

  } catch (error) {
    console.error('Payment intent creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
