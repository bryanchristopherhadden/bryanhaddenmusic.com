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

const Progress = styled.div`
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

  .album-info {
    margin: 2px 0 0;
    font-size: 12px;
    color: #777;
  }

  .genre {
    display: inline-block;
    margin: 12px 0 4px;
    font-size: 11px;
    color: white;
    background-color: #6372ff;
    padding: 2px 8px;
    border-radius: 10px;
  }
`;

const TimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

const NoSongsMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

export const MusicPlayer = ({ visible, onClose, onPlayingChange }) => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [shuffle, setShuffle] = useState(false);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Play failed:", error);
      });
    }

    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);
    onPlayingChange?.(newPlayingState);
  };

  // Play the next song
  const playNextSong = useCallback(() => {
    if (songs.length === 0) return;

    let nextIndex;

    if (shuffle) {
      // Get random index that's different from current
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * songs.length);
      } while (songs.length > 1 && randomIndex === currentSongIndex);

      nextIndex = randomIndex;
    } else {
      nextIndex = (currentSongIndex + 1) % songs.length;
    }

    setCurrentSongIndex(nextIndex);

    // Reset progress
    setProgress(0);

    // Play the new song after a small delay
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error("Play failed:", error);
          setIsPlaying(false);
          onPlayingChange?.(false);
        });
        setIsPlaying(true);
        onPlayingChange?.(true);
      }
    }, 100);
  }, [songs.length, shuffle, currentSongIndex, onPlayingChange]);

  // Play the previous song
  const playPrevSong = useCallback(() => {
    if (songs.length === 0) return;

    let prevIndex;

    if (shuffle) {
      // Get random index that's different from current
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * songs.length);
      } while (songs.length > 1 && randomIndex === currentSongIndex);

      prevIndex = randomIndex;
    } else {
      prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    }

    setCurrentSongIndex(prevIndex);

    // Reset progress
    setProgress(0);

    // Play the new song after a small delay
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error("Play failed:", error);
          setIsPlaying(false);
          onPlayingChange?.(false);
        });
        setIsPlaying(true);
        onPlayingChange?.(true);
      }
    }, 100);
  }, [songs.length, shuffle, currentSongIndex, onPlayingChange]);

  // Toggle shuffle mode
  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  // Set progress when user clicks on progress bar
  const setProgressFromClick = (e) => {
    if (!audioRef.current || !progressRef.current) return;

    const width = progressRef.current.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audioRef.current.duration;

    audioRef.current.currentTime = (clickX / width) * duration;
  };

  // Load songs from the songs.json file
  useEffect(() => {
    const loadSongs = async () => {
      try {
        // Use PUBLIC_URL for reliable path resolution in Create React App
        const jsonPath = `${process.env.PUBLIC_URL || ""}/songs.json`;
        console.log("Fetching songs from:", jsonPath);

        const response = await fetch(jsonPath);

        if (!response.ok) {
          throw new Error(
            `Failed to load songs: ${response.status} ${response.statusText}`
          );
        }

        const songsMetadata = await response.json();
        console.log("Songs metadata loaded successfully");

        // Filter inactive songs and map the metadata to include the full source path
        const songsWithPaths = songsMetadata
          .filter((song) => song.active !== false) // Keep songs where active is true or undefined
          .map((song) => ({
            ...song,
            src: `${process.env.PUBLIC_URL || ""}/songs/${song.filename}`,
          }));

        if (songsWithPaths.length === 0) {
          console.log("No active songs found in songs.json, using fallback");
          // Use hardcoded fallback if no active songs
          loadFallbackSongs();
          return;
        }

        console.log(`Loaded ${songsWithPaths.length} active songs`);
        setSongs(songsWithPaths);
      } catch (error) {
        console.error("Error loading songs:", error);
        // Use fallback if there's an error
        loadFallbackSongs();
      }
    };

    // Fallback function to use hardcoded songs
    const loadFallbackSongs = () => {
      console.log("Using hardcoded fallback songs");
      const hardcodedSongs = [
        {
          id: "sapiosexual",
          title: "Sapiosexual",
          artist: "Bryan Hadden",
          album: "Bryan Hadden Music",
          year: "2025",
          genre: "Electronic",
          filename: "Sapiosexual.mp3",
          active: true,
          src: `${process.env.PUBLIC_URL || ""}/songs/Sapiosexual.mp3`,
        },
      ];
      setSongs(hardcodedSongs);
    };

    loadSongs();
  }, []);

  // Auto-play when visible
  useEffect(() => {
    if (visible && songs.length > 0 && audioRef.current) {
      // Small delay to ensure components are fully rendered
      const playTimer = setTimeout(() => {
        audioRef.current.play().catch((error) => {
          console.error("Auto-play failed:", error);
          // Many browsers require user interaction before auto-play
          setIsPlaying(false);
          onPlayingChange?.(false);
        });
        setIsPlaying(true);
        onPlayingChange?.(true);
      }, 300);

      return () => clearTimeout(playTimer);
    }
  }, [visible, songs]);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        setProgress(progressPercent);

        // Update current time display
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60)
          .toString()
          .padStart(2, "0");
        setCurrentTime(`${minutes}:${seconds}`);
      }
    };

    const loadedMetadata = () => {
      // Update duration display
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60)
        .toString()
        .padStart(2, "0");
      setDuration(`${minutes}:${seconds}`);
    };

    const songEnded = () => {
      playNextSong();
    };

    // Add event listeners
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", loadedMetadata);
    audio.addEventListener("ended", songEnded);

    // Clean up
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", loadedMetadata);
      audio.removeEventListener("ended", songEnded);
    };
  }, [playNextSong]);

  // Render an empty component if there are no songs
  if (songs.length === 0) {
    return (
      <PlayerContainer>
        <NoSongsMessage>
          <p>No songs found in the library.</p>
          <p>Please add MP3 files to the /public/songs/ directory.</p>
        </NoSongsMessage>
      </PlayerContainer>
    );
  }

  // Get current song
  const currentSong = songs[currentSongIndex] || {
    title: "No Song",
    artist: "Unknown",
  };

  return (
    <PlayerContainer>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentSong.src}
        preload="metadata"
        style={{ display: "none" }}
      />

      {/* Song information */}
      <SongInfo>
        <h3>{currentSong.title}</h3>
        <p>{currentSong.artist}</p>
        {currentSong.album && (
          <p className="album-info">
            {currentSong.album}{" "}
            {currentSong.year ? `• ${currentSong.year}` : ""}
          </p>
        )}
        {currentSong.genre && (
          <span className="genre">{currentSong.genre}</span>
        )}
      </SongInfo>

      {/* Progress bar */}
      <ProgressContainer ref={progressRef} onClick={setProgressFromClick}>
        <Progress progress={`${progress}%`} />
      </ProgressContainer>

      {/* Time display */}
      <TimeDisplay>
        <span>{currentTime}</span>
        <span>{duration}</span>
      </TimeDisplay>

      {/* Controls */}
      <PlayerControls>
        <ControlButton
          onClick={toggleShuffle}
          style={{
            color: shuffle ? "#fff" : "#6372FF",
            backgroundColor: shuffle ? "#6372FF" : "transparent",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="16 3 21 3 21 8"></polyline>
            <line x1="4" y1="20" x2="21" y2="3"></line>
            <polyline points="21 16 21 21 16 21"></polyline>
            <line x1="15" y1="15" x2="21" y2="21"></line>
            <line x1="4" y1="4" x2="9" y2="9"></line>
          </svg>
        </ControlButton>
        <ControlButton onClick={playPrevSong}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="19 20 9 12 19 4 19 20"></polygon>
            <line x1="5" y1="19" x2="5" y2="5"></line>
          </svg>
        </ControlButton>
        <PlayButton onClick={togglePlay}>
          {isPlaying ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </PlayButton>
        <ControlButton onClick={playNextSong}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="5 4 15 12 5 20 5 4"></polygon>
            <line x1="19" y1="5" x2="19" y2="19"></line>
          </svg>
        </ControlButton>
        <ControlButton onClick={onClose}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </ControlButton>
      </PlayerControls>
    </PlayerContainer>
  );
};

export default MusicPlayer;
