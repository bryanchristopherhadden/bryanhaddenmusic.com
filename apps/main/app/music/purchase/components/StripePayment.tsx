"use client";

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Button, Stack, Text, Alert, Loader } from '@mantine/core';
import { IconCheck, IconAlertCircle } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripePaymentFormProps {
  clientSecret: string;
  onSuccess: () => void;
  onCancel: () => void;
  phoneNumber: string;
}

function StripePaymentForm({ clientSecret, onSuccess, onCancel, phoneNumber }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/music/purchase/success`,
          payment_method_data: {
            billing_details: {
              phone: phoneNumber,
            },
          },
        },
        redirect: 'if_required',
      });

      if (error) {
        notifications.show({
          title: 'Payment Failed',
          message: error.message || 'An error occurred during payment',
          color: 'red',
        });
      } else {
        notifications.show({
          title: 'Payment Successful! 🎉',
          message: 'Download links sent to your phone',
          color: 'green',
          autoClose: 5000,
        });
        onSuccess();
      }
    } catch (error) {
      notifications.show({
        title: 'Payment Error',
        message: 'Something went wrong. Please try again.',
        color: 'red',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="lg">
        {/* Payment Element - Automatically shows Apple Pay, Google Pay, Cards, etc. */}
        <PaymentElement 
          options={{
            layout: 'tabs',
            paymentMethodOrder: ['apple_pay', 'google_pay', 'card'],
          }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={isProcessing}
          disabled={!stripe || !elements || isProcessing}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
          }}
        >
          {isProcessing ? 'Processing Payment...' : 'Complete Payment'}
        </Button>

        {/* Cancel Button */}
        <Button
          variant="subtle"
          color="gray"
          onClick={onCancel}
          disabled={isProcessing}
          fullWidth
        >
          Cancel
        </Button>

        {/* Security Notice */}
        <Alert
          icon={<IconAlertCircle size={16} />}
          variant="light"
          styles={{
            root: {
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
            },
            message: { color: 'rgba(255, 255, 255, 0.8)' }
          }}
        >
          <Text size="sm">
            🔒 Secure payment powered by Stripe. Your payment information is encrypted and never stored.
          </Text>
        </Alert>
      </Stack>
    </form>
  );
}

interface StripePaymentProps {
  total: number;
  onSuccess: () => void;
  onCancel: () => void;
  phoneNumber: string;
}

export default function StripePayment({ total, onSuccess, onCancel, phoneNumber }: StripePaymentProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createPaymentIntent = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: total,
          phoneNumber 
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
    } catch (error) {
      notifications.show({
        title: 'Payment Setup Failed',
        message: 'Unable to initialize payment. Please try again.',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Create payment intent when component mounts
  useEffect(() => {
    createPaymentIntent();
  }, []);

  if (isLoading) {
    return (
      <Stack gap="lg" align="center" py="xl">
        <Loader size="lg" />
        <Text c="rgba(255, 255, 255, 0.8)">
          Setting up secure payment...
        </Text>
      </Stack>
    );
  }

  if (!clientSecret) {
    return (
      <Stack gap="lg">
        <Alert
          icon={<IconAlertCircle size={16} />}
          color="red"
          variant="light"
        >
          Failed to initialize payment. Please try again.
        </Alert>
        <Button variant="outline" onClick={createPaymentIntent}>
          Retry
        </Button>
        <Button variant="subtle" onClick={onCancel}>
          Cancel
        </Button>
      </Stack>
    );
  }

  const stripeOptions = {
    clientSecret,
    appearance: {
      theme: 'night' as const,
      variables: {
        colorPrimary: '#667eea',
        colorBackground: 'rgba(255, 255, 255, 0.05)',
        colorText: 'white',
        colorDanger: '#ef4444',
        fontFamily: 'var(--font-inter), sans-serif',
        borderRadius: '8px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      <StripePaymentForm
        clientSecret={clientSecret}
        onSuccess={onSuccess}
        onCancel={onCancel}
        phoneNumber={phoneNumber}
      />
    </Elements>
  );
}
