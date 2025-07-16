"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { MusicPlayerState } from "@/types/music";
import { useSupabaseMusicPlayer } from "./useSupabaseMusicPlayer";

export const useMusicPlayer = () => {
  const { songs, loading } = useSupabaseMusicPlayer();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<MusicPlayerState>({
    currentSong: songs.length > 0 ? songs[0] : null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    isExpanded: false,
    playlist: songs,
    currentIndex: 0,
    isLoading: loading,
    isShuffled: false,
    repeatMode: "none",
  });

  // Update playlist when songs are loaded
  useEffect(() => {
    if (songs.length > 0) {
      setState((prev) => ({
        ...prev,
        playlist: songs,
        currentSong: prev.currentSong || songs[0],
        isLoading: loading,
      }));
    }
  }, [songs, loading]);

  // Initialize audio element ONLY ONCE
  useEffect(() => {
    if (typeof window !== "undefined" && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = state.volume;
      audioRef.current.preload = "metadata";
      audioRef.current.crossOrigin = "anonymous";
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []); // Remove state.volume dependency to prevent recreation

  // Separate useEffect for volume changes ONLY
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, state.volume));
    }
  }, [state.volume]);

  // Load current song
  useEffect(() => {
    if (audioRef.current && state.currentSong) {
      // Store current playback state
      const wasPlaying = state.isPlaying;
      const currentTime = audioRef.current.currentTime;

      audioRef.current.src = state.currentSong.audio_url;
      audioRef.current.load();

      // Restore volume after load
      audioRef.current.volume = state.volume;

      // If was playing, resume after load
      if (wasPlaying) {
        const handleCanPlayThrough = () => {
          if (audioRef.current) {
            audioRef.current.currentTime = currentTime;
            audioRef.current.play().catch(console.error);
            audioRef.current.removeEventListener(
              "canplaythrough",
              handleCanPlayThrough
            );
          }
        };
        audioRef.current.addEventListener(
          "canplaythrough",
          handleCanPlayThrough
        );
      }
    }
  }, [state.currentSong]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setState((prev) => ({
        ...prev,
        duration: audio.duration || 0,
        isLoading: false,
      }));
    };

    const handleTimeUpdate = () => {
      setState((prev) => ({
        ...prev,
        currentTime: audio.currentTime || 0,
      }));
    };

    const handleEnded = () => {
      handleNextSong();
    };

    const handleLoadStart = () => {
      setState((prev) => ({ ...prev, isLoading: true }));
    };

    const handleCanPlay = () => {
      setState((prev) => ({ ...prev, isLoading: false }));
    };

    const handleError = () => {
      setState((prev) => ({ ...prev, isLoading: false }));
      console.error("Audio loading error");
    };

    // Handle play/pause state changes
    const handlePlay = () => {
      setState((prev) => ({ ...prev, isPlaying: true }));
    };

    const handlePause = () => {
      setState((prev) => ({ ...prev, isPlaying: false }));
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [state.currentSong]);

  const handleNextSong = useCallback(() => {
    setState((prev) => {
      let nextIndex;

      if (prev.repeatMode === "one") {
        nextIndex = prev.currentIndex;
      } else if (prev.isShuffled) {
        nextIndex = Math.floor(Math.random() * prev.playlist.length);
      } else {
        nextIndex = (prev.currentIndex + 1) % prev.playlist.length;
      }

      return {
        ...prev,
        currentIndex: nextIndex,
        currentSong: prev.playlist[nextIndex],
        currentTime: 0,
      };
    });
  }, []);

  const handleNext = handleNextSong;

  const play = useCallback(async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setState((prev) => ({ ...prev, isPlaying: true }));
      } catch (error) {
        // Handle specific abort errors that occur when play() is interrupted
        if (
          error instanceof DOMException &&
          (error.name === "AbortError" || error.name === "NotAllowedError")
        ) {
          console.log("Play was interrupted or not allowed:", error.message);
          setState((prev) => ({ ...prev, isPlaying: false }));
        } else {
          console.error("Play error:", error);
          setState((prev) => ({ ...prev, isPlaying: false }));
        }
      }
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setState((prev) => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const togglePlay = useCallback(async () => {
    if (state.isPlaying) {
      pause();
    } else {
      await play();
    }
  }, [state.isPlaying, play, pause]);

  const handlePrevious = useCallback(() => {
    setState((prev) => {
      let prevIndex;

      if (prev.currentTime > 3) {
        // If more than 3 seconds played, restart current song
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
        }
        return { ...prev, currentTime: 0 };
      }

      if (prev.isShuffled) {
        prevIndex = Math.floor(Math.random() * prev.playlist.length);
      } else {
        prevIndex =
          prev.currentIndex === 0
            ? prev.playlist.length - 1
            : prev.currentIndex - 1;
      }

      return {
        ...prev,
        currentIndex: prevIndex,
        currentSong: prev.playlist[prevIndex],
        currentTime: 0,
      };
    });
  }, []);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));

    // Update state
    setState((prev) => ({ ...prev, volume: clampedVolume }));

    // Immediately update audio element volume
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  }, []);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setState((prev) => ({ ...prev, currentTime: time }));
    }
  }, []);

  const toggleExpanded = useCallback(() => {
    setState((prev) => ({ ...prev, isExpanded: !prev.isExpanded }));
  }, []);

  const toggleShuffle = useCallback(() => {
    setState((prev) => ({ ...prev, isShuffled: !prev.isShuffled }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setState((prev) => ({
      ...prev,
      repeatMode:
        prev.repeatMode === "none"
          ? "all"
          : prev.repeatMode === "all"
          ? "one"
          : "none",
    }));
  }, []);

  const selectSong = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      currentIndex: index,
      currentSong: prev.playlist[index],
      currentTime: 0,
    }));
  }, []);

  // Auto-play functionality
  const startAutoPlay = useCallback(async () => {
    try {
      await play();
    } catch {
      console.log("Auto-play blocked by browser, user interaction required");
    }
  }, [play]);

  return {
    ...state,
    play,
    pause,
    togglePlay,
    handleNext,
    handlePrevious,
    setVolume,
    seekTo,
    toggleExpanded,
    toggleShuffle,
    toggleRepeat,
    selectSong,
    startAutoPlay,
  };
};
