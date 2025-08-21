'use client'

import React, { useState, useEffect } from 'react'
import { Container, Title, Text, Box, Stack, Button, Group, SimpleGrid, Card, Image, Badge, Avatar } from '@mantine/core'
import { IconMail, IconArrowRight, IconExternalLink } from '@tabler/icons-react'
import Project from './projects'
import PortfolioSkeleton from './PortfolioSkeleton'
import styled from 'styled-components'

const StyledHero = styled(Box)`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  padding: 120px 0 80px;
  margin-top: 60px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.03"><circle cx="30" cy="30" r="1"/></g></g></svg>');
    opacity: 0.4;
  }
`

const StyledCard = styled.div`
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
  cursor: pointer;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: #e0e0e0;
  }
`

const ProjectImage = styled(Image)`
  aspect-ratio: 16/10;
  object-fit: cover;
`

const projects = [
  {
    id: 'vesselTrackerProject',
    title: 'Vessel Tracker App',
    description: 'A comprehensive vessel tracking solution with real-time monitoring and analytics dashboard.',
    image: '/videos/vesseltracker-app.mp4',
    tags: ['React', 'Node.js', 'PostgreSQL', 'WebSockets'],
    status: 'Production',
    year: '2023'
  },
  {
    id: 'vt_PrototypeProject',
    title: 'Vehicle Tracker Entrypoint',
    description: 'Modern entry point application for vehicle tracking with intuitive user interface.',
    image: '/videos/entry-prototype.mp4',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    status: 'Prototype',
    year: '2023'
  },
  {
    id: 'hd_internalFramework',
    title: 'Internal Framework',
    description: 'Custom framework solution designed for scalable enterprise applications.',
    image: '/videos/entry-app.mp4',
    tags: ['JavaScript', 'Custom Framework', 'API Design'],
    status: 'Internal',
    year: '2022'
  }
]

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

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId)
  }

  if (isLoading) {
    return <PortfolioSkeleton />
  }

  return (
    <Box>
      {/* Hero Section */}
      <StyledHero>
        <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
          <Stack gap="xl" align="center" ta="center">
            <Avatar size={120} src="/me2.jpeg" alt="Bryan Hadden" />
            <Title order={1} size="3.5rem" fw={600} lh={1.2}>
              Full Stack Developer
            </Title>
            <Title order={2} size="1.5rem" fw={400} c="rgba(255,255,255,0.8)" maw={800}>
              I craft digital experiences that solve real-world problems through thoughtful design and robust engineering.
            </Title>

            <Group gap="lg" mt="xl">
              <Button
                component="a"
                href="mailto:bryanchrishadden@gmail.com"
                leftSection={<IconMail size={20} />}
                variant="filled"
                color="blue"
                size="lg"
                radius="md"
              >
                Get in touch
              </Button>
              <Button
                component="a"
                href="/bryan-hadden-resume.pdf"
                target="_blank"
                rightSection={<IconExternalLink size={20} />}
                variant="outline"
                color="white"
                size="lg"
                radius="md"
              >
                View Resume
              </Button>
            </Group>
          </Stack>
        </Container>
      </StyledHero>

      {/* Work Section */}
      <Container size="lg" py={80}>
        {selectedProject === 'none' ? (
          <Stack gap={60}>
            {/* Section Header */}
            <Box ta="center">
              <Title order={2} size="2.5rem" fw={600} mb="md">
                My Work
              </Title>
              <Text size="xl" c="white" maw={600} mx="auto">
                A collection of projects that showcase my expertise in full-stack development,
                from concept to deployment.
              </Text>
            </Box>

            {/* Projects Grid */}
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl">
              {projects.map((project) => (
                <StyledCard
                  key={project.id}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div style={{ height: 250, background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6c757d', fontSize: '14px', fontWeight: 500, margin: '-16px -16px 16px -16px', borderRadius: '8px 8px 0 0' }}>
                    {project.title}
                  </div>

                  <Stack gap="md" mt="md">
                    <Group justify="space-between" align="flex-start">
                      <Text fw={600} size="lg">
                        {project.title}
                      </Text>
                      <Badge variant="light" size="sm">
                        {project.year}
                      </Badge>
                    </Group>

                    <Text size="sm" c="dimmed" lineClamp={3}>
                      {project.description}
                    </Text>

                    <Group gap="xs">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" size="xs">
                          {tag}
                        </Badge>
                      ))}
                    </Group>

                    <Group justify="space-between" align="center" mt="md">
                      <Badge variant="filled" size="sm" color={
                        project.status === 'Production' ? 'green' :
                          project.status === 'Prototype' ? 'blue' : 'gray'
                      }>
                        {project.status}
                      </Badge>
                      <Button
                        variant="subtle"
                        size="sm"
                        rightSection={<IconArrowRight size={16} />}
                      >
                        View Project
                      </Button>
                    </Group>
                  </Stack>
                </StyledCard>
              ))}
            </SimpleGrid>

            {/* CTA Section */}
            <Box ta="center" pt={60}>
              <Title order={3} size="2rem" c="white" fw={600} mb="md">
                Let's work together
              </Title>
              <Text size="lg" c="white" mb="xl" maw={500} mx="auto">
                Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
              </Text>
              <Button
                component="a"
                href="mailto:bryanchrishadden@gmail.com"
                size="lg"
                leftSection={<IconMail size={20} />}
              >
                Start a conversation
              </Button>
            </Box>
          </Stack>
        ) : (
          <Project selectedProject={selectedProject} onGoBack={() => setSelectedProject('none')} />
        )}
      </Container>
    </Box>
  )
} 