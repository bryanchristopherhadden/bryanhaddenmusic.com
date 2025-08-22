'use client'

import React, { useState, useEffect } from 'react'
import { Container, Title, Text, Box, Stack, Button, Group, SimpleGrid, Card, Image, Badge, Avatar } from '@mantine/core'
import { IconMail, IconArrowRight, IconExternalLink } from '@tabler/icons-react'
import Project from './projects'
import PortfolioSkeleton from './PortfolioSkeleton'
import styled from 'styled-components'

const StyledHero = styled(Box)`
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2d2d2d 100%);
  color: white;
  padding: 100px 0 80px;
  margin-top: 60px;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 80px 0 60px;
    margin-top: 40px;
  }
  
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
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  }
`

const StyledCard = styled.div`
  position: relative;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.2);
  }
  
  .video-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.3) 40%,
      rgba(0, 0, 0, 0.7) 100%
    );
    z-index: 2;
  }
  
  .content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 32px;
    z-index: 3;
    color: white;
  }
  
  .project-title {
    font-family: var(--font-poppins), sans-serif;
    font-weight: 700;
    font-size: 2rem;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: white;
    margin-bottom: 12px;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  .project-description {
    font-family: var(--font-inter), sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 400;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
    max-width: 90%;
  }
  
  .pause-button {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }
  }
  
  .pause-icon {
    width: 12px;
    height: 12px;
    position: relative;
    
    &::before,
    &::after {
      content: '';
      position: absolute;
      background: white;
      border-radius: 1px;
    }
    
    &.paused::before {
      width: 0;
      height: 0;
      border-left: 8px solid white;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      left: 2px;
      top: 2px;
    }
    
    &.playing::before,
    &.playing::after {
      width: 2px;
      height: 12px;
    }
    
    &.playing::before {
      left: 2px;
    }
    
    &.playing::after {
      right: 2px;
    }
  }
  
  .status-badge {
    position: absolute;
    top: 20px;
    left: 20px;
    padding: 6px 12px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    font-family: var(--font-inter), sans-serif;
    z-index: 4;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  @media (max-width: 768px) {
    height: 320px;
    
    .content {
      padding: 24px;
    }
    
    .project-title {
      font-size: 1.5rem;
    }
    
    .project-description {
      font-size: 0.9rem;
    }
  }
`

const ProjectImage = styled(Image)`
  aspect-ratio: 16/10;
  object-fit: cover;
`

const projects = [
  {
    id: 'vesselTrackerProject',
    title: 'Vessel Tracker',
    description: 'I built an international maritime logistics with real-time vessel tracking, delivering unprecedented visibility into global shipping operations.',
    video: '/videos/vesseltracker-app.mp4',
    tags: ['React', 'Node.js', 'PostgreSQL', 'WebSockets'],
    status: 'Production',
    year: '2023',
    brand: 'Maritime Solutions'
  },
  {
    id: 'vt_PrototypeProject', 
    title: 'Porsche Digital Solutions',
    description: 'We transformed the automotive experience through innovative digital platforms, enhancing customer engagement and operational efficiency.',
    video: '/videos/entry-prototype.mp4',
    tags: ['TypeScript', 'Next.js', 'Automotive APIs'],
    status: 'Enterprise',
    year: '2023',
    brand: 'Porsche'
  },
  {
    id: 'hd_internalFramework',
    title: 'Home Depot',
    description: 'We reimagined home improvement retail through cutting-edge e-commerce solutions, empowering millions of customers nationwide.',
    video: 'https://videos.pexels.com/video-files/6195149/6195149-uhd_2560_1440_25fps.mp4',
    tags: ['React', 'E-commerce', 'Retail Systems'],
    status: 'Enterprise',
    year: '2022',
    brand: 'The Home Depot'
  }
]

export default function PortfolioClient() {
  const [selectedProject, setSelectedProject] = useState('none')
  const [isLoading, setIsLoading] = useState(true)
  const [pausedVideos, setPausedVideos] = useState<{[key: string]: boolean}>({})

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

  const toggleVideoPlayback = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation()
    const video = document.querySelector(`[data-project-id="${projectId}"] video`) as HTMLVideoElement
    if (video) {
      if (video.paused) {
        video.play()
        setPausedVideos(prev => ({ ...prev, [projectId]: false }))
      } else {
        video.pause()
        setPausedVideos(prev => ({ ...prev, [projectId]: true }))
      }
    }
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
            <Avatar 
              size={140} 
              src="/me2.jpeg" 
              alt="Bryan Hadden"
              style={{
                border: '4px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }}
            />
            <Title 
              order={1} 
              size="3.75rem" 
              fw={700} 
              lh={1.1}
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.04em',
                textAlign: 'center'
              }}
            >
              Full Stack Developer
            </Title>
            <Title 
              order={2} 
              size="1.375rem" 
              fw={400} 
              c="rgba(255,255,255,0.85)" 
              maw={700}
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                lineHeight: 1.6,
                textAlign: 'center',
                letterSpacing: '0.01em'
              }}
            >
              I craft digital experiences that solve real-world problems through thoughtful design and robust engineering.
            </Title>

            <Group gap="lg" mt="xl">
              <Button
                component="a"
                href="mailto:bryanchrishadden@gmail.com"
                leftSection={<IconMail size={20} />}
                variant="filled"
                size="lg"
                radius="md"
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.025em',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                  transition: 'all 0.3s ease'
                }}
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
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 500,
                  letterSpacing: '0.025em',
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'rgba(255,255,255,0.9)',
                  transition: 'all 0.3s ease'
                }}
              >
                View Resume
              </Button>
            </Group>
          </Stack>
        </Container>
      </StyledHero>

      {/* Work Section */}
      <Container size="lg" py={60} style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        {selectedProject === 'none' ? (
          <Stack gap={50}>
            {/* Section Header */}
            <Box ta="center">
              {/* <Title 
                order={2} 
                size="2.75rem" 
                fw={700} 
                mb="lg"
                style={{
                  fontFamily: 'var(--font-poppins), sans-serif',
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #4a5568 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.03em'
                }}
              >
                My Work
              </Title> */}
              <Text 
                size="xl" 
                c="#6b7280" 
                maw={640} 
                mx="auto"
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  lineHeight: 1.7,
                  fontSize: '1.125rem',
                  letterSpacing: '0.005em'
                }}
              >
                A collection of projects that showcase my expertise in full-stack development,
                from concept to deployment.
              </Text>
            </Box>

            {/* Projects Grid */}
            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl">
              {projects.map((project) => (
                <StyledCard
                  key={project.id}
                  data-project-id={project.id}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <video 
                    className="video-background"
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                  
                  <div className="overlay" />
                  
                  <div 
                    className="pause-button" 
                    onClick={(e) => toggleVideoPlayback(e, project.id)}
                    style={{
                      opacity: pausedVideos[project.id] ? 1 : 0.7
                    }}
                  >
                    <div className={`pause-icon ${pausedVideos[project.id] ? 'paused' : 'playing'}`} />
                  </div>
                  
                  <div className="status-badge">
                    {project.status}
                  </div>
                  
                  <div className="content">
                    <h3 className="project-title">
                      {project.title}
                    </h3>
                    <p className="project-description">
                      {project.description}
                    </p>
                  </div>
                </StyledCard>
              ))}
            </SimpleGrid>

            {/* CTA Section */}
            <Box 
              ta="center" 
              pt={60}
              style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                padding: '60px 40px',
                borderRadius: '20px',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.06)'
              }}
            >
              <Title 
                order={3} 
                size="2.25rem" 
                fw={700} 
                mb="md"
                style={{
                  fontFamily: 'var(--font-poppins), sans-serif',
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #4a5568 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.025em'
                }}
              >
                Let's work together
              </Title>
              <Text 
                size="lg" 
                c="#6b7280" 
                mb="xl" 
                maw={520} 
                mx="auto"
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  lineHeight: 1.7,
                  fontSize: '1.125rem',
                  letterSpacing: '0.005em'
                }}
              >
                Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
              </Text>
              <Button
                component="a"
                href="mailto:bryanchrishadden@gmail.com"
                size="lg"
                leftSection={<IconMail size={20} />}
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.025em',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  boxShadow: '0 8px 24px rgba(102, 126, 234, 0.35)'
                }}
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