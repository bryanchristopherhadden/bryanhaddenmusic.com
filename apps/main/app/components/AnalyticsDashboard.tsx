"use client";

import { useState, useEffect } from 'react';
import { Modal, Button, Stack, Text, Paper, Group, Badge, ScrollArea, ActionIcon, Box } from '@mantine/core';
import { IconChartBar, IconDownload, IconTrash, IconRefresh } from '@tabler/icons-react';
import { musicAnalytics } from '../lib/analytics';

interface AnalyticsDashboardProps {
  opened: boolean;
  onClose: () => void;
}

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: number;
  sessionId?: string;
  sessionDuration?: number;
  pageDuration?: number;
}

export default function AnalyticsDashboard({ opened, onClose }: AnalyticsDashboardProps) {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    uniqueSessions: 0,
    pageViews: 0,
    cartAdds: 0,
    checkouts: 0,
    previews: 0,
    searches: 0
  });

  const loadAnalyticsData = () => {
    try {
      const storedEvents = JSON.parse(localStorage.getItem('music_analytics') || '[]');
      setEvents(storedEvents);
      
      // Calculate stats
      const uniqueSessions = new Set(storedEvents.map((e: AnalyticsEvent) => e.sessionId)).size;
      const pageViews = storedEvents.filter((e: AnalyticsEvent) => e.event === 'page_view').length;
      const cartAdds = storedEvents.filter((e: AnalyticsEvent) => e.event === 'add_to_cart').length;
      const checkouts = storedEvents.filter((e: AnalyticsEvent) => e.event === 'checkout_step').length;
      const previews = storedEvents.filter((e: AnalyticsEvent) => e.event === 'beat_preview_started').length;
      const searches = storedEvents.filter((e: AnalyticsEvent) => e.event === 'search').length;
      
      setStats({
        totalEvents: storedEvents.length,
        uniqueSessions,
        pageViews,
        cartAdds,
        checkouts,
        previews,
        searches
      });
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    }
  };

  useEffect(() => {
    if (opened) {
      loadAnalyticsData();
    }
  }, [opened]);

  const exportData = () => {
    const dataStr = musicAnalytics.exportAnalyticsData();
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `music-analytics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearData = () => {
    if (confirm('Are you sure you want to clear all analytics data?')) {
      musicAnalytics.clearAnalyticsData();
      loadAnalyticsData();
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getEventColor = (event: string) => {
    switch (event) {
      case 'page_view': return 'blue';
      case 'add_to_cart': return 'green';
      case 'remove_from_cart': return 'red';
      case 'checkout_step': return 'purple';
      case 'beat_preview_started': return 'orange';
      case 'search': return 'cyan';
      case 'filter': return 'teal';
      case 'help_opened': return 'yellow';
      case 'contact_clicked': return 'pink';
      default: return 'gray';
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Music Page Analytics Dashboard"
      size="xl"
      styles={{
        content: {
          backgroundColor: 'rgba(20, 20, 20, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        header: {
          backgroundColor: 'transparent',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
        title: {
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 700,
        },
        close: {
          color: 'white',
        }
      }}
    >
      <Stack gap="lg">
        {/* Stats Overview */}
        <Paper
          p="md"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
          }}
        >
          <Text fw={600} c="white" mb="md" size="lg">
            📊 Overview
          </Text>
          <Group gap="lg">
            <Box ta="center">
              <Text size="xl" fw={700} c="white">{stats.totalEvents}</Text>
              <Text size="sm" c="rgba(255, 255, 255, 0.7)">Total Events</Text>
            </Box>
            <Box ta="center">
              <Text size="xl" fw={700} c="white">{stats.uniqueSessions}</Text>
              <Text size="sm" c="rgba(255, 255, 255, 0.7)">Sessions</Text>
            </Box>
            <Box ta="center">
              <Text size="xl" fw={700} c="white">{stats.pageViews}</Text>
              <Text size="sm" c="rgba(255, 255, 255, 0.7)">Page Views</Text>
            </Box>
            <Box ta="center">
              <Text size="xl" fw={700} c="white">{stats.cartAdds}</Text>
              <Text size="sm" c="rgba(255, 255, 255, 0.7)">Cart Adds</Text>
            </Box>
            <Box ta="center">
              <Text size="xl" fw={700} c="white">{stats.checkouts}</Text>
              <Text size="sm" c="rgba(255, 255, 255, 0.7)">Checkouts</Text>
            </Box>
            <Box ta="center">
              <Text size="xl" fw={700} c="white">{stats.previews}</Text>
              <Text size="sm" c="rgba(255, 255, 255, 0.7)">Previews</Text>
            </Box>
          </Group>
        </Paper>

        {/* Action Buttons */}
        <Group>
          <Button
            leftSection={<IconRefresh size={16} />}
            onClick={loadAnalyticsData}
            variant="outline"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: 'white',
            }}
          >
            Refresh
          </Button>
          <Button
            leftSection={<IconDownload size={16} />}
            onClick={exportData}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
            }}
          >
            Export Data
          </Button>
          <Button
            leftSection={<IconTrash size={16} />}
            onClick={clearData}
            color="red"
            variant="outline"
          >
            Clear Data
          </Button>
        </Group>

        {/* Recent Events */}
        <Paper
          p="md"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
          }}
        >
          <Text fw={600} c="white" mb="md" size="lg">
            🔍 Recent Events
          </Text>
          <ScrollArea h={400}>
            <Stack gap="sm">
              {events.slice(-20).reverse().map((event, index) => (
                <Paper
                  key={index}
                  p="sm"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                  }}
                >
                  <Group justify="space-between" align="flex-start">
                    <Box style={{ flex: 1 }}>
                      <Group gap="sm" mb="xs">
                        <Badge color={getEventColor(event.event)} size="sm">
                          {event.event.replace(/_/g, ' ')}
                        </Badge>
                        <Text size="xs" c="rgba(255, 255, 255, 0.6)">
                          {formatTimestamp(event.timestamp || 0)}
                        </Text>
                      </Group>
                      {event.properties && Object.keys(event.properties).length > 0 && (
                        <Text size="sm" c="rgba(255, 255, 255, 0.8)">
                          {Object.entries(event.properties)
                            .filter(([key]) => !['timestamp', 'sessionId', 'sessionDuration', 'pageDuration'].includes(key))
                            .map(([key, value]) => `${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`)
                            .join(', ')}
                        </Text>
                      )}
                    </Box>
                  </Group>
                </Paper>
              ))}
              {events.length === 0 && (
                <Text ta="center" c="rgba(255, 255, 255, 0.6)" py="xl">
                  No analytics data yet. Start using the music page to see events here.
                </Text>
              )}
            </Stack>
          </ScrollArea>
        </Paper>
      </Stack>
    </Modal>
  );
}
