import React from 'react';
import dynamic from 'next/dynamic'
import { Container, Title, Text, Box, Stack, Button, Group, Badge, SimpleGrid } from '@mantine/core'
import { IconArrowLeft, IconExternalLink } from '@tabler/icons-react'
import styled from 'styled-components'

const ReactPlayer = dynamic(() => import('react-player'), {
    ssr: false,
    loading: () => <div style={{ 
        height: '400px', 
        background: '#f8f9fa', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: '8px',
        color: '#6c757d'
    }}>Loading video player...</div>
})

const ProjectHeader = styled(Box)`
  padding: 60px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  margin: -40px -40px 40px -40px;
  border-radius: 12px;
`

const VideoContainer = styled(Box)`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  margin: 40px 0;
`

const TechStack = styled(SimpleGrid)`
  gap: 8px;
  margin: 20px 0;
`

interface VesselTrackerContentProps {
    onGoBack?: () => void;
}

const VesselTrackerContent: React.FC<VesselTrackerContentProps> = ({ onGoBack }) => {
    const techStack = ['React', 'Node.js', 'AWS', 'Redux', 'Jest', 'JWT Tokens', 'Google Maps API']

    return (
        <Box>
            {/* Project Header */}
            <ProjectHeader>
                <Stack gap="lg" ta="center">
                    <Button
                        variant="subtle"
                        leftSection={<IconArrowLeft size={16} />}
                        onClick={onGoBack}
                        style={{ alignSelf: 'flex-start' }}
                    >
                        Back to Projects
                    </Button>
                    
                    <Stack gap="md" align="center">
                        <Badge variant="light" color="green" size="lg">
                            Production
                        </Badge>
                        <Title order={1} size="2.5rem" fw={600}>
                            Vessel Tracker App
                        </Title>
                        <Text size="xl" c="dimmed" ta="center" maw={800}>
                            A comprehensive vessel tracking solution with real-time monitoring and analytics dashboard, 
                            currently deployed at every port worldwide that handles Porsche vehicle logistics.
                        </Text>
                    </Stack>
                </Stack>
            </ProjectHeader>

            {/* Tech Stack */}
            <Box mb="xl">
                <Title order={3} size="1.2rem" fw={600} mb="md">
                    Technologies Used
                </Title>
                <Group gap="sm">
                    {techStack.map((tech) => (
                        <Badge key={tech} variant="outline" size="md">
                            {tech}
                        </Badge>
                    ))}
                </Group>
            </Box>

            {/* Project Overview */}
            <Stack gap="xl">
                <Box>
                    <Title order={3} size="1.5rem" fw={600} mb="md">
                        Project Overview
                    </Title>
                    <Text size="lg" lh={1.6}>
                        This vessel tracking application was designed to meet the complex needs of global port operations 
                        handling Porsche vehicle logistics. The system needed to be responsive across all device types, 
                        from mobile phones to large port monitoring screens.
                    </Text>
                </Box>

                <Box>
                    <Title order={3} size="1.5rem" fw={600} mb="md">
                        Key Challenges
                    </Title>
                    <Text size="lg" lh={1.6}>
                        The diverse user base included port managers, logistics coordinators, finance teams, technicians, 
                        and C-suite executives. Each group required different views and functionalities while maintaining 
                        a unified, intuitive experience. The application completely replaced Porsche&apos;s legacy vessel 
                        tracking system.
                    </Text>
                </Box>

                {/* Video Demo */}
                <Box>
                    <Title order={3} size="1.5rem" fw={600} mb="md">
                        Live Demo
                    </Title>
                    <VideoContainer>
                        <ReactPlayer 
                            url="/videos/vesseltracker-app.mp4" 
                            playing={true} 
                            loop={true} 
                            width="100%" 
                            height="400px"
                            controls={true}
                        />
                    </VideoContainer>
                </Box>

                {/* Results */}
                <Box>
                    <Title order={3} size="1.5rem" fw={600} mb="md">
                        Impact & Results
                    </Title>
                    <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
                        <Box ta="center" p="lg" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                            <Title order={4} size="2rem" fw={700} c="blue">
                                100%
                            </Title>
                            <Text size="sm" c="dimmed">
                                Global Port Coverage
                            </Text>
                        </Box>
                        <Box ta="center" p="lg" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                            <Title order={4} size="2rem" fw={700} c="green">
                                5+
                            </Title>
                            <Text size="sm" c="dimmed">
                                User Types Supported
                            </Text>
                        </Box>
                        <Box ta="center" p="lg" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                            <Title order={4} size="2rem" fw={700} c="orange">
                                24/7
                            </Title>
                            <Text size="sm" c="dimmed">
                                Real-time Monitoring
                            </Text>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Stack>
        </Box>
    )
}

export default VesselTrackerContent 