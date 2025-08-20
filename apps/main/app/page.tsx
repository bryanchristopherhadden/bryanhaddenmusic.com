"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, Text, Group, Container, Title, Center, Box } from '@mantine/core';
import { IconMusic, IconCode } from '@tabler/icons-react';

const SiteCard = ({ title, description, url, icon }: { title: string; description: string; url: string; icon: React.ReactNode }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      style={{ height: '100%' }}
    >
      <Card
        shadow="lg"
        padding="xl"
        radius="md"
        withBorder
        style={{
          height: '100%',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
        component={Link}
        href={url}
      >
        <Center mb="md">
          <Box style={{ fontSize: '4rem' }}>
            {icon}
          </Box>
        </Center>
        
        <Title order={2} ta="center" mb="sm" c="white">
          {title}
        </Title>
        
        <Text ta="center" c="dimmed" size="sm" mb="md">
          {description}
        </Text>
        
        <Center>
          <Text c="white" size="lg" fw={500}>
            →
          </Text>
        </Center>
      </Card>
    </motion.div>
  );
};

export default function Home(): JSX.Element {
  return (
    <main className="homepage">
      <Container size="lg" py="xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Center>
            <Box ta="center" mb="xl">
              <Title order={1} size="3.5rem" mb="md" c="white" fw={700}>
                Hi I'm Bryan Hadden
              </Title>
              <Text size="xl" c="dimmed" fw={400}>
                Please checkout some of the stuff I've made.
              </Text>
            </Box>
          </Center>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Group grow gap="xl" justify="center" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <SiteCard
              title="Music"
              description="Music production, beats, and creative collaborations"
              url="/music"
              icon={<IconMusic size={64} stroke={1.5} />}
            />
            
            <SiteCard
              title="Tech"
              description="Full-stack development portfolio and technical projects"
              url="/tech"
              icon={<IconCode size={64} stroke={1.5} />}
            />
          </Group>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Center mt="xl">
            <Text c="dimmed" size="lg" fw={500}>
              FullStack Developer • Music Producer • Creative Thinker
            </Text>
          </Center>
        </motion.div>
      </Container>
    </main>
  );
}
