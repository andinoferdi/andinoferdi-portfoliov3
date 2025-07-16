"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";

interface Song {
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
}

export default function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(1);
  const [isMinimized, setIsMinimized] = useState(true);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const playerRef = useRef<HTMLDivElement>(null);

  const currentSong: Song = {
    title: "Hey Jude",
    artist: "The Beatles",
    album: "1",
    duration: 425, // 7:05 in seconds
    cover: "/album-cover.png",
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = playerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  // Simulate time progression
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) =>
          prev < currentSong.duration ? prev + 1 : prev
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentSong.duration]);

  return (
    <>
      {/* Minimized Player - With Glass Effect */}
      {isMinimized && (
        <div
          ref={playerRef}
          className="fixed z-50 bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-lg cursor-move select-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: "280px",
          }}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center p-3 space-x-3">
            {/* Album Cover */}
            <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={currentSong.cover || "/placeholder.svg"}
                alt={`${currentSong.album} cover`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-red-600 opacity-90 flex items-center justify-center">
                <span className="text-yellow-400 font-bold text-xl">1</span>
              </div>
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <p className="text-foreground font-medium text-sm truncate">
                {currentSong.title}
              </p>
              <p className="text-muted-foreground text-xs truncate">
                {currentSong.artist}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                onClick={(e) => {
                  e.stopPropagation();
                  // Previous track logic
                }}
              >
                <SkipBack className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-foreground hover:bg-accent"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                }}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 fill-current" />
                ) : (
                  <Play className="h-4 w-4 fill-current" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                onClick={(e) => {
                  e.stopPropagation();
                  // Next track logic
                }}
              >
                <SkipForward className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(false);
                }}
              >
                <Maximize2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Player - Appears at Same Position as Mini */}
      {!isMinimized && (
        <div
          ref={playerRef}
          className="fixed z-50 w-80 bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-lg cursor-move select-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
          onMouseDown={handleMouseDown}
        >
          {/* Header - 32px */}
          <div className="flex items-center justify-between p-3 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-foreground text-sm font-medium">
                Now Playing
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(true);
              }}
            >
              <Maximize2 className="h-3 w-3 rotate-180" />
            </Button>
          </div>

          {/* Main Content */}
          <div className="p-4">
            {/* Album Art - 200px */}
            <div className="relative max-w-[200px] mx-auto aspect-square rounded-lg overflow-hidden mb-3">
              <Image
                src={currentSong.cover || "/placeholder.svg"}
                alt={`${currentSong.album} cover`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-red-600 opacity-90 flex items-center justify-center">
                <span className="text-yellow-400 font-bold text-6xl">1</span>
              </div>
            </div>

            {/* Song Info - 40px */}
            <div className="text-center mb-3">
              <h2 className="text-foreground text-lg font-semibold mb-1">
                {currentSong.title}
              </h2>
              <p className="text-muted-foreground text-sm">
                {currentSong.artist}
              </p>
            </div>

            {/* Progress Bar - 25px */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(currentSong.duration)}</span>
              </div>
              <Slider
                value={[currentTime]}
                max={currentSong.duration}
                step={1}
                className="w-full"
                onValueChange={(value) => setCurrentTime(value[0])}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Main Controls - 40px */}
            <div className="flex items-center justify-center space-x-4 p-2 mb-3">
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                onClick={(e) => e.stopPropagation()}
              >
                <SkipBack className="h-5 w-5" />
              </Button>

              <Button
                variant="default"
                size="lg"
                className="h-12 w-12 p-0 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                }}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 fill-current" />
                ) : (
                  <Play className="h-6 w-6 fill-current ml-1" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                onClick={(e) => e.stopPropagation()}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>

            {/* Volume Control - 25px */}
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-muted-foreground text-sm">🔊</span>
              <Slider
                defaultValue={[70]}
                max={100}
                step={1}
                className="flex-1"
                onClick={(e) => e.stopPropagation()}
              />
              <span className="text-muted-foreground text-sm">70</span>
            </div>
          </div>

          {/* Queue Section - 100px total */}
          <div className="border-t border-border">
            {/* Queue Header - 20px */}
            <div className="flex items-center space-x-2 p-3 pb-2">
              <span className="text-foreground text-sm font-medium">
                📋 Queue
              </span>
            </div>

            {/* Queue List - max 80px */}
            <div className="px-3 pb-3 max-h-20 overflow-y-auto">
              <div className="flex items-center space-x-3 p-2 bg-accent/50 rounded-lg">
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-400 font-bold text-sm">1</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm font-medium truncate">
                    Hey Jude
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
