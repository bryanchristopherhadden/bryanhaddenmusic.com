"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Title, Text, Button, Stack, Box, Group, Badge, Paper, Grid } from '@mantine/core';
import { IconDownload, IconMusic, IconStar, IconTrendingUp, IconShoppingCart } from '@tabler/icons-react';
import Link from 'next/link';

export default function InstrumentalBeatsLanding(): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const genres = ['Hip-Hop', 'Trap', 'RnB', 'House', 'Pop'];
  const features = [
    {
      icon: <IconDownload size={24} />,
      title: "Instant Download",
      description: "Get your beats immediately after purchase in high-quality WAV and MP3 formats"
    },
    {
      icon: <IconMusic size={24} />,
      title: "Professional Quality",
      description: "Studio-grade instrumental beats mixed and mastered by experienced producer"
    },
    {
      icon: <IconStar size={24} />,
      title: "Exclusive Licensing",
      description: "Choose between lease licenses or exclusive rights for your projects"
    },
    {
      icon: <IconTrendingUp size={24} />,
      title: "Chart-Ready Beats",
      description: "Radio-ready instrumental music perfect for commercial releases and streaming"
    }
  ];

  return (
    <main style={{ 
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2d2d2d 100%)',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url(\'data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.02"><circle cx="30" cy="30" r="1"/></g></g></svg>\')',
          opacity: 0.4,
          zIndex: 0
        }}
      />

      <Box style={{ marginTop: '60px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <Container size="lg" py="xl">
          <Stack gap="xl">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -30 }}
              transition={{ duration: 0.8 }}
              style={{ textAlign: 'center' }}
            >
              <Title 
                order={1} 
                size="4.5rem" 
                c="white" 
                fw={700} 
                mb="lg"
                style={{ 
                  lineHeight: 1.1,
                  fontFamily: 'var(--font-poppins), sans-serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.04em',
                  textShadow: '0 8px 32px rgba(0,0,0,0.3)'
                }}
              >
                Buy Premium Instrumental Beats
              </Title>
              
              <Text 
                size="xl" 
                c="rgba(255, 255, 255, 0.9)" 
                maw={900} 
                mx="auto"
                mb="xl"
                style={{ 
                  lineHeight: 1.7,
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '1.3rem',
                  letterSpacing: '0.005em'
                }}
              >
                Professional instrumental music for artists, creators, and content producers. 
                High-quality hip-hop beats, trap instrumentals, RnB tracks and more with instant download.
              </Text>

              {/* Genre Tags */}
              <Group justify="center" gap="sm" mb="xl">
                {genres.map((genre) => (
                  <Badge 
                    key={genre}
                    size="lg" 
                    variant="outline"
                    style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      borderColor: 'rgba(102, 126, 234, 0.6)',
                      backgroundColor: 'rgba(102, 126, 234, 0.1)',
                      fontSize: '0.875rem',
                      padding: '8px 16px'
                    }}
                  >
                    {genre} Beats
                  </Badge>
                ))}
              </Group>

              {/* Main CTA */}
              <Group justify="center" gap="lg">
                <Button
                  component={Link}
                  href="/music"
                  size="xl"
                  leftSection={<IconShoppingCart size={20} />}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    fontSize: '1.1rem',
                    padding: '12px 32px',
                    height: '54px'
                  }}
                >
                  Browse All Instrumental Beats
                </Button>
                <Button
                  component={Link}
                  href="/music"
                  size="xl"
                  variant="outline"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    fontSize: '1.1rem',
                    padding: '12px 32px',
                    height: '54px'
                  }}
                >
                  Listen to Demos
                </Button>
              </Group>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Title 
                order={2} 
                ta="center" 
                c="white" 
                mb="xl"
                style={{ 
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '2.5rem'
                }}
              >
                Why Choose Our Instrumental Beats?
              </Title>

              <Grid>
                {features.map((feature, index) => (
                  <Grid.Col key={index} span={{ base: 12, md: 6 }}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                      transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                    >
                      <Paper
                        p="xl"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '16px',
                          height: '100%',
                          textAlign: 'center'
                        }}
                      >
                        <Box
                          style={{
                            color: 'rgba(102, 126, 234, 0.8)',
                            marginBottom: '16px',
                            display: 'flex',
                            justifyContent: 'center'
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Title order={3} c="white" mb="sm" size="1.4rem">
                          {feature.title}
                        </Title>
                        <Text c="rgba(255, 255, 255, 0.8)" size="md" style={{ lineHeight: 1.6 }}>
                          {feature.description}
                        </Text>
                      </Paper>
                    </motion.div>
                  </Grid.Col>
                ))}
              </Grid>
            </motion.div>

            {/* Pricing Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Title 
                order={2} 
                ta="center" 
                c="white" 
                mb="xl"
                style={{ 
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontSize: '2.5rem'
                }}
              >
                Simple, Transparent Pricing
              </Title>

              <Grid justify="center">
                <Grid.Col span={{ base: 12, md: 5 }}>
                  <Paper
                    p="xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(102, 126, 234, 0.3)',
                      borderRadius: '16px',
                      textAlign: 'center'
                    }}
                  >
                    <Title order={3} c="white" mb="sm">
                      License Beat
                    </Title>
                    <Text size="3rem" fw={700} c="rgba(102, 126, 234, 1)" mb="sm">
                      $50
                    </Text>
                    <Stack gap="xs" mb="xl">
                      <Text c="rgba(255, 255, 255, 0.8)">✓ Non-exclusive license</Text>
                      <Text c="rgba(255, 255, 255, 0.8)">✓ WAV & MP3 files</Text>
                      <Text c="rgba(255, 255, 255, 0.8)">✓ Instant download</Text>
                      <Text c="rgba(255, 255, 255, 0.8)">✓ Perfect for mixtapes</Text>
                    </Stack>
                    <Button
                      component={Link}
                      href="/music"
                      fullWidth
                      size="lg"
                      variant="outline"
                      style={{
                        borderColor: 'rgba(102, 126, 234, 0.6)',
                        color: 'rgba(102, 126, 234, 1)'
                      }}
                    >
                      Browse Beats to License
                    </Button>
                  </Paper>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 5 }}>
                  <Paper
                    p="xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                      border: '2px solid rgba(102, 126, 234, 0.5)',
                      borderRadius: '16px',
                      textAlign: 'center',
                      position: 'relative'
                    }}
                  >
                    <Badge
                      size="lg"
                      style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'rgba(102, 126, 234, 1)',
                        color: 'white'
                      }}
                    >
                      MOST POPULAR
                    </Badge>
                    <Title order={3} c="white" mb="sm" mt="sm">
                      Buy Exclusive
                    </Title>
                    <Text size="3rem" fw={700} c="white" mb="sm">
                      $200
                    </Text>
                    <Stack gap="xs" mb="xl">
                      <Text c="rgba(255, 255, 255, 0.9)">✓ Exclusive rights</Text>
                      <Text c="rgba(255, 255, 255, 0.9)">✓ WAV & MP3 files</Text>
                      <Text c="rgba(255, 255, 255, 0.9)">✓ Instant download</Text>
                      <Text c="rgba(255, 255, 255, 0.9)">✓ Commercial use</Text>
                      <Text c="rgba(255, 255, 255, 0.9)">✓ Beat removed from store</Text>
                    </Stack>
                    <Button
                      component={Link}
                      href="/music"
                      fullWidth
                      size="lg"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none'
                      }}
                    >
                      Buy Exclusive Rights
                    </Button>
                  </Paper>
                </Grid.Col>
              </Grid>
            </motion.div>

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              style={{ textAlign: 'center' }}
            >
              <Paper
                p="xl"
                style={{
                  background: 'rgba(102, 126, 234, 0.1)',
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  borderRadius: '16px',
                }}
              >
                <Title order={2} c="white" mb="md" size="2rem">
                  Ready to Find Your Perfect Instrumental Beat?
                </Title>
                <Text size="lg" c="rgba(255, 255, 255, 0.8)" mb="xl">
                  Browse our full collection of professional instrumental music and beats. 
                  Preview, purchase, and download instantly.
                </Text>
                <Button
                  component={Link}
                  href="/music"
                  size="xl"
                  leftSection={<IconMusic size={20} />}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    fontSize: '1.1rem',
                    padding: '12px 40px',
                    height: '54px'
                  }}
                >
                  Start Shopping Instrumental Beats
                </Button>
              </Paper>
            </motion.div>
          </Stack>
        </Container>
      </Box>
    </main>
  );
}
