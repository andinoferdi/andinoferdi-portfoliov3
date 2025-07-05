"use client"

import type React from "react"
import Image from "next/image"
import { Play, Pause, SkipForward, SkipBack, Maximize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { MusicPlayerState } from "@/types/music"

interface MiniPlayerProps {
  state: MusicPlayerState
  onTogglePlay: () => void
  onNext: () => void
  onPrevious: () => void
  onExpand: () => void
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({ state, onTogglePlay, onNext, onPrevious, onExpand }) => {
  const { currentSong, isPlaying, currentTime, duration, isLoading } = state

  if (!currentSong) return null

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-20 right-4 z-40 w-64 bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-lg overflow-hidden group hover:shadow-primary/10 transition-all duration-300"
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-muted/50">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-blue-500"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="p-3">
          <div className="flex items-center gap-2">
            {/* Album Art */}
            <div className="relative w-8 h-8 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={currentSong.albumArt || "/placeholder.svg"}
                alt={currentSong.album}
                fill
                className="object-cover"
                sizes="32px"
              />
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-medium text-foreground truncate">{currentSong.title}</h4>
              <p className="text-[10px] text-muted-foreground truncate">{currentSong.artist}</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={onPrevious}
                className="p-1 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                title="Previous"
              >
                <SkipBack className="w-3 h-3" />
              </button>

              <button
                onClick={onTogglePlay}
                disabled={isLoading}
                className="p-1.5 rounded bg-primary/20 hover:bg-primary/30 text-primary transition-colors disabled:opacity-50"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isLoading ? (
                  <div className="w-3 h-3 border border-primary/30 border-t-primary rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-3 h-3" />
                ) : (
                  <Play className="w-3 h-3 ml-0.5" />
                )}
              </button>

              <button
                onClick={onNext}
                className="p-1 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                title="Next"
              >
                <SkipForward className="w-3 h-3" />
              </button>

              <button
                onClick={onExpand}
                className="p-1 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors ml-0.5"
                title="Expand Player"
              >
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default MiniPlayer
