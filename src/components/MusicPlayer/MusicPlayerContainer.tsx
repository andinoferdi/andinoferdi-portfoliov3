"use client"

import React from "react"
import { useSupabaseMusicPlayer } from "@/hooks/useSupabaseMusicPlayer"
import MiniPlayer from "./MiniPlayer"
import FullPlayer from "./FullPlayer"

interface MusicPlayerContainerProps {
  autoPlay?: boolean
}

const MusicPlayerContainer: React.FC<MusicPlayerContainerProps> = ({ autoPlay = false }) => {
  const { songs, loading } = useSupabaseMusicPlayer()
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(autoPlay)  // Use autoPlay here
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [volume, setVolume] = React.useState(0.7)

  // Sinkronisasi play/pause
  React.useEffect(() => {
    const currentAudio = audioRef.current;
    if (!currentAudio) return;
    
    const playAudio = async () => {
      try {
        if (isPlaying) {
          await currentAudio.play();
        } else {
          currentAudio.pause();
        }
      } catch (error) {
        // Handle autoplay prevention
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
          console.warn('Autoplay was prevented. User interaction required.');
          setIsPlaying(false);
        }
      }
    };

    playAudio();
  }, [isPlaying, songs, currentIndex])

  // Sinkronisasi volume
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Sinkronisasi seek
  React.useEffect(() => {
    if (audioRef.current && Math.abs(audioRef.current.currentTime - currentTime) > 1) {
      audioRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  // Update currentTime dari audio
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  if (loading || songs.length === 0) return null;
  const currentSong = songs.length > 0 ? {
    ...songs[currentIndex],
    id: Number(songs[currentIndex].id),
    audioUrl: songs[currentIndex].audio_url,
    albumArt: songs[currentIndex].album_art,
  } : null;

  // Handler mirip useMusicPlayer lama
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % songs.length)
  const handlePrevious = () => setCurrentIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1))
  const togglePlay = () => setIsPlaying((prev) => !prev)
  const seekTo = (time: number) => setCurrentTime(time)
  const toggleExpanded = () => setIsExpanded((prev) => !prev)
  const selectSong = (idx: number) => setCurrentIndex(idx)

  // Map playlist agar semua song punya audioUrl & albumArt agar kompatibel
  const mappedPlaylist = songs.map(song => ({
    ...song,
    id: Number(song.id),
    audioUrl: song.audio_url,
    albumArt: song.album_art,
  }))

  if (!currentSong) return null
  return (
    <>
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
        preload="auto"
      />
      {isExpanded ? (
        <FullPlayer
          state={{
            currentSong,
            isPlaying,
            currentTime,
            duration: currentSong.duration,
            volume,
            isExpanded,
            playlist: mappedPlaylist,
            currentIndex,
            isLoading: loading,
            isShuffled: false,
            repeatMode: "none",
          }}
          onTogglePlay={togglePlay}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSeek={seekTo}
          onVolumeChange={setVolume}
          onCollapse={toggleExpanded}
          onToggleShuffle={() => {}}
          onToggleRepeat={() => {}}
          onSelectSong={selectSong}
        />
      ) : (
        <MiniPlayer
          state={{
            currentSong,
            isPlaying,
            currentTime,
            duration: currentSong.duration,
            volume,
            isExpanded,
            playlist: mappedPlaylist,
            currentIndex,
            isLoading: loading,
            isShuffled: false,
            repeatMode: "none",
          }}
          onTogglePlay={togglePlay}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onExpand={toggleExpanded}
        />
      )}
    </>
  )
}

export default MusicPlayerContainer
