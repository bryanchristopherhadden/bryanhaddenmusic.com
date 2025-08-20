"use client";

import MusicPlayer from "../components/MusicPlayer";
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
    <main>
      <Box style={{ marginTop: '60px', minHeight: '100vh' }}>
        <Container size="lg" py="xl">
          <Stack gap="xl" align="center">
            {/* Music Player */}
            <Center w="100%" maw={600}>
              <MusicPlayer
                visible={true}
                onClose={toggleModal}
                onPlayingChange={setIsPlaying}
              />
            </Center>

            {/* Content */}
            <Stack gap="lg" ta="center" maw={800}>
              <Title order={1} size="2.5rem" c="white" fw={400} style={{ lineHeight: 1.2 }}>
                Warm grooves. Small drops. Big feeling..
              </Title>
              
              <Text size="lg" c="dimmed" style={{ lineHeight: 1.6 }}>
                Soulful instrumental music and limited-run collectibles — handcrafted for late nights, 
                long drives, and the people who keep coming back.
              </Text>

              <Center>
                <Stack gap="md" align="center">
                  <Button 
                    variant="filled" 
                    color="blue" 
                    size="lg" 
                    disabled 
                    opacity={0.5}
                  >
                    Listen / Pre-save
                  </Button>
                  <Button 
                    variant="outline" 
                    color="blue" 
                    size="lg" 
                    disabled 
                    opacity={0.5}
                  >
                    Shop Limited Drops
                  </Button>
                </Stack>
              </Center>
            </Stack>
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
            background: "linear-gradient(90deg, #6372ff, #4c5be4)",
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
