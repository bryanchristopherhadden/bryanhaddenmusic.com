'use client'

import React, { useState, useEffect } from 'react'
import { Container, Title, Text, Box, Stack, Button, Group, SimpleGrid, Card, Image, Badge, Avatar, Modal, TextInput, Textarea, LoadingOverlay } from '@mantine/core'
import { IconMail, IconArrowRight, IconExternalLink, IconX, IconSend, IconDownload } from '@tabler/icons-react'
import Project from './projects'
import PortfolioSkeleton from './PortfolioSkeleton'
import styled from 'styled-components'
import { TECH_ROLE } from '../copy'

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
    description: 'Engineered a cutting-edge maritime command center that transforms chaos into clarity, tracking thousands of vessels across oceans in real-time while revolutionizing how the world moves cargo.',
    video: '/videos/vesseltracker-app.mp4',
    tags: ['React', 'Node.js', 'PostgreSQL', 'WebSockets'],
    status: 'Production',
    year: '2023',
    brand: 'Maritime Solutions'
  },
  {
    id: 'vt_PrototypeProject',
    title: 'Porsche Digital',
    description: 'Created a smart consultant-project matching platform for Porsche that analyzes skills and requirements to optimize team assignments and enhance project success rates.',
    video: 'https://videos.pexels.com/video-files/8630306/8630306-uhd_3840_2160_25fps.mp4',
    tags: ['TypeScript', 'Next.js', 'Automotive APIs'],
    status: 'Enterprise',
    year: '2023',
    brand: 'Porsche'
  },
  {
    id: 'hd_internalFramework',
    title: 'Home Depot',
    description: 'I rebuilt Home Depot\'s internal design system from the ground up, creating scalable components and unified design standards that empowered development teams nationwide.',
    video: 'https://videos.pexels.com/video-files/4480443/4480443-hd_1920_1080_30fps.mp4',
    tags: ['React', 'E-commerce', 'Retail Systems'],
    status: 'Enterprise',
    year: '2022',
    brand: 'The Home Depot'
  }
]

export default function PortfolioClient() {
  const [selectedProject, setSelectedProject] = useState('none')
  const [isLoading, setIsLoading] = useState(false)
  const [pausedVideos, setPausedVideos] = useState<{ [key: string]: boolean }>({})
  const [resumeModalOpened, setResumeModalOpened] = useState(false)
  const [emailModalOpened, setEmailModalOpened] = useState(false)
  const [isEmailSending, setIsEmailSending] = useState(false)
  const [emailForm, setEmailForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [emailStatus, setEmailStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Ensure hydration is complete
    setIsLoading(false)
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

  const handleEmailFormChange = (field: string, value: string) => {
    setEmailForm(prev => ({ ...prev, [field]: value }))
  }

  const resetEmailForm = () => {
    setEmailForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
    setEmailStatus('idle')
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsEmailSending(true)
    setEmailStatus('idle')

    try {
      const response = await fetch('/api/send-contact-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: emailForm.name,
          email: emailForm.email,
          subject: emailForm.subject,
          message: emailForm.message,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        console.log('Email sent successfully:', result)
        setEmailStatus('success')
        resetEmailForm()

        // Close modal after 2 seconds
        setTimeout(() => {
          setEmailModalOpened(false)
        }, 2000)
      } else {
        throw new Error(result.error || 'Failed to send email')
      }
    } catch (error) {
      console.error('Failed to send email:', error)
      setEmailStatus('error')
    } finally {
      setIsEmailSending(false)
    }
  }

  const openEmailModal = () => {
    resetEmailForm()
    setEmailModalOpened(true)
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
              size={200}
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
              lh={1.25}
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
              Forward Deployed Engineer
            </Title>
            <Text
              size="1.275rem"
              fw={400}
              c="rgba(255,255,255,0.85)"
              maw={900}
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                lineHeight: 1.6,
                textAlign: 'left',
                letterSpacing: '0.01em',
              }}
            >
              I partner directly with customers to turn complex operational
              challenges into production-ready software. With 10+ years building
              Node.js and Python systems, from GraphQL and gRPC services to
              financial data platforms, I work across the stack from discovery
              and rapid prototyping through deployment and iteration.
            </Text>

            <Group gap="lg" mt="xl">
              <Button
                onClick={openEmailModal}
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '.65';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                Let&apos;s work together
              </Button>
              <Button
                onClick={() => setResumeModalOpened(true)}
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
                c="white"
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
            <SimpleGrid
              cols={{ base: 1, md: 2, lg: 3 }}
              spacing="xl"
              style={{
                margin: '1rem 0 5rem'
              }}
            >
              {projects.map((project) => (
                <StyledCard
                  key={project.id}
                  data-project-id={project.id}
                  onClick={() => handleProjectClick(project.id)}
                  style={{
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '.65';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
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
          </Stack>
        ) : (
          <Project selectedProject={selectedProject} onGoBack={() => setSelectedProject('none')} />
        )}
      </Container>

      {/* Resume Modal */}
      <Modal
        opened={resumeModalOpened}
        onClose={() => setResumeModalOpened(false)}
        title="Bryan Hadden - Resume"
        size="lg"
        centered
        styles={{
          header: {
            backgroundColor: '#1a1a1a',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            padding: '1rem 1.5rem',
          },
          title: {
            color: 'white',
            fontFamily: 'var(--font-inter), sans-serif',
            fontWeight: 600,
            fontSize: '1.25rem',
          },
          body: {
            backgroundColor: '#1a1a1a',
            padding: '2rem',
            textAlign: 'center',
          },
          close: {
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1.5rem',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          },
        }}
      >
        <Stack gap="lg" align="center">
          <Text size="lg" c="white" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Choose how you&apos;d like to access the resume:
          </Text>

          <Group gap="md" justify="center">
            <Button
              onClick={() => {
                window.open('/bryan-hadden-resume.pdf', '_blank');
                setResumeModalOpened(false);
              }}
              leftSection={<IconExternalLink size={20} />}
              variant="filled"
              size="lg"
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
              }}
            >
              Open PDF
            </Button>

            <Button
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/bryan-hadden-resume.pdf';
                link.download = 'Bryan-Hadden-Resume.pdf';
                link.click();
                setResumeModalOpened(false);
              }}
              leftSection={<IconDownload size={20} />}
              variant="outline"
              size="lg"
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontWeight: 600,
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Download PDF
            </Button>
          </Group>

          <Text size="sm" c="rgba(255,255,255,0.6)" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            The resume will open in a new tab for the best viewing experience.
          </Text>
        </Stack>
      </Modal>

      {/* Email Modal */}
      <Modal
        opened={emailModalOpened}
        onClose={() => setEmailModalOpened(false)}
        title="Let's work together"
        size="md"
        centered
        styles={{
          header: {
            backgroundColor: '#1a1a1a',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          },
          title: {
            color: 'white',
            fontFamily: 'var(--font-inter), sans-serif',
            fontWeight: 600,
          },
          body: {
            backgroundColor: '#1a1a1a',
            padding: '24px',
          },
          close: {
            color: 'rgba(255,255,255,0.7)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          },
        }}
      >
        <Box style={{ position: 'relative' }}>
          <LoadingOverlay visible={isEmailSending} />

          {emailStatus === 'success' ? (
            <Stack gap="md" ta="center">
              <Text size="lg" c="green" fw={600}>
                Message sent successfully! 🎉
              </Text>
              <Text size="sm" c="rgba(255,255,255,0.7)">
                I&apos;ll get back to you as soon as possible.
              </Text>
            </Stack>
          ) : emailStatus === 'error' ? (
            <Stack gap="md" ta="center">
              <Text size="lg" c="red" fw={600}>
                Failed to send message 😞
              </Text>
              <Text size="sm" c="rgba(255,255,255,0.7)">
                Please try again or contact me directly at bryanchrishadden@gmail.com
              </Text>
              <Button
                onClick={() => setEmailStatus('idle')}
                variant="outline"
                size="sm"
                color="red"
              >
                Try Again
              </Button>
            </Stack>
          ) : (
            <form onSubmit={handleEmailSubmit}>
              <Stack gap="md">
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  required
                  value={emailForm.name}
                  onChange={(e) => handleEmailFormChange('name', e.target.value)}
                  styles={{
                    label: { color: 'white', fontFamily: 'var(--font-inter), sans-serif' },
                    input: {
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                      '&:focus': {
                        borderColor: '#667eea',
                      },
                    },
                  }}
                />

                <TextInput
                  label="Email"
                  placeholder="your.email@example.com"
                  type="email"
                  required
                  value={emailForm.email}
                  onChange={(e) => handleEmailFormChange('email', e.target.value)}
                  styles={{
                    label: { color: 'white', fontFamily: 'var(--font-inter), sans-serif' },
                    input: {
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                      '&:focus': {
                        borderColor: '#667eea',
                      },
                    },
                  }}
                />

                <TextInput
                  label="Subject"
                  placeholder="What's this about?"
                  required
                  value={emailForm.subject}
                  onChange={(e) => handleEmailFormChange('subject', e.target.value)}
                  styles={{
                    label: { color: 'white', fontFamily: 'var(--font-inter), sans-serif' },
                    input: {
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                      '&:focus': {
                        borderColor: '#667eea',
                      },
                    },
                  }}
                />

                <Textarea
                  label="Message"
                  placeholder="Tell me about your project, ideas, or how I can help..."
                  required
                  minRows={4}
                  value={emailForm.message}
                  onChange={(e) => handleEmailFormChange('message', e.target.value)}
                  styles={{
                    label: { color: 'white', fontFamily: 'var(--font-inter), sans-serif' },
                    input: {
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                      '&:focus': {
                        borderColor: '#667eea',
                      },
                    },
                  }}
                />

                <Button
                  type="submit"
                  leftSection={<IconSend size={16} />}
                  size="lg"
                  loading={isEmailSending}
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontWeight: 600,
                    letterSpacing: '0.025em',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                    marginTop: '8px'
                  }}
                >
                  Send Message
                </Button>
              </Stack>
            </form>
          )}
        </Box>
      </Modal>
    </Box>
  )
} 