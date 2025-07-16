"use client";

import React, { useRef, useCallback, useMemo, useEffect } from "react";
import { useMusicPlayer } from "@/hooks/useMusicPlayer";

const MusicPlayer: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isExpanded,
    isLoading,
    togglePlay,
    handleNext,
    handlePrevious,
    setVolume,
    toggleExpanded,
  } = useMusicPlayer();

  const playerRef = useRef<HTMLDivElement>(null);

  // Simple volume control without complex optimizations
  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = Number.parseFloat(e.target.value);

      // Debounce volume changes to prevent rapid updates
      if (volumeTimeoutRef.current) {
        window.clearTimeout(volumeTimeoutRef.current);
      }
      volumeTimeoutRef.current = window.setTimeout(() => {
        setVolume(newVolume);
      }, 10);
    },
    [setVolume]
  );

  // Add ref for volume timeout
  const volumeTimeoutRef = useRef<number | null>(null);

  // Mute/unmute toggle
  const handleVolumeToggle = useCallback(() => {
    const newVolume = volume > 0 ? 0 : 0.7;
    setVolume(newVolume);
  }, [volume, setVolume]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (volumeTimeoutRef.current) {
        window.clearTimeout(volumeTimeoutRef.current);
      }
    };
  }, []);

  // Volume styling
  const volumeStyles = useMemo(() => {
    const volumePercent = Math.round(volume * 100);
    return {
      volumePercent,
      volumeFillColor:
        volume === 0
          ? "transparent"
          : volume < 0.3
          ? "#10b981"
          : volume < 0.7
          ? "#f59e0b"
          : "#ef4444",
      volumeFillColorLight:
        volume === 0
          ? "transparent"
          : volume < 0.3
          ? "#34d399"
          : volume < 0.7
          ? "#fbbf24"
          : "#f87171",
      glowColor:
        volume === 0
          ? "none"
          : volume < 0.3
          ? "#10b98133"
          : volume < 0.7
          ? "#f59e0b33"
          : "#ef444433",
    };
  }, [volume]);

  // Time formatting - decimal format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const decimalPart = (remainingSeconds / 60).toFixed(2).slice(1); // Get .XX part
    return `${mins}${decimalPart}`;
  };

  // Show loading state if no songs loaded yet
  if (isLoading || !currentSong) {
    return (
      <div
        style={{
          position: "fixed",
          top: "110px",
          right: "20px",
          width: "260px",
          height: "50px",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontSize: "14px",
          zIndex: 1000,
        }}
      >
        Loading music...
      </div>
    );
  }

  // Styles
  const containerStyle: React.CSSProperties = {
    position: "fixed",
    top: "110px",
    right: "20px",
    width: isExpanded ? "280px" : "260px",
    height: isExpanded ? "440px" : "50px",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    cursor: "default",
    zIndex: 1000,
    userSelect: "none",
    transition: isExpanded ? "all 0.3s ease" : "none",
    overflow: "hidden",
  };

  const miniPlayerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    height: "100%",
    padding: "8px 12px",
    gap: "12px",
  };

  const albumCoverStyle: React.CSSProperties = {
    width: "34px",
    height: "34px",
    backgroundColor: "#dc2626",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: "#fbbf24",
    fontSize: "14px",
    fontWeight: "bold",
    overflow: "hidden",
  };

  const songInfoStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
  };

  const titleStyle: React.CSSProperties = {
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: "600",
    lineHeight: "1.2",
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  const artistStyle: React.CSSProperties = {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "11px",
    fontWeight: "400",
    lineHeight: "1.2",
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  const controlsStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    flexShrink: 0,
  };

  const buttonStyle: React.CSSProperties = {
    width: "28px",
    height: "28px",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "14px",
    transition: "all 0.2s ease",
  };

  const playButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    color: "#ffffff",
  };

  const expandedContentStyle: React.CSSProperties = {
    padding: "15px",
    textAlign: "center" as const,
    color: "#ffffff",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const expandedAlbumStyle: React.CSSProperties = {
    width: "180px",
    height: "180px",
    backgroundColor: "#dc2626",
    borderRadius: "12px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fbbf24",
    fontSize: "42px",
    fontWeight: "bold",
    flexShrink: 0,
    overflow: "hidden",
  };

  const progressBarStyle: React.CSSProperties = {
    width: "100%",
    height: "6px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "3px",
    margin: "0",
    position: "relative" as const,
  };

  const progressFillStyle: React.CSSProperties = {
    height: "100%",
    backgroundColor: "#6366f1",
    borderRadius: "3px",
    width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
  };

  const expandedControlsStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    margin: "0",
  };

  const expandedButtonStyle: React.CSSProperties = {
    width: "50px",
    height: "50px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "none",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#ffffff",
    fontSize: "18px",
    transition: "all 0.2s ease",
  };

  return (
    <div ref={playerRef} style={containerStyle}>
      {!isExpanded ? (
        // Mini Player
        <div style={miniPlayerStyle}>
          <div style={albumCoverStyle}>
            {currentSong.album_art ? (
              <img
                src={currentSong.album_art}
                alt={`${currentSong.album} album art`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            ) : (
              "🎵"
            )}
          </div>

          <div style={songInfoStyle}>
            <p style={titleStyle}>{currentSong.title}</p>
            <p style={artistStyle}>{currentSong.artist}</p>
          </div>

          <div style={controlsStyle}>
            <button
              style={buttonStyle}
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              ⏮
            </button>

            <button
              style={playButtonStyle}
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            <button
              style={buttonStyle}
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              ⏭
            </button>

            <button
              style={buttonStyle}
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded();
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              ⛶
            </button>
          </div>
        </div>
      ) : (
        // Expanded Player
        <div style={expandedContentStyle}>
          <button
            style={{
              position: "absolute" as const,
              top: "10px",
              right: "10px",
              ...buttonStyle,
            }}
            onClick={(e) => {
              e.stopPropagation();
              toggleExpanded();
            }}
          >
            ✕
          </button>

          {/* Top section - Album and Info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <div style={expandedAlbumStyle}>
              {currentSong.album_art ? (
                <img
                  src={currentSong.album_art}
                  alt={`${currentSong.album} album art`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              ) : (
                "🎵"
              )}
            </div>

            <div style={{ marginTop: "20px" }}>
              <h2
                style={{
                  margin: "0 0 5px 0",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                {currentSong.title}
              </h2>
              <p
                style={{
                  margin: "0",
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "14px",
                }}
              >
                {currentSong.artist}
              </p>
            </div>
          </div>

          {/* Progress section */}
          <div style={{ margin: "15px 0 10px 0" }}>
            <div style={progressBarStyle}>
              <div style={progressFillStyle}></div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.7)",
                marginTop: "8px",
              }}
            >
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls section */}
          <div style={{ ...expandedControlsStyle, paddingBottom: "10px" }}>
            <button style={expandedButtonStyle} onClick={handlePrevious}>
              ⏮
            </button>
            <button
              style={{
                ...expandedButtonStyle,
                backgroundColor: "#6366f1",
                width: "56px",
                height: "56px",
                fontSize: "22px",
              }}
              onClick={togglePlay}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button style={expandedButtonStyle} onClick={handleNext}>
              ⏭
            </button>
          </div>

          {/* Modern Volume Control */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              paddingBottom: "12px",
              paddingTop: "8px",
            }}
          >
            {/* Volume Icon Button */}
            <button
              onClick={handleVolumeToggle}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "6px",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontSize: "14px",
                color: volume === 0 ? "#ef4444" : "#10b981",
                opacity: 1, // Removed isPending
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
            </button>

            {/* Custom Volume Slider */}
            <div
              style={{
                flex: 1,
                position: "relative",
                height: "24px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Background Track */}
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "4px",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                {/* Volume Fill with Gradient */}
                <div
                  style={{
                    height: "100%",
                    width: `${volumeStyles.volumePercent}%`,
                    background:
                      volumeStyles.volumeFillColor === "transparent"
                        ? "transparent"
                        : `linear-gradient(90deg, ${volumeStyles.volumeFillColor} 0%, ${volumeStyles.volumeFillColorLight} 100%)`,
                    borderRadius: "2px",
                    transition: "width 0.1s ease, background 0.2s ease",
                    boxShadow: `0 0 8px ${volumeStyles.glowColor}`,
                  }}
                />
              </div>

              {/* Invisible Native Input for Functionality */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "24px",
                  opacity: 0,
                  cursor: "pointer",
                  margin: 0,
                  appearance: "none",
                  WebkitAppearance: "none",
                }}
              />

              {/* Custom Thumb */}
              <div
                style={{
                  position: "absolute",
                  left: `calc(${volumeStyles.volumePercent}% - 6px)`,
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#ffffff",
                  borderRadius: "50%",
                  border: "2px solid rgba(0, 0, 0, 0.1)",
                  boxShadow:
                    "0 2px 6px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                  transition: "left 0.1s ease, transform 0.2s ease",
                  transform: "scale(1)", // Removed isPending
                  cursor: "pointer",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Volume Percentage Display */}
            <div
              style={{
                minWidth: "36px",
                textAlign: "center",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: "4px",
                padding: "2px 6px",
                fontSize: "11px",
                fontWeight: "500",
                color: "rgba(255, 255, 255, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                opacity: 1, // Removed isPending
                transition: "opacity 0.2s ease",
              }}
            >
              {volumeStyles.volumePercent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
