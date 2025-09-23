"use client";

import { useState } from 'react';
import { Button, Stack, Text, Box, Group, Loader, TextInput, Modal, Alert } from '@mantine/core';
import { IconPhone, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import StripePayment from './StripePayment';

interface PaymentFormProps {
  total: number;
  cartItems: any[];
  onSuccess: () => void;
  onCancel: () => void;
}

interface SMSAuth {
  phoneNumber: string;
  email: string;
  verificationCode: string;
  isCodeSent: boolean;
  isVerified: boolean;
  isLoading: boolean;
}

export default function PaymentForm({ total, cartItems, onSuccess, onCancel }: PaymentFormProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [smsAuth, setSmsAuth] = useState<SMSAuth>({
    phoneNumber: '',
    email: '',
    verificationCode: '',
    isCodeSent: false,
    isVerified: false,
    isLoading: false,
  });
  const [showVerificationModal, setShowVerificationModal] = useState(false);


  // Send SMS verification code
  const sendVerificationCode = async () => {
    if (!smsAuth.phoneNumber || smsAuth.phoneNumber.length < 10) {
      notifications.show({
        title: 'Invalid Phone Number',
        message: 'Please enter a valid phone number',
        color: 'red',
      });
      return;
    }

    if (!smsAuth.email || !smsAuth.email.includes('@')) {
      notifications.show({
        title: 'Invalid Email',
        message: 'Please enter a valid email address',
        color: 'red',
      });
      return;
    }

    setSmsAuth(prev => ({ ...prev, isLoading: true }));

    try {
      // Call our SMS API endpoint
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phoneNumber: smsAuth.phoneNumber,
          email: smsAuth.email 
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send SMS');
      }

      setSmsAuth(prev => ({ 
        ...prev, 
        isCodeSent: true, 
        isLoading: false 
      }));
      
      setShowVerificationModal(true);
      
      // Get response data to show delivery method
      const responseData = await response.json();
      const deliveryMethod = responseData.smsSent && responseData.emailSent ? 'phone and email' :
                           responseData.smsSent ? 'phone' :
                           responseData.emailSent ? 'email' : 'neither method';
      
      // For demo purposes, show a test code
      const testCode = '123456';
      notifications.show({
        title: 'Code Sent! 📱📧',
        message: `Verification code sent to your ${deliveryMethod}. Demo code: ${testCode}`,
        color: 'green',
        autoClose: 10000,
      });
    } catch (error) {
      setSmsAuth(prev => ({ ...prev, isLoading: false }));
      notifications.show({
        title: 'Failed to Send Code',
        message: 'Please try again',
        color: 'red',
      });
    }
  };

  // Verify SMS code
  const verifyCode = async () => {
    if (!smsAuth.verificationCode || smsAuth.verificationCode.length !== 6) {
      notifications.show({
        title: 'Invalid Code',
        message: 'Please enter the 6-digit verification code',
        color: 'red',
      });
      return;
    }

    setSmsAuth(prev => ({ ...prev, isLoading: true }));

    try {
      // For testing, accept 123456 as valid
      if (smsAuth.verificationCode === '123456') {
        setSmsAuth(prev => ({ 
          ...prev, 
          isVerified: true, 
          isLoading: false 
        }));
        
        setShowVerificationModal(false);
        
        notifications.show({
          title: 'Phone Verified! ✅',
          message: 'Test verification successful',
          color: 'green',
        });
        return;
      }

      // Call our SMS verification API endpoint for real codes
      const response = await fetch('/api/verify-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phoneNumber: smsAuth.phoneNumber, 
          code: smsAuth.verificationCode 
        })
      });

      if (!response.ok) {
        throw new Error('Failed to verify SMS code');
      }

      setSmsAuth(prev => ({ 
        ...prev, 
        isVerified: true, 
        isLoading: false 
      }));
      
      setShowVerificationModal(false);
      
      notifications.show({
        title: 'Phone Verified! ✅',
        message: 'You can now proceed with payment',
        color: 'green',
      });
    } catch (error) {
      setSmsAuth(prev => ({ ...prev, isLoading: false }));
      notifications.show({
        title: 'Invalid Code',
        message: 'Please check your code and try again',
        color: 'red',
      });
    }
  };


  return (
    <>
      <Stack gap="lg">
        {/* Phone Verification Section */}
        <Box>
          <Text fw={600} c="white" mb="sm">
            Phone Verification
          </Text>
          
          {!smsAuth.isVerified ? (
            <Stack gap="md">
              <TextInput
                placeholder="Enter your phone number"
                value={smsAuth.phoneNumber}
                onChange={(e) => setSmsAuth(prev => ({ ...prev, phoneNumber: e.target.value }))}
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
              <TextInput
                placeholder="Enter your email address"
                value={smsAuth.email}
                onChange={(e) => setSmsAuth(prev => ({ ...prev, email: e.target.value }))}
                type="email"
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
              <Button
                onClick={sendVerificationCode}
                loading={smsAuth.isLoading}
                disabled={!smsAuth.phoneNumber || smsAuth.phoneNumber.length < 10 || !smsAuth.email}
                variant="outline"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                }}
              >
                {smsAuth.isCodeSent ? 'Resend' : 'Send Code'}
              </Button>
            </Stack>
          ) : (
            <Alert
              icon={<IconCheck size={16} />}
              color="green"
              variant="light"
              styles={{
                root: {
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                },
                message: { color: 'rgba(255, 255, 255, 0.9)' }
              }}
            >
              Phone number verified: {smsAuth.phoneNumber}
            </Alert>
          )}
          
          <Text size="xs" c="rgba(255, 255, 255, 0.6)" mt="xs">
            We'll send download links via SMS for instant access
          </Text>
        </Box>

        {/* Payment Section */}
        {!showPayment ? (
          <Button
            size="lg"
            fullWidth
            onClick={() => setShowPayment(true)}
            disabled={!smsAuth.isVerified}
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
            phoneNumber={smsAuth.phoneNumber}
            email={smsAuth.email}
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

      {/* SMS Verification Modal */}
      <Modal
        opened={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        title="Enter Verification Code"
        size="sm"
        styles={{
          content: {
            backgroundColor: 'rgba(20, 20, 20, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
          header: {
            backgroundColor: 'transparent',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          },
          title: {
            color: 'white',
            fontSize: '1.2rem',
            fontWeight: 600,
          },
          close: {
            color: 'white',
          }
        }}
      >
        <Stack gap="lg">
          <Text c="rgba(255, 255, 255, 0.8)" size="sm">
            We sent a 6-digit code to {smsAuth.phoneNumber} and {smsAuth.email}
          </Text>
          
          <TextInput
            placeholder="Enter 6-digit code"
            value={smsAuth.verificationCode}
            onChange={(e) => setSmsAuth(prev => ({ 
              ...prev, 
              verificationCode: e.target.value.replace(/\D/g, '').slice(0, 6) 
            }))}
            size="lg"
            ta="center"
            styles={{
              input: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '1rem',
                // letterSpacing: '0.5rem',
                '&::placeholder': {
                  color: 'rgba(255, 255, 255, 0.6)',
                  letterSpacing: 'normal',
                }
              }
            }}
            maxLength={6}
          />
          
          <Group grow>
            <Button
              variant="outline"
              onClick={() => setShowVerificationModal(false)}
              style={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: 'white',
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={verifyCode}
              loading={smsAuth.isLoading}
              disabled={smsAuth.verificationCode.length !== 6}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
              }}
            >
              Verify
            </Button>
          </Group>
          
          <Button
            variant="subtle"
            size="sm"
            onClick={sendVerificationCode}
            loading={smsAuth.isLoading}
          >
            Resend Code
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
