"use client";

import { useSearchParams } from 'next/navigation';
import { Container, Title, Text, Button, Stack, Alert, Box } from '@mantine/core';
import { IconAlertCircle, IconHome, IconRefresh } from '@tabler/icons-react';
import Link from 'next/link';
import { Suspense } from 'react';

function DownloadErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'Unknown error';
  const details = searchParams.get('details') || '';
  const filePath = searchParams.get('filePath') || '';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Container size="md">
        <Box style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          padding: '40px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <Stack gap="lg" align="center">
            {/* Logo */}
            <Title order={1} c="white" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
              🎵 Bryan Hadden Music
            </Title>

            {/* Error Icon */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '20px 0'
            }}>
              <IconAlertCircle size={40} color="#ef4444" />
            </div>

            {/* Error Title */}
            <Title order={2} c="white" ta="center">
              Download Error
            </Title>

            {/* Error Message */}
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="Unable to download file"
              color="red"
              variant="light"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                width: '100%'
              }}
            >
              <Text c="white" size="sm">
                {error}
              </Text>
              {details && (
                <Text c="rgba(255, 255, 255, 0.7)" size="xs" mt="xs">
                  {details}
                </Text>
              )}
            </Alert>

            {/* Help Text */}
            <Text c="rgba(255, 255, 255, 0.8)" ta="center" size="sm">
              This could happen if:
            </Text>
            <Box style={{ width: '100%' }}>
              <Stack gap="xs">
                <Text c="rgba(255, 255, 255, 0.7)" size="sm">
                  • Your download link has expired (valid for 24 hours)
                </Text>
                <Text c="rgba(255, 255, 255, 0.7)" size="sm">
                  • The file is temporarily unavailable
                </Text>
                <Text c="rgba(255, 255, 255, 0.7)" size="sm">
                  • There was a temporary server issue
                </Text>
              </Stack>
            </Box>

            {/* Action Buttons */}
            <Stack gap="md" style={{ width: '100%', maxWidth: '300px' }}>
              <Button
                component={Link}
                href="/music/listen"
                leftSection={<IconHome size={16} />}
                size="lg"
                fullWidth
                style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white'
                }}
              >
                Back to Music
              </Button>
              
              <Button
                onClick={() => window.location.reload()}
                leftSection={<IconRefresh size={16} />}
                variant="outline"
                size="md"
                fullWidth
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white'
                }}
              >
                Try Again
              </Button>
            </Stack>

            {/* Contact Info */}
            <Box style={{
              marginTop: '30px',
              padding: '20px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              width: '100%'
            }}>
              <Text c="white" fw={600} ta="center" mb="xs">
                Need Help?
              </Text>
              <Text c="rgba(255, 255, 255, 0.7)" size="sm" ta="center">
                Contact us at support@bryanhaddenmusic.com
              </Text>
            </Box>
          </Stack>
        </Box>
      </Container>
    </div>
  );
}

export default function DownloadErrorPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <Container size="md">
          <Box style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '40px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <Stack gap="lg" align="center">
              <Title order={1} c="white" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                🎵 Bryan Hadden Music
              </Title>
              <Text c="white">Loading...</Text>
            </Stack>
          </Box>
        </Container>
      </div>
    }>
      <DownloadErrorContent />
    </Suspense>
  );
}
