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

    const { amount, phoneNumber, email } = await request.json();

    // Validate input - allow amounts as low as $0.50 (Stripe minimum)
    if (!amount || amount < 0.50) {
      return NextResponse.json(
        { error: 'Invalid amount - minimum is $0.50' },
        { status: 400 }
      );
    }

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Development mode: charge only $0.50 locally (Stripe minimum)
    const isDevelopment = process.env.NODE_ENV === 'development';
    const finalAmount = isDevelopment ? 0.50 : amount;
    
    console.log(`Payment Intent - Original: $${amount}, Final: $${finalAmount}, Development: ${isDevelopment}`);

    // Create real Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(finalAmount * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        phoneNumber,
        email: email || '',
        product: 'music_beats',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: finalAmount,
      originalAmount: amount,
      isDevelopment,
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
