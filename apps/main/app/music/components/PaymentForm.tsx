"use client";

import { useState } from 'react';
import { Button, Stack, Text, Box, TextInput } from '@mantine/core';
import { IconPhone } from '@tabler/icons-react';
import StripePayment from './StripePayment';

interface PaymentFormProps {
  total: number;
  cartItems: any[];
  onSuccess: () => void;
  onCancel: () => void;
}


export default function PaymentForm({ total, cartItems, onSuccess, onCancel }: PaymentFormProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phoneNumber: '', // Optional
  });


  return (
    <>
      <Stack gap="lg">
        {/* Contact Information */}
        <Box>
          <Text fw={600} c="white" mb="sm">
            Contact Information
          </Text>
          
          <Stack gap="md">
            <TextInput
              placeholder="Email address (required for download links)"
              value={contactInfo.email}
              onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
              type="email"
              required
              size="md"
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
            <TextInput
              placeholder="Phone number (optional - for SMS updates)"
              value={contactInfo.phoneNumber}
              onChange={(e) => setContactInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
              leftSection={<IconPhone size={16} />}
              size="md"
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
          </Stack>
          
          <Text size="xs" c="rgba(255, 255, 255, 0.6)" mt="xs">
            Download links will be sent to your email instantly after purchase
          </Text>
        </Box>

        {/* Payment Section */}
        {!showPayment ? (
          <Button
            size="lg"
            fullWidth
            onClick={() => setShowPayment(true)}
            disabled={!contactInfo.email || !contactInfo.email.includes('@')}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
            }}
          >
            Continue to Payment • ${total.toFixed(2)}
          </Button>
        ) : (
          <StripePayment
            total={total}
            cartItems={cartItems}
            onSuccess={onSuccess}
            onCancel={() => setShowPayment(false)}
            phoneNumber={contactInfo.phoneNumber}
            email={contactInfo.email}
          />
        )}

        {/* Cancel Button */}
        <Button
          variant="subtle"
          color="gray"
          onClick={onCancel}
          fullWidth
        >
          Cancel
        </Button>
      </Stack>

    </>
  );
}
