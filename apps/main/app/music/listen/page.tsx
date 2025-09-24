"use client";

import MusicPlayer from "../../components/MusicPlayer";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Container, Title, Text, Button, Stack, Center, Box } from '@mantine/core';

interface DropdownContentProps {
  modalIsVisable: boolean;
  onClose: () => void;
}

export default function MusicPage(): JSX.Element {
  const columnRef = useRef<HTMLDivElement>(null);
  const [modalIsVisable, setModalIsVisable] = useState<boolean>(true);
  const [_, setIsMobile] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobile(window.innerWidth <= 990);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleModal = (): void => {
    const newModalState = !modalIsVisable;
    setModalIsVisable(newModalState);
    setIsPlaying(newModalState);
  };

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
          <Stack gap="xl" align="center">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ width: '100%', textAlign: 'center' }}
            >
              <Title 
                order={1} 
                size="4rem" 
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
                Warm grooves. Small drops. Big feeling.
              </Title>
              
              <Text 
                size="xl" 
                c="rgba(255, 255, 255, 0.8)" 
                maw={700} 
                mx="auto"
                style={{ 
                  lineHeight: 1.7,
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '1.25rem',
                  letterSpacing: '0.005em'
                }}
              >
                Soulful instrumental music and limited-run collectibles — handcrafted for late nights, 
                long drives, and the people who keep coming back.
              </Text>
            </motion.div>

            {/* Music Player */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ width: '100%', maxWidth: '700px' }}
            >
              <MusicPlayer
                visible={true}
                onClose={toggleModal}
                onPlayingChange={setIsPlaying}
              />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Stack gap="lg" align="center">
                <Button 
                  variant="filled" 
                  size="xl" 
                  radius="md"
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontWeight: 600,
                    letterSpacing: '0.025em',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.3s ease',
                    padding: '12px 32px',
                    fontSize: '1.1rem'
                  }}
                  onClick={() => {
                    // Scroll to music player
                    const player = document.querySelector('[data-player="true"]');
                    player?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  ▶ Listen Now
                </Button>
                
                <Text 
                  size="sm" 
                  c="rgba(255, 255, 255, 0.6)"
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem'
                  }}
                >
                  Coming Soon: Limited Edition Drops
                </Text>
              </Stack>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              style={{ width: '100%', marginTop: '4rem' }}
            >
              <Box
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: '40px',
                  textAlign: 'center'
                }}
              >
                <Stack gap="lg">
                  <Text 
                    c="rgba(255, 255, 255, 0.9)" 
                    size="lg" 
                    fw={600}
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    Current Rotation
                  </Text>
                  <Text 
                    c="rgba(255, 255, 255, 0.7)" 
                    style={{ 
                      fontFamily: 'var(--font-inter), sans-serif',
                      lineHeight: 1.6 
                    }}
                  >
                    10+ original tracks • Lo-fi hip-hop • Jazz fusion • Ambient soundscapes
                  </Text>
                </Stack>
              </Box>
            </motion.div>
          </Stack>
        </Container>

        {/* Music animation bar at bottom */}
        <motion.div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: "linear-gradient(90deg, #667eea, #764ba2)",
            zIndex: 1000,
          }}
          initial={{ x: "-100%" }}
          animate={isPlaying ? { x: "100%" } : { x: "-100%" }}
          transition={{
            duration: 3,
            repeat: isPlaying ? Infinity : 0,
            ease: "linear"
          }}
        />
      </Box>
    </main>
  );
}
