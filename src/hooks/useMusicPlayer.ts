"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import type { Song, MusicPlayerState } from "@/types/music"
import playlist from "@/data/playlist.json"

const defaultPlaylist: Song[] = playlist as Song[];

export const useMusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [state, setState] = useState<MusicPlayerState>({
    currentSong: defaultPlaylist[0],
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    isExpanded: false,
    playlist: defaultPlaylist,
    currentIndex: 0,
    isLoading: false,
    isShuffled: false,
    repeatMode: "none",
  })

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio()
      audioRef.current.volume = state.volume
      audioRef.current.preload = "metadata"

      // Set crossOrigin to avoid CORS issues
      audioRef.current.crossOrigin = "anonymous"
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Load current song
  useEffect(() => {
    if (audioRef.current && state.currentSong) {
      audioRef.current.src = state.currentSong.audioUrl
      audioRef.current.load()
    }
  }, [state.currentSong])

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setState((prev) => ({
        ...prev,
        duration: audio.duration || 0,
        isLoading: false,
      }))
    }

    const handleTimeUpdate = () => {
      setState((prev) => ({
        ...prev,
        currentTime: audio.currentTime || 0,
      }))
    }

    const handleEnded = () => {
      handleNext()
    }

    const handleLoadStart = () => {
      setState((prev) => ({ ...prev, isLoading: true }))
    }

    const handleCanPlay = () => {
      setState((prev) => ({ ...prev, isLoading: false }))
    }

    const handleError = () => {
      setState((prev) => ({ ...prev, isLoading: false }))
      console.error("Audio loading error")
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("error", handleError)
    }
  }, [state.currentSong])

  const play = useCallback(async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play()
        setState((prev) => ({ ...prev, isPlaying: true }))
      } catch (error) {
        console.error("Play error:", error)
      }
    }
  }, [])

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setState((prev) => ({ ...prev, isPlaying: false }))
    }
  }, [])

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      pause()
    } else {
      play()
    }
  }, [state.isPlaying, play, pause])

  const handleNext = useCallback(() => {
    setState((prev) => {
      let nextIndex

      if (prev.repeatMode === "one") {
        nextIndex = prev.currentIndex
      } else if (prev.isShuffled) {
        nextIndex = Math.floor(Math.random() * prev.playlist.length)
      } else {
        nextIndex = (prev.currentIndex + 1) % prev.playlist.length
      }

      return {
        ...prev,
        currentIndex: nextIndex,
        currentSong: prev.playlist[nextIndex],
        currentTime: 0,
      }
    })
  }, [])

  const handlePrevious = useCallback(() => {
    setState((prev) => {
      let prevIndex

      if (prev.currentTime > 3) {
        // If more than 3 seconds played, restart current song
        if (audioRef.current) {
          audioRef.current.currentTime = 0
        }
        return { ...prev, currentTime: 0 }
      }

      if (prev.isShuffled) {
        prevIndex = Math.floor(Math.random() * prev.playlist.length)
      } else {
        prevIndex = prev.currentIndex === 0 ? prev.playlist.length - 1 : prev.currentIndex - 1
      }

      return {
        ...prev,
        currentIndex: prevIndex,
        currentSong: prev.playlist[prevIndex],
        currentTime: 0,
      }
    })
  }, [])

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      setState((prev) => ({ ...prev, volume }))
    }
  }, [])

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setState((prev) => ({ ...prev, currentTime: time }))
    }
  }, [])

  const toggleExpanded = useCallback(() => {
    setState((prev) => ({ ...prev, isExpanded: !prev.isExpanded }))
  }, [])

  const toggleShuffle = useCallback(() => {
    setState((prev) => ({ ...prev, isShuffled: !prev.isShuffled }))
  }, [])

  const toggleRepeat = useCallback(() => {
    setState((prev) => ({
      ...prev,
      repeatMode: prev.repeatMode === "none" ? "all" : prev.repeatMode === "all" ? "one" : "none",
    }))
  }, [])

  const selectSong = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      currentIndex: index,
      currentSong: prev.playlist[index],
      currentTime: 0,
    }))
  }, [])

  // Auto-play functionality
  const startAutoPlay = useCallback(async () => {
    try {
      await play()
    } catch (error) {
      console.log("Auto-play blocked by browser, user interaction required")
    }
  }, [play])

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
  }
}
