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
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  margin: -40px -40px 40px -40px;
  border-radius: 12px;
`

const VideoContainer = styled(Box)`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  margin: 40px 0;
`

interface VTPrototypeContentProps {
    onGoBack?: () => void;
}

const VTPrototypeContent: React.FC<VTPrototypeContentProps> = ({ onGoBack }) => {
    const techStack = ['React', 'Node.js', 'MongoDB', 'JWT Tokens', 'Sketch', 'InVision']

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
                        <Badge variant="light" color="blue" size="lg">
                            Prototype
                        </Badge>
                        <Title order={1} size="2.5rem" fw={600}>
                            Vehicle Tracker Entrypoint
                        </Title>
                        <Text size="xl" c="dimmed" ta="center" maw={800}>
                            A modern dealership experience for tracking customer orders with a social network-inspired 
                            design that&apos;s intuitive and easy to understand at a glance.
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
                        Porsche commissioned a modern dealership experience for tracking customer orders. 
                        Leading the design team in Germany, I created and pitched a concept that combined 
                        social network aesthetics with powerful vehicle tracking functionality.
                    </Text>
                </Box>

                <Box>
                    <Title order={3} size="1.5rem" fw={600} mb="md">
                        Design Challenge
                    </Title>
                    <Text size="lg" lh={1.6}>
                        The main challenge was creating an interface simple enough for non-technical team members 
                        while designing data flows that allowed experienced sales professionals to access vehicle 
                        information quickly and efficiently.
                    </Text>
                </Box>

                <Box>
                    <Title order={3} size="1.5rem" fw={600} mb="md">
                        Key Features
                    </Title>
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                        <Box>
                            <Text fw={600} mb="xs">Social Network UI</Text>
                            <Text size="sm" c="dimmed">
                                Familiar interface patterns that reduce learning curve for dealership staff
                            </Text>
                        </Box>
                        <Box>
                            <Text fw={600} mb="xs">Quick Information Access</Text>
                            <Text size="sm" c="dimmed">
                                Streamlined data presentation for rapid vehicle information retrieval
                            </Text>
                        </Box>
                        <Box>
                            <Text fw={600} mb="xs">User-Friendly Design</Text>
                            <Text size="sm" c="dimmed">
                                Simplified interface suitable for users with varying technical expertise
                            </Text>
                        </Box>
                        <Box>
                            <Text fw={600} mb="xs">Real-time Updates</Text>
                            <Text size="sm" c="dimmed">
                                Live tracking updates to keep dealerships informed of order status
                            </Text>
                        </Box>
                    </SimpleGrid>
                </Box>

                {/* Video Demo */}
                <Box>
                    <Title order={3} size="1.5rem" fw={600} mb="md">
                        Interactive Demo
                    </Title>
                    <VideoContainer>
                        <ReactPlayer 
                            url="/videos/entry-app.mp4" 
                            playing={true} 
                            loop={true} 
                            width="100%" 
                            height="400px"
                            controls={true}
                        />
                    </VideoContainer>
                </Box>

                {/* Project Impact */}
                <Box>
                    <Title order={3} size="1.5rem" fw={600} mb="md">
                        Project Impact
                    </Title>
                    <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
                        <Box ta="center" p="lg" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                            <Title order={4} size="2rem" fw={700} c="blue">
                                100%
                            </Title>
                            <Text size="sm" c="dimmed">
                                Team Approval
                            </Text>
                        </Box>
                        <Box ta="center" p="lg" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                            <Title order={4} size="2rem" fw={700} c="green">
                                50%
                            </Title>
                            <Text size="sm" c="dimmed">
                                Faster Information Access
                            </Text>
                        </Box>
                        <Box ta="center" p="lg" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                            <Title order={4} size="2rem" fw={700} c="orange">
                                Global
                            </Title>
                            <Text size="sm" c="dimmed">
                                Dealership Rollout
                            </Text>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Stack>
        </Box>
    )
}

export default VTPrototypeContent 