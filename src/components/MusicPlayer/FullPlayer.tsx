"use client"

import type React from "react"
import Image from "next/image"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1,
  Minimize2,
  List,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { MusicPlayerState } from "@/types/music"

interface FullPlayerProps {
  state: MusicPlayerState
  onTogglePlay: () => void
  onNext: () => void
  onPrevious: () => void
  onSeek: (time: number) => void
  onVolumeChange: (volume: number) => void
  onCollapse: () => void
  onToggleShuffle: () => void
  onToggleRepeat: () => void
  onSelectSong: (index: number) => void
}

const FullPlayer: React.FC<FullPlayerProps> = ({
  state,
  onTogglePlay,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onCollapse,
  onToggleShuffle,
  onToggleRepeat,
  onSelectSong,
}) => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    playlist,
    currentIndex,
    isLoading,
    isShuffled,
    repeatMode,
  } = state

  if (!currentSong) return null

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-20 right-4 z-40 w-80 bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-xs font-medium text-foreground">Now Playing</span>
          </div>
          <button
            onClick={onCollapse}
            className="p-1 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            title="Minimize Player"
          >
            <Minimize2 className="w-3 h-3" />
          </button>
        </div>

        {/* Album Art & Song Info */}
        <div className="p-4">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3 group max-w-[200px] mx-auto">
            <Image
              src={currentSong.albumArt || "/placeholder.svg"}
              alt={currentSong.album}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="200px"
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
          </div>

          <div className="text-center mb-3">
            <h3 className="text-sm font-bold text-foreground mb-1 truncate">{currentSong.title}</h3>
            <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div
              className="relative w-full h-1.5 bg-muted rounded-full cursor-pointer group"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left
                const percentage = x / rect.width
                onSeek(percentage * duration)
              }}
            >
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-blue-500 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <button
              onClick={onToggleShuffle}
              className={`p-1.5 rounded transition-colors ${
                isShuffled
                  ? "bg-primary/20 text-primary"
                  : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
              }`}
              title="Shuffle"
            >
              <Shuffle className="w-3 h-3" />
            </button>

            <button
              onClick={onPrevious}
              className="p-1.5 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
              title="Previous"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={onTogglePlay}
              disabled={isLoading}
              className="p-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors disabled:opacity-50"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isLoading ? (
                <div className="w-4 h-4 border border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </button>

            <button
              onClick={onNext}
              className="p-1.5 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
              title="Next"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={onToggleRepeat}
              className={`p-1.5 rounded transition-colors ${
                repeatMode !== "none"
                  ? "bg-primary/20 text-primary"
                  : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
              }`}
              title={`Repeat: ${repeatMode}`}
            >
              {repeatMode === "one" ? <Repeat1 className="w-3 h-3" /> : <Repeat className="w-3 h-3" />}
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => onVolumeChange(volume > 0 ? 0 : 0.7)}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              {volume === 0 ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            </button>
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => onVolumeChange(Number.parseFloat(e.target.value))}
                className="w-full h-1 bg-muted rounded-full appearance-none cursor-pointer slider"
              />
            </div>
            <span className="text-[10px] text-muted-foreground w-6 text-right">{Math.round(volume * 100)}</span>
          </div>

          {/* Compact Playlist */}
          <div className="border-t border-border pt-3">
            <div className="flex items-center gap-1 mb-2">
              <List className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">Queue</span>
            </div>
            <div className="max-h-20 overflow-y-auto custom-scrollbar space-y-1">
              {playlist.map((song, index) => (
                <button
                  key={song.id}
                  onClick={() => onSelectSong(index)}
                  className={`w-full flex items-center gap-2 p-1.5 rounded text-left transition-colors ${
                    index === currentIndex
                      ? "bg-primary/20 text-primary"
                      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="w-6 h-6 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={song.albumArt || "/placeholder.svg"}
                      alt={song.album}
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-medium truncate">{song.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: hsl(var(--primary));
            cursor: pointer;
          }
          
          .slider::-moz-range-thumb {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: hsl(var(--primary));
            cursor: pointer;
            border: none;
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  )
}

export default FullPlayer
