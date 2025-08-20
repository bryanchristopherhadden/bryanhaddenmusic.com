'use client'

import React, { useState, useEffect } from 'react'
import { Container, Title, Text, Box, Stack, Button, Group } from '@mantine/core'
import { IconMail } from '@tabler/icons-react'
import Content from './content'
import Project from './projects'
import PortfolioSkeleton from './PortfolioSkeleton'



export default function PortfolioClient() {
  const [selectedProject, setSelectedProject] = useState('none')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time and ensure hydration is complete
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const projectId = event.currentTarget.id
    if (projectId) {
      setSelectedProject(projectId)
    }
  }

  if (isLoading) {
    return <PortfolioSkeleton />
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        style={{
          background: 'linear-gradient(135deg, #6372ff 0%, #4c5be4 100%)',
          color: 'white',
          padding: '80px 0 60px',
          marginTop: '60px', // Account for fixed navigation
        }}
      >
        <Container size="lg">
          <Stack gap="xl" align="center" ta="center">
            <Title order={1} size="3rem" fw={700}>
              I'm Bryan, a FullStack Developer.
            </Title>
            <Title order={2} size="2rem" fw={400} c="rgba(255,255,255,0.9)">
              I can solve <Text component="span" td="line-through" opacity={0.6}>all some</Text> one of your problems, ok?
            </Title>
            
            <Stack gap="md" maw={600}>
              <Text size="lg" opacity={0.9}>
                Checkout some of the projects I've worked on below!
              </Text>
              <Text size="lg" opacity={0.9}>
                Hiring for a project, or have an idea or problem you'd like to discuss?
              </Text>
              
              <Button
                component="a"
                href="mailto:bryanchrishadden@gmail.com"
                leftSection={<IconMail size={20} />}
                variant="outline"
                color="white"
                size="lg"
                mt="md"
              >
                hey@bryanhadden.com
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Content Section */}
      <Container size="lg" py="xl">
        {selectedProject === 'none' ? (
          <Content handleCardClick={handleCardClick} />
        ) : (
          <Project selectedProject={selectedProject} onGoBack={() => setSelectedProject('none')} />
        )}
      </Container>
    </Box>
  )
} 