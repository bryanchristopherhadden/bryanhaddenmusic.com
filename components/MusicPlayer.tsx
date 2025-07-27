"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styled from "@emotion/styled";

const PlayerContainer = styled.div`
  background-color: rgba(99, 114, 255, 0.05);
  border-radius: 8px;
  padding: 16px;
  margin-top: 0;
  width: 100%;
  max-width: 500px;
  color: #333;
  justify-self: anchor-center;
`;

const PlayerControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const PlayButton = styled.button`
  background-color: #6372ff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`;

const ControlButton = styled.button`
  background-color: transparent;
  color: #6372ff;
  border: 1px solid #6372ff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(99, 114, 255, 0.1);
  }

  &:focus {
    outline: none;
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: rgba(99, 114, 255, 0.2);
  border-radius: 3px;
  margin: 10px 0;
  cursor: pointer;
  position: relative;
`;

const Progress = styled.div<{ progress?: string }>`
  height: 100%;
  background-color: #6372ff;
  border-radius: 3px;
  width: ${(props) => props.progress || "0%"};
  transition: width 0.2s;
`;

const SongInfo = styled.div`
  margin: 10px;
  text-align: center;
  color: #333;

  h3 {
    margin: 0;
    font-size: 16px;
    color: #6372ff;
  }

  p {
    margin: 4px 0 0;
    font-size: 14px;
    color: #666;
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: #6372ff;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    color: #333;
  }
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const VolumeSlider = styled.input`
  width: 80px;
  height: 4px;
  background: rgba(99, 114, 255, 0.2);
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: #6372ff;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: #6372ff;
    border-radius: 50%;
    cursor: pointer;
    border: none;
  }
`;

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
    <PlayerContainer>
      <CloseButton onClick={onClose}>✕</CloseButton>
      
      <SongInfo>
        <h3>{songs[currentSongIndex]?.title || "Loading..."}</h3>
        <p>{songs[currentSongIndex]?.artist || "Bryan Hadden"}</p>
      </SongInfo>

      <PlayerControls>
        <ControlButton onClick={playPrevious} title="Previous">
          ⏮
        </ControlButton>
        
        <PlayButton onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? "⏸" : "▶"}
        </PlayButton>
        
        <ControlButton onClick={playNext} title="Next">
          ⏭
        </ControlButton>
      </PlayerControls>

      <ProgressContainer onClick={setProgressFromClick}>
        <Progress progress={`${progress}%`} />
      </ProgressContainer>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
        <ControlButton 
          onClick={toggleShuffle} 
          style={{ backgroundColor: shuffle ? 'rgba(99, 114, 255, 0.1)' : 'transparent' }}
          title="Shuffle"
        >
          🔀
        </ControlButton>
        
        <ControlButton 
          onClick={() => setRepeat(!repeat)} 
          style={{ backgroundColor: repeat ? 'rgba(99, 114, 255, 0.1)' : 'transparent' }}
          title="Repeat"
        >
          🔁
        </ControlButton>
      </div>

      <VolumeControl>
        <span style={{ fontSize: '12px' }}>🔊</span>
        <VolumeSlider
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </VolumeControl>

      <audio ref={audioRef} preload="metadata" />
    </PlayerContainer>
  );
}; 