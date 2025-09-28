"use client";

import { useState } from 'react';
import { Stack, Text, Box, TextInput } from '@mantine/core';
import StripePayment from './StripePayment';

interface PaymentFormProps {
  total: number;
  cartItems: any[];
  onSuccess: () => void;
  onCancel: () => void;
}


export default function PaymentForm({ total, cartItems, onSuccess, onCancel }: PaymentFormProps) {
  const [email, setEmail] = useState('');


  return (
    <>
      <Stack gap="lg">
        {/* Email for Download Links */}
        <Box>
          <Text fw={600} c="white" mb="sm">
            Email for Download Links
          </Text>
          
          <TextInput
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            size="lg"
            styles={{
              input: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                '&::placeholder': {
                  color: 'rgba(255, 255, 255, 0.6)'
                }
              }
            }}
          />
          
          <Text size="xs" c="rgba(255, 255, 255, 0.6)" mt="xs">
            Download links will be sent instantly after payment
          </Text>
        </Box>

        {/* Direct Payment */}
        <StripePayment
          total={total}
          cartItems={cartItems}
          onSuccess={onSuccess}
          onCancel={onCancel}
          phoneNumber=""
          email={email}
          disabled={!email || !email.includes('@')}
        />
      </Stack>
    </>
  );
}
