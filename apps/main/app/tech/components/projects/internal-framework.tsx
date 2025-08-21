import React from 'react';
import { Container, Title, Text, Box, Stack, Button, Group, Badge, SimpleGrid } from '@mantine/core'
import { IconArrowLeft, IconCode, IconTools, IconRocket } from '@tabler/icons-react'
import styled from 'styled-components'

const ProjectHeader = styled(Box)`
  padding: 60px 0;
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
  margin: -40px -40px 40px -40px;
  border-radius: 12px;
`

const FeatureBox = styled(Box)`
  padding: 24px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #ff9800;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`

interface InternalFrameworkProps {
    onGoBack?: () => void;
}

const InternalFramework: React.FC<InternalFrameworkProps> = ({ onGoBack }) => {
    const techStack = ['JavaScript', 'React', 'Angular', 'PHP', 'Google Cloud', 'Sketch', 'Photoshop', 'InVision']

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
                        <Badge variant="light" color="orange" size="lg">
                            Enterprise Scale
                        </Badge>
                        <Title order={1} size="2.5rem" fw={600}>
                            Internal Framework
                        </Title>
                        <Text size="xl" c="dimmed" ta="center" maw={800}>
                            An enterprise-scale internal framework supporting 800+ engineers and 200+ designers 
                            across multiple departments and projects at Home Depot.
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
                        Project Scale & Impact
                    </Title>
                    <Text size="lg" lh={1.6}>
                        I maintained and evolved an internal framework that became the backbone of development 
                        operations across Home Depot's engineering organization. This system served hundreds 
                        of engineers and designers, enabling consistent, scalable development practices across 
                        multiple departments including payments, orders, and customer experience.
                    </Text>
                </Box>

                <Box>
                    <Title order={3} size="1.5rem" fw={600} mb="md">
                        Process & Methodology
                    </Title>
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                        <FeatureBox>
                            <Stack gap="sm">
                                <Title order={4} size="1.1rem" fw={600}>
                                    1. Requirements & UX Research
                                </Title>
                                <Text size="sm" c="dimmed">
                                    Conducted pain point analysis, user testing, and script writing to understand 
                                    departmental needs before development.
                                </Text>
                            </Stack>
                        </FeatureBox>
                        
                        <FeatureBox>
                            <Stack gap="sm">
                                <Title order={4} size="1.1rem" fw={600}>
                                    2. Leadership Alignment
                                </Title>
                                <Text size="sm" c="dimmed">
                                    Presented research findings and proposed solutions to senior management 
                                    and business partners for approval and prioritization.
                                </Text>
                            </Stack>
                        </FeatureBox>
                        
                        <FeatureBox>
                            <Stack gap="sm">
                                <Title order={4} size="1.1rem" fw={600}>
                                    3. Multi-Framework Development
                                </Title>
                                <Text size="sm" c="dimmed">
                                    Built components in vanilla JavaScript, then created React and Angular 
                                    wrappers to support diverse technology stacks.
                                </Text>
                            </Stack>
                        </FeatureBox>
                        
                        <FeatureBox>
                            <Stack gap="sm">
                                <Title order={4} size="1.1rem" fw={600}>
                                    4. Pipeline Integration
                                </Title>
                                <Text size="sm" c="dimmed">
                                    Deployed components to internal pipeline enabling teams to select 
                                    and integrate needed functionality à la carte.
                                </Text>
                            </Stack>
                        </FeatureBox>
                    </SimpleGrid>
                </Box>

                {/* Key Responsibilities */}
                <Box>
                    <Title order={3} size="1.5rem" fw={600} mb="md">
                        Key Responsibilities
                    </Title>
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                        <Box>
                            <Text fw={600} mb="xs">Request Management</Text>
                            <Text size="sm" c="dimmed">
                                Triaged and prioritized component requests from various departments
                            </Text>
                        </Box>
                        <Box>
                            <Text fw={600} mb="xs">Stakeholder Collaboration</Text>
                            <Text size="sm" c="dimmed">
                                Worked closely with senior management and business partners
                            </Text>
                        </Box>
                        <Box>
                            <Text fw={600} mb="xs">Multi-Framework Support</Text>
                            <Text size="sm" c="dimmed">
                                Maintained compatibility across JavaScript, React, and Angular ecosystems
                            </Text>
                        </Box>
                        <Box>
                            <Text fw={600} mb="xs">Quality Assurance</Text>
                            <Text size="sm" c="dimmed">
                                Ensured enterprise-grade reliability and performance standards
                            </Text>
                        </Box>
                    </SimpleGrid>
                </Box>

                {/* Impact Metrics */}
                <Box>
                    <Title order={3} size="1.5rem" fw={600} mb="md">
                        Enterprise Impact
                    </Title>
                    <SimpleGrid cols={{ base: 1, md: 4 }} spacing="lg">
                        <Box ta="center" p="lg" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                            <Title order={4} size="2rem" fw={700} c="orange">
                                800+
                            </Title>
                            <Text size="sm" c="dimmed">
                                Engineers Supported
                            </Text>
                        </Box>
                        <Box ta="center" p="lg" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                            <Title order={4} size="2rem" fw={700} c="blue">
                                200+
                            </Title>
                            <Text size="sm" c="dimmed">
                                Designers Supported
                            </Text>
                        </Box>
                        <Box ta="center" p="lg" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                            <Title order={4} size="2rem" fw={700} c="green">
                                15+
                            </Title>
                            <Text size="sm" c="dimmed">
                                Departments Served
                            </Text>
                        </Box>
                        <Box ta="center" p="lg" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                            <Title order={4} size="2rem" fw={700} c="purple">
                                100%
                            </Title>
                            <Text size="sm" c="dimmed">
                                Framework Adoption
                            </Text>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Stack>
        </Box>
    )
}

export default InternalFramework