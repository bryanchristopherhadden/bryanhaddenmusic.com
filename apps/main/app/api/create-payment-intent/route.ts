import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { calculateTotal, parseOrderItems, serializeOrderItems } from '../../lib/beat-catalog';

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

    const { items, phoneNumber, email } = await request.json();

    const orderItems = parseOrderItems(items);
    if (!orderItems) {
      return NextResponse.json(
        { error: 'Invalid order items' },
        { status: 400 }
      );
    }

    const amount = calculateTotal(orderItems);

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Development mode: charge only $0.50 locally (Stripe minimum)
    const isDevelopment = process.env.NODE_ENV === 'development';
    const finalAmount = isDevelopment ? 0.50 : amount;
    
    // Create real Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(finalAmount * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      setup_future_usage: 'off_session', // Enable saving payment methods for future use
      metadata: {
        phoneNumber: phoneNumber || '',
        email: email || '',
        items: serializeOrderItems(orderItems),
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
