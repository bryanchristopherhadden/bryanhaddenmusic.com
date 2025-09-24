"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container, Title, Text, Box, Stack, Group, Avatar, Paper, Badge } from '@mantine/core';
import { IconMusic, IconMicrophone, IconUsers, IconAward } from '@tabler/icons-react';

const AboutPage = () => {
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box ta="center" mb="xl">
                <Title 
                  order={1} 
                  size="3.5rem" 
                  c="white" 
                  fw={700} 
                  mb="md"
                  style={{ 
                    lineHeight: 1.1,
                    fontFamily: 'var(--font-poppins), sans-serif',
                    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.04em'
                  }}
                >
                  About Bryan Hadden
                </Title>
                
                <Text 
                  size="xl" 
                  c="rgba(255, 255, 255, 0.8)" 
                  maw={600} 
                  mx="auto"
                  style={{ 
                    lineHeight: 1.7,
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '1.125rem',
                    letterSpacing: '0.005em'
                  }}
                >
                  Music Producer • Creative Visionary • Sound Architect
                </Text>
              </Box>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Paper
                shadow="xl"
                radius="xl"
                p="xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 20px 48px rgba(0, 0, 0, 0.3), 0 8px 16px rgba(0, 0, 0, 0.2)',
                }}
              >
                <Group align="flex-start" gap="xl">
                  {/* Profile Image */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Avatar 
                      size={200} 
                      src="/me2.jpeg" 
                      alt="Bryan Hadden"
                      radius="xl"
                      style={{
                        border: '4px solid rgba(255,255,255,0.2)',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
                        minWidth: '200px'
                      }}
                    />
                  </motion.div>

                  {/* Bio Content */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    style={{ flex: 1 }}
                  >
                    <Stack gap="lg">
                      <Text 
                        size="lg" 
                        c="rgba(255, 255, 255, 0.9)"
                        style={{ 
                          lineHeight: 1.7,
                          fontFamily: 'var(--font-inter), sans-serif',
                          fontSize: '1.125rem'
                        }}
                      >
                        As a passionate music producer with over a decade of experience, I
                        specialize in helping artists discover and refine their unique
                        sound. My production style blends contemporary techniques with
                        timeless musical principles, creating tracks that feel both fresh
                        and authentic.
                      </Text>

                      <Text 
                        size="lg" 
                        c="rgba(255, 255, 255, 0.9)"
                        style={{ 
                          lineHeight: 1.7,
                          fontFamily: 'var(--font-inter), sans-serif',
                          fontSize: '1.125rem'
                        }}
                      >
                        I&apos;ve worked across multiple genres including indie rock,
                        electronic, and alternative pop, always focusing on bringing out
                        the artist&apos;s vision rather than imposing my own. My studio is
                        equipped with both vintage and cutting-edge equipment, allowing
                        for a wide range of sonic possibilities.
                      </Text>

                      <Box
                        p="lg"
                        style={{
                          background: 'rgba(102, 126, 234, 0.1)',
                          border: '1px solid rgba(102, 126, 234, 0.3)',
                          borderRadius: '12px',
                          marginTop: '8px'
                        }}
                      >
                        <Text 
                          size="lg" 
                          c="rgba(255, 255, 255, 0.95)"
                          fw={500}
                          style={{ 
                            lineHeight: 1.7,
                            fontFamily: 'var(--font-inter), sans-serif',
                            fontSize: '1.125rem'
                          }}
                        >
                          Whether you&apos;re recording your first EP or looking to evolve your
                          established sound, I&apos;m committed to creating a collaborative
                          environment where your music can truly shine. My philosophy is
                          simple: <strong style={{ color: 'white' }}>make your music sound more like you.</strong>
                        </Text>
                      </Box>
                    </Stack>
                  </motion.div>
                </Group>
              </Paper>
            </motion.div>

            {/* Stats/Highlights Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Group grow gap="lg">
                <Paper
                  p="lg"
                  radius="md"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    textAlign: 'center'
                  }}
                >
                  <Stack gap="sm" align="center">
                    <IconMusic size={32} color="rgba(102, 126, 234, 0.8)" />
                    <Text c="white" fw={600} size="lg">10+ Years</Text>
                    <Text c="rgba(255, 255, 255, 0.7)" size="sm">Experience</Text>
                  </Stack>
                </Paper>

                <Paper
                  p="lg"
                  radius="md"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    textAlign: 'center'
                  }}
                >
                  <Stack gap="sm" align="center">
                    <IconMicrophone size={32} color="rgba(102, 126, 234, 0.8)" />
                    <Text c="white" fw={600} size="lg">Multi-Genre</Text>
                    <Text c="rgba(255, 255, 255, 0.7)" size="sm">Expertise</Text>
                  </Stack>
                </Paper>

                <Paper
                  p="lg"
                  radius="md"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    textAlign: 'center'
                  }}
                >
                  <Stack gap="sm" align="center">
                    <IconUsers size={32} color="rgba(102, 126, 234, 0.8)" />
                    <Text c="white" fw={600} size="lg">Collaborative</Text>
                    <Text c="rgba(255, 255, 255, 0.7)" size="sm">Approach</Text>
                  </Stack>
                </Paper>
              </Group>
            </motion.div>
          </Stack>
        </Container>
      </Box>
    </main>
  );
};

export default AboutPage;
