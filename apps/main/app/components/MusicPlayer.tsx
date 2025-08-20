"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Paper, Group, ActionIcon, Text, Slider, Stack, Center, Box, CloseButton, Title } from '@mantine/core';
import { IconPlayerPlay, IconPlayerPause, IconPlayerSkipForward, IconPlayerSkipBack, IconVolume } from '@tabler/icons-react';



interface Song {
  id: number;
  title: string;
  artist: string;
  filename: string;
  src: string;
}

interface MusicPlayerProps {
  visible: boolean;
  onClose: () => void;
  onPlayingChange: (playing: boolean) => void;
}

export const MusicPlayer = ({ visible, onClose, onPlayingChange }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songs, setSongs] = useState<Song[]>([]);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      onPlayingChange(!isPlaying);
    }
  };

  const playNext = useCallback(() => {
    if (songs.length === 0) return;

    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      nextIndex = (currentSongIndex + 1) % songs.length;
    }

    setCurrentSongIndex(nextIndex);
    setProgress(0);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.src = songs[nextIndex].src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex, songs, shuffle, isPlaying]);

  const playPrevious = useCallback(() => {
    if (songs.length === 0) return;

    let prevIndex;
    if (shuffle) {
      prevIndex = Math.floor(Math.random() * songs.length);
    } else {
      prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    }

    setCurrentSongIndex(prevIndex);
    setProgress(0);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.src = songs[prevIndex].src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex, songs, shuffle, isPlaying]);

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  const setProgressFromClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercent = (clickX / width) * 100;

    const newTime = (clickPercent / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(clickPercent);
    setCurrentTime(newTime);
  };

  useEffect(() => {
    const loadSongs = async () => {
      try {
        // Load songs from the songs.json file
        const jsonPath = `${process.env.PUBLIC_URL || ""}/songs.json`;
        const response = await fetch(jsonPath);

        if (response.ok) {
          const songsData = await response.json();
          const processedSongs = songsData.map((song: any, index: number) => ({
            id: index + 1,
            title: song.title,
            artist: song.artist,
            filename: song.filename,
            src: `${process.env.PUBLIC_URL || ""}/songs/${song.filename}`,
          }));

          setSongs(processedSongs);

          if (processedSongs.length > 0 && audioRef.current) {
            audioRef.current.src = processedSongs[0].src;
          }
        } else {
          console.log("Failed to load songs.json, using fallback");
          loadFallbackSongs();
        }
      } catch (error) {
        console.log("Error loading songs.json, using fallback");
        loadFallbackSongs();
      }
    };

    const loadFallbackSongs = () => {
      const fallbackSongs: Song[] = [
        {
          id: 1,
          title: "Sapiosexual",
          artist: "Bryan Hadden",
          filename: "Sapiosexual.mp3",
          src: `${process.env.PUBLIC_URL || ""}/songs/Sapiosexual.mp3`,
        },
        {
          id: 2,
          title: "Bantu Bliss",
          artist: "Bryan Hadden",
          filename: "Bantu Bliss.mp3",
          src: `${process.env.PUBLIC_URL || ""}/songs/Bantu Bliss.mp3`,
        },
        {
          id: 3,
          title: "Just Crush",
          artist: "Bryan Hadden",
          filename: "Just Crush.mp3",
          src: `${process.env.PUBLIC_URL || ""}/songs/Just Crush.mp3`,
        },
      ];

      setSongs(fallbackSongs);
      if (audioRef.current) {
        audioRef.current.src = fallbackSongs[0].src;
      }
    };

    loadSongs();
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current && !audioRef.current.paused) {
        const progressPercent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(progressPercent);
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const interval = setInterval(updateProgress, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };

    const songEnded = () => {
      if (repeat) {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
      } else {
        playNext();
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', loadedMetadata);
      audioRef.current.addEventListener('ended', songEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', loadedMetadata);
        audioRef.current.removeEventListener('ended', songEnded);
      }
    };
  }, [repeat, playNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!visible) return null;

  return (
    <Paper
      shadow="xl"
      radius="md"
      p="xl"
      style={{
        background: 'linear-gradient(135deg, rgba(99, 114, 255, 0.1), rgba(99, 114, 255, 0.05))',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(99, 114, 255, 0.2)',
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <CloseButton
        onClick={onClose}
        size="lg"
        style={{ position: 'absolute', top: 16, right: 16 }}
      />

      <Stack gap="md" mt="md">
        {/* Song Info */}
        <Center>
          <Box ta="center">
            <Title order={3} c="white" mb={4}>
              {songs[currentSongIndex]?.title || "Loading..."}
            </Title>
            <Text c="dimmed" size="sm">
              {songs[currentSongIndex]?.artist || "Bryan Hadden"}
            </Text>
          </Box>
        </Center>

        {/* Controls */}
        <Group justify="center" gap="lg">
          <ActionIcon
            variant="outline"
            size="lg"
            color="blue"
            onClick={playPrevious}
            title="Previous"
          >
            <IconPlayerSkipBack size={20} />
          </ActionIcon>

          <ActionIcon
            variant="filled"
            size="xl"
            color="blue"
            onClick={togglePlay}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <IconPlayerPause size={24} />
            ) : (
              <IconPlayerPlay size={24} />
            )}
          </ActionIcon>

          <ActionIcon
            variant="outline"
            size="lg"
            color="blue"
            onClick={playNext}
            title="Next"
          >
            <IconPlayerSkipForward size={20} />
          </ActionIcon>
        </Group>

        {/* Progress Bar */}
        <Box>
          <Slider
            value={progress}
            onChange={(value) => {
              if (audioRef.current) {
                const newTime = (value / 100) * audioRef.current.duration;
                audioRef.current.currentTime = newTime;
                setProgress(value);
                setCurrentTime(newTime);
              }
            }}
            size="sm"
            color="blue"
            style={{ cursor: 'pointer' }}
          />
          
          <Group justify="space-between" mt={4}>
            <Text size="xs" c="dimmed">
              {formatTime(currentTime)}
            </Text>
            <Text size="xs" c="dimmed">
              {formatTime(duration)}
            </Text>
          </Group>
        </Box>

        {/* Volume Control */}
        <Group gap="sm" justify="center">
          <IconVolume size={16} color="gray" />
          <Slider
            value={volume}
            onChange={setVolume}
            min={0}
            max={1}
            step={0.1}
            size="sm"
            color="blue"
            style={{ width: 80 }}
          />
        </Group>
      </Stack>

      <audio ref={audioRef} preload="metadata" />
    </Paper>
  );
};

export default MusicPlayer; 