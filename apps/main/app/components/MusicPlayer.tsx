"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Paper, Group, ActionIcon, Text, Slider, Stack, Center, Box, CloseButton, Title, Badge, ScrollArea, Pagination, Divider } from '@mantine/core';
import { IconPlayerPlay, IconPlayerPause, IconPlayerSkipForward, IconPlayerSkipBack, IconVolume, IconFilter } from '@tabler/icons-react';

interface Song {
  id: number;
  title: string;
  artist: string;
  filename: string;
  src: string;
  genre?: string;
  year?: string;
  album?: string;
  forsale?: boolean;
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
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage] = useState(4);
  const [actualPlayingSongIndex, setActualPlayingSongIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Filter functions
  const getAvailableGenres = useCallback(() => {
    const genres = ['All', ...new Set(allSongs.map(song => song.genre).filter(Boolean))];
    return genres;
  }, [allSongs]);

  const filterSongs = useCallback((filter: string) => {
    if (filter === 'All') {
      return allSongs;
    }
    return allSongs.filter(song => song.genre === filter);
  }, [allSongs]);

  const applyFilter = (filter: string) => {
    setActiveFilter(filter);
    const filteredSongs = filterSongs(filter);
    setSongs(filteredSongs);
    setCurrentPage(1); // Reset to first page when filtering
    
    // Find the currently playing song in the filtered list
    const currentPlayingSong = allSongs[actualPlayingSongIndex];
    const newCurrentIndex = filteredSongs.findIndex(song => song.id === currentPlayingSong?.id);
    
    // Update currentSongIndex if the current song is in the filtered list
    if (newCurrentIndex !== -1) {
      setCurrentSongIndex(newCurrentIndex);
    } else {
      // If current song is not in filtered list, set index to -1 to indicate no match
      setCurrentSongIndex(-1);
    }
  };

  // Pagination helpers
  const totalPages = Math.ceil(songs.length / songsPerPage);
  const startIndex = (currentPage - 1) * songsPerPage;
  const endIndex = startIndex + songsPerPage;
  const currentPageSongs = songs.slice(startIndex, endIndex);

  const playSongFromList = (songIndex: number) => {
    setCurrentSongIndex(songIndex);
    
    // Find the actual index in allSongs array
    const selectedSong = songs[songIndex];
    const actualIndex = allSongs.findIndex(song => song.id === selectedSong.id);
    setActualPlayingSongIndex(actualIndex);
    
    setProgress(0);
    setCurrentTime(0);
    
    if (audioRef.current) {
      audioRef.current.src = songs[songIndex].src;
      audioRef.current.play();
      setIsPlaying(true);
      onPlayingChange(true);
    }
  };

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
    
    // Find the actual index in allSongs array
    const nextSong = songs[nextIndex];
    const actualIndex = allSongs.findIndex(song => song.id === nextSong.id);
    setActualPlayingSongIndex(actualIndex);
    
    setProgress(0);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.src = songs[nextIndex].src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex, songs, shuffle, isPlaying, allSongs]);

  const playPrevious = useCallback(() => {
    if (songs.length === 0) return;

    let prevIndex;
    if (shuffle) {
      prevIndex = Math.floor(Math.random() * songs.length);
    } else {
      prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    }

    setCurrentSongIndex(prevIndex);
    
    // Find the actual index in allSongs array
    const prevSong = songs[prevIndex];
    const actualIndex = allSongs.findIndex(song => song.id === prevSong.id);
    setActualPlayingSongIndex(actualIndex);
    
    setProgress(0);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.src = songs[prevIndex].src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex, songs, shuffle, isPlaying, allSongs]);

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
          const processedSongs = songsData
            .filter((song: any) => song.active)
            .map((song: any, index: number) => ({
              id: index + 1,
              title: song.title,
              artist: song.artist,
              filename: song.filename,
              src: `${process.env.PUBLIC_URL || ""}/songs/${song.filename}`,
              genre: song.genre,
              year: song.year,
              album: song.album,
              forsale: song.forsale,
            }));

          setAllSongs(processedSongs);
          setSongs(processedSongs);
          setActualPlayingSongIndex(0); // Initialize to first song

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
          genre: "RnB",
          year: "2024",
        },
        {
          id: 2,
          title: "Bantu Bliss",
          artist: "Bryan Hadden",
          filename: "Bantu Bliss.mp3",
          src: `${process.env.PUBLIC_URL || ""}/songs/Bantu Bliss.mp3`,
          genre: "Afrobeat",
          year: "2024",
        },
        {
          id: 3,
          title: "Just Crush",
          artist: "Bryan Hadden",
          filename: "Just Crush.mp3",
          src: `${process.env.PUBLIC_URL || ""}/songs/Just Crush.mp3`,
          genre: "Hip-Hop",
          year: "2024",
        },
      ];

      setAllSongs(fallbackSongs);
      setSongs(fallbackSongs);
      setActualPlayingSongIndex(0); // Initialize to first song
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
      radius="xl"
      p="xl"
      data-player="true"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        position: 'relative',
        boxShadow: '0 20px 48px rgba(0, 0, 0, 0.3), 0 8px 16px rgba(0, 0, 0, 0.2)',
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
              {allSongs[actualPlayingSongIndex]?.title || "Loading..."}
            </Title>
            <Text c="rgba(255, 255, 255, 0.7)" size="sm" mb={4}>
              {allSongs[actualPlayingSongIndex]?.artist || "Bryan Hadden"}
            </Text>
            {/* {allSongs[actualPlayingSongIndex]?.genre && (
              <Badge 
                variant="light" 
                size="sm"
                style={{
                  background: 'rgba(102, 126, 234, 0.2)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(102, 126, 234, 0.3)'
                }}
              >
                {allSongs[actualPlayingSongIndex]?.genre}
              </Badge>
            )} */}
          </Box>
        </Center>

        {/* Filters */}
        <Box>
          <Group justify="space-between" align="center" mb="sm">
            <Text size="sm" c="rgba(255, 255, 255, 0.8)" fw={500}>
              Filter by Genre
            </Text>
            <ActionIcon
              variant="subtle"
              size="sm"
              c="rgba(255, 255, 255, 0.7)"
              onClick={() => setShowFilters(!showFilters)}
            >
              <IconFilter size={16} />
            </ActionIcon>
          </Group>
          
          {showFilters && (
            <ScrollArea>
              <Group gap="xs" mb="md">
                {getAvailableGenres().map((genre) => (
                  <Badge
                    key={genre}
                    variant={activeFilter === genre ? "filled" : "outline"}
                    size="md"
                    style={{
                      cursor: 'pointer',
                      background: activeFilter === genre 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'rgba(255, 255, 255, 0.1)',
                      color: activeFilter === genre 
                        ? 'white' 
                        : 'rgba(255, 255, 255, 0.8)',
                      border: activeFilter === genre 
                        ? 'none'
                        : '1px solid rgba(255, 255, 255, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => applyFilter(genre)}
                  >
                    {genre}
                  </Badge>
                ))}
              </Group>
            </ScrollArea>
          )}
          
          <Text size="xs" c="rgba(255, 255, 255, 0.5)" ta="center">
            {songs.length} song{songs.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `in ${activeFilter}` : 'available'}
            {activeFilter !== 'All' && currentSongIndex === -1 && (
              <Text size="xs" c="rgba(255, 255, 100, 0.8)" mt={2}>
                • Currently playing song not in filtered list
              </Text>
            )}
          </Text>
        </Box>

        {/* Controls */}
        <Group justify="center" gap="lg">
          <ActionIcon
            variant="outline"
            size="lg"
            c="white"
            onClick={playPrevious}
            title="Previous"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            <IconPlayerSkipBack size={20} />
          </ActionIcon>

          <ActionIcon
            variant="filled"
            size="xl"
            onClick={togglePlay}
            title={isPlaying ? "Pause" : "Play"}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease'
            }}
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
            c="white"
            onClick={playNext}
            title="Next"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease'
            }}
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
            style={{ 
              cursor: 'pointer',
              '--slider-color': '#667eea',
              '--slider-track-color': 'rgba(255, 255, 255, 0.2)'
            }}
          />
          
          <Group justify="space-between" mt={4}>
            <Text size="xs" c="rgba(255, 255, 255, 0.6)">
              {formatTime(currentTime)}
            </Text>
            <Text size="xs" c="rgba(255, 255, 255, 0.6)">
              {formatTime(duration)}
            </Text>
          </Group>
        </Box>

        {/* Volume Control */}
        <Group gap="sm" justify="center">
          <IconVolume size={16} color="rgba(255, 255, 255, 0.6)" />
          <Slider
            value={volume}
            onChange={setVolume}
            min={0}
            max={1}
            step={0.1}
            size="sm"
            style={{ 
              width: 80,
              '--slider-color': '#667eea',
              '--slider-track-color': 'rgba(255, 255, 255, 0.2)'
            }}
          />
        </Group>

        {/* Song List */}
        {songs.length > 0 && (
          <>
            <Divider 
              label="Track List" 
              labelPosition="center" 
              my="lg"
              styles={{
                label: { 
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                },
                root: { borderColor: 'rgba(255, 255, 255, 0.2)' }
              }}
            />
            
            <Stack gap="xs">
              {currentPageSongs.map((song, index) => {
                const actualIndex = startIndex + index;
                const isCurrentSong = actualIndex === currentSongIndex;
                
                return (
                  <Box
                    key={song.id}
                    p="sm"
                    style={{
                      background: isCurrentSong 
                        ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))'
                        : 'rgba(255, 255, 255, 0.05)',
                      border: isCurrentSong 
                        ? '1px solid rgba(102, 126, 234, 0.5)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => playSongFromList(actualIndex)}
                  >
                    <Group justify="space-between" align="center">
                      <Group gap="sm" align="center">
                        <ActionIcon
                          size="sm"
                          variant="subtle"
                          c={isCurrentSong ? "white" : "rgba(255, 255, 255, 0.7)"}
                        >
                          {isCurrentSong && isPlaying ? (
                            <IconPlayerPause size={14} />
                          ) : (
                            <IconPlayerPlay size={14} />
                          )}
                        </ActionIcon>
                        
                        <Box>
                          <Text 
                            size="sm" 
                            fw={isCurrentSong ? 600 : 500}
                            c={isCurrentSong ? "white" : "rgba(255, 255, 255, 0.9)"}
                            lineClamp={1}
                          >
                            {song.title}
                          </Text>
                          <Text 
                            size="xs" 
                            c={isCurrentSong ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.6)"}
                            lineClamp={1}
                          >
                            {song.artist}
                          </Text>
                        </Box>
                      </Group>
                      
                      <Group gap="xs">
                        {song.genre && (
                          <Badge 
                            size="xs"
                            variant="outline"
                            style={{
                              color: isCurrentSong ? "white" : "rgba(255, 255, 255, 0.7)",
                              borderColor: isCurrentSong ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.3)",
                              fontSize: '0.65rem'
                            }}
                          >
                            {song.genre}
                          </Badge>
                        )}
                        {song.year && (
                          <Text 
                            size="xs" 
                            c={isCurrentSong ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.5)"}
                          >
                            {song.year}
                          </Text>
                        )}
                      </Group>
                    </Group>
                  </Box>
                );
              })}
            </Stack>

            {/* Pagination */}
            {totalPages > 1 && (
              <Center mt="md">
                <Pagination
                  value={currentPage}
                  onChange={setCurrentPage}
                  total={totalPages}
                  size="sm"
                  styles={{
                    control: {
                      color: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '&[data-active]': {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderColor: 'transparent',
                        color: 'white'
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)'
                      }
                    }
                  }}
                />
              </Center>
            )}
          </>
        )}
      </Stack>

      <audio ref={audioRef} preload="metadata" />
    </Paper>
  );
};

export default MusicPlayer; 