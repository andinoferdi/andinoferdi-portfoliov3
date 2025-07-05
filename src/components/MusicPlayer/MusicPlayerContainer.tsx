"use client"

import type React from "react"
import { useEffect } from "react"
import { useMusicPlayer } from "@/hooks/useMusicPlayer"
import MiniPlayer from "./MiniPlayer"
import FullPlayer from "./FullPlayer"

interface MusicPlayerContainerProps {
  autoPlay?: boolean
}

const MusicPlayerContainer: React.FC<MusicPlayerContainerProps> = ({ autoPlay = false }) => {
  const musicPlayer = useMusicPlayer()

  // Auto-play when component mounts
  useEffect(() => {
    if (autoPlay) {
      // Add a small delay to ensure the component is fully mounted
      const timer = setTimeout(() => {
        musicPlayer.startAutoPlay()
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [autoPlay, musicPlayer.startAutoPlay])

  // Don't render anything if no current song
  if (!musicPlayer.currentSong) {
    return null
  }

  return (
    <>
      {musicPlayer.isExpanded ? (
        <FullPlayer
          state={musicPlayer}
          onTogglePlay={musicPlayer.togglePlay}
          onNext={musicPlayer.handleNext}
          onPrevious={musicPlayer.handlePrevious}
          onSeek={musicPlayer.seekTo}
          onVolumeChange={musicPlayer.setVolume}
          onCollapse={musicPlayer.toggleExpanded}
          onToggleShuffle={musicPlayer.toggleShuffle}
          onToggleRepeat={musicPlayer.toggleRepeat}
          onSelectSong={musicPlayer.selectSong}
        />
      ) : (
        <MiniPlayer
          state={musicPlayer}
          onTogglePlay={musicPlayer.togglePlay}
          onNext={musicPlayer.handleNext}
          onPrevious={musicPlayer.handlePrevious}
          onExpand={musicPlayer.toggleExpanded}
        />
      )}
    </>
  )
}

export default MusicPlayerContainer
