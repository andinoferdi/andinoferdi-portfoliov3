"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface MousePosition {
  x: number
  y: number
}

interface GridSquare {
  id: string
  x: number
  y: number
  isActive: boolean
  intensity: number
}

const AnimatedBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isMouseInside, setIsMouseInside] = useState(false)
  const [documentHeight, setDocumentHeight] = useState(0)
  const [gridSquares, setGridSquares] = useState<GridSquare[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = mounted ? resolvedTheme || theme : "dark"

  // Grid configuration - Reduced intensity by 50%
  const GRID_SIZE = 40 // Size of each square in pixels
  const HOVER_RADIUS = 100 // Reduced from 120px
  const MAX_INTENSITY = 0.5 // Reduced from 1.0 (50% reduction)
  const FADE_SPEED = 0.08 // Increased fade speed for quicker cleanup

  useEffect(() => {
    const updateDocumentHeight = () => {
      const height = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
      )
      setDocumentHeight(height)
    }

    updateDocumentHeight()

    const resizeObserver = new ResizeObserver(updateDocumentHeight)
    resizeObserver.observe(document.body)

    window.addEventListener("resize", updateDocumentHeight)
    const interval = setInterval(updateDocumentHeight, 1000)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateDocumentHeight)
      clearInterval(interval)
    }
  }, [])

  // Initialize grid squares
  useEffect(() => {
    if (!containerRef.current || documentHeight === 0) return

    const container = containerRef.current
    const containerWidth = container.offsetWidth
    const containerHeight = documentHeight

    const cols = Math.ceil(containerWidth / GRID_SIZE)
    const rows = Math.ceil(containerHeight / GRID_SIZE)

    const squares: GridSquare[] = []
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        squares.push({
          id: `${row}-${col}`,
          x: col * GRID_SIZE,
          y: row * GRID_SIZE,
          isActive: false,
          intensity: 0,
        })
      }
    }

    setGridSquares(squares)
  }, [documentHeight, GRID_SIZE])

  // Handle mouse movement and update grid squares
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const newMousePosition = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top + window.scrollY,
        }
        setMousePosition(newMousePosition)

        // Update grid squares based on mouse position
        setGridSquares((prevSquares) =>
          prevSquares.map((square) => {
            const distance = Math.sqrt(
              Math.pow(square.x + GRID_SIZE / 2 - newMousePosition.x, 2) +
                Math.pow(square.y + GRID_SIZE / 2 - newMousePosition.y, 2),
            )

            let newIntensity = 0
            if (distance < HOVER_RADIUS) {
              // Calculate intensity based on distance (closer = more intense)
              const targetIntensity = Math.max(0, 1 - distance / HOVER_RADIUS) * MAX_INTENSITY
              newIntensity = targetIntensity
            }

            return {
              ...square,
              isActive: newIntensity > 0.05, // Lower threshold for activation
              intensity: newIntensity,
            }
          }),
        )
      }
    }

    const handleMouseEnter = () => {
      setIsMouseInside(true)
    }

    const handleMouseLeave = () => {
      setIsMouseInside(false)
      // Immediately start fading out all squares when mouse leaves
      setGridSquares((prevSquares) =>
        prevSquares.map((square) => ({
          ...square,
          isActive: false,
          intensity: square.intensity, // Keep current intensity for gradual fade
        })),
      )
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [GRID_SIZE, HOVER_RADIUS, MAX_INTENSITY])

  // Enhanced fade out system - runs continuously for better cleanup
  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setGridSquares((prevSquares) =>
        prevSquares.map((square) => {
          // Fade out inactive squares or when mouse is outside
          if (!square.isActive || !isMouseInside) {
            const newIntensity = Math.max(0, square.intensity - FADE_SPEED)
            return {
              ...square,
              intensity: newIntensity,
            }
          }
          return square
        }),
      )
    }, 16) // ~60fps for smooth fading

    return () => clearInterval(fadeInterval)
  }, [isMouseInside, FADE_SPEED])

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full pointer-events-none z-0 overflow-hidden"
      style={{
        height: documentHeight,
        minHeight: "100vh",
      }}
    >
      {/* Base background - using theme background */}
      <div className="absolute inset-0 w-full h-full bg-background" />

      {/* Interactive Grid Squares - Reduced intensity by 50% */}
      <div className="absolute inset-0 w-full h-full">
        {gridSquares.map((square) => {
          if (square.intensity <= 0.02) return null // Lower threshold for rendering

          const opacity = square.intensity * 0.4 // Reduced from 0.8 (50% reduction)
          const glowIntensity = square.intensity * 0.3 // Reduced from 0.6 (50% reduction)

          // Theme-aware colors with reduced intensity
          const squareColor = currentTheme === "dark" ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`

          const glowColor =
            currentTheme === "dark" ? `rgba(255, 255, 255, ${glowIntensity})` : `rgba(0, 0, 0, ${glowIntensity})`

          return (
            <div
              key={square.id}
              className="absolute transition-all duration-100 ease-out" // Slightly faster transition
              style={{
                left: square.x,
                top: square.y,
                width: GRID_SIZE,
                height: GRID_SIZE,
                backgroundColor: squareColor,
                boxShadow: `
                  0 0 ${10 * square.intensity}px ${glowColor},
                  0 0 ${20 * square.intensity}px ${glowColor},
                  inset 0 0 ${5 * square.intensity}px ${glowColor}
                `, // Reduced glow sizes by 50%
                border: `1px solid ${
                  currentTheme === "dark"
                    ? `rgba(255, 255, 255, ${square.intensity * 0.15})` // Reduced from 0.3
                    : `rgba(0, 0, 0, ${square.intensity * 0.15})`
                }`,
                transform: `scale(${0.9 + square.intensity * 0.1})`, // Reduced scale effect
              }}
            />
          )
        })}
      </div>

      {/* Small Grid Pattern Background - Reduced opacity */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.07) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.07) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundRepeat: "repeat",
          opacity: 0.21,
        }}
      />

      {/* Finer Grid Overlay - Reduced opacity */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.035) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.035) 1px, transparent 1px)
          `,
          backgroundSize: "10px 10px",
          backgroundRepeat: "repeat",
          opacity: 0.28,
        }}
      />

      {/* Circular Neon Effects - Reduced intensity by 50% */}
      <div className="absolute inset-0 w-full h-full">
        {/* Meteor Effects - Reduced intensity */}
        <div
          className="absolute w-3 h-3 rounded-full animate-meteor-1"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.45) 0%, 
              hsl(var(--primary) / 0.3) 40%, 
              hsl(var(--primary) / 0.1) 70%,
              transparent 100%
            )`,
            top: "10%",
            left: "20%",
            boxShadow: `
              0 0 10px hsl(var(--primary) / 0.3), 
              0 0 20px hsl(var(--primary) / 0.15),
              -10px -5px 15px hsl(var(--primary) / 0.1)
            `,
            filter: "blur(0.5px)",
          }}
        />

        <div
          className="absolute w-2 h-2 rounded-full animate-meteor-2"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.4) 0%, 
              hsl(var(--primary) / 0.25) 50%, 
              transparent 100%
            )`,
            top: "60%",
            right: "15%",
            boxShadow: `
              0 0 7.5px hsl(var(--primary) / 0.25), 
              0 0 15px hsl(var(--primary) / 0.1),
              -7.5px -4px 12.5px hsl(var(--primary) / 0.075)
            `,
            filter: "blur(0.3px)",
          }}
        />

        <div
          className="absolute w-2.5 h-2.5 rounded-full animate-meteor-3"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.425) 0%, 
              hsl(var(--primary) / 0.275) 45%, 
              transparent 100%
            )`,
            top: "35%",
            left: "75%",
            boxShadow: `
              0 0 9px hsl(var(--primary) / 0.275), 
              0 0 17.5px hsl(var(--primary) / 0.125),
              -9px -4.5px 14px hsl(var(--primary) / 0.09)
            `,
            filter: "blur(0.4px)",
          }}
        />

        <div
          className="absolute w-1.5 h-1.5 rounded-full animate-meteor-4"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.375) 0%, 
              hsl(var(--primary) / 0.225) 55%, 
              transparent 100%
            )`,
            top: "80%",
            left: "40%",
            boxShadow: `
              0 0 6px hsl(var(--primary) / 0.225), 
              0 0 12.5px hsl(var(--primary) / 0.1),
              -6px -3px 10px hsl(var(--primary) / 0.075)
            `,
            filter: "blur(0.2px)",
          }}
        />

        {/* Rain Effect - Reduced intensity */}
        <div
          className="absolute w-1.5 h-1.5 rounded-full animate-rain-1"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.35) 0%, 
              hsl(var(--primary) / 0.15) 60%, 
              transparent 100%
            )`,
            top: "-5%",
            left: "30%",
            boxShadow: `0 0 5px hsl(var(--primary) / 0.2)`,
          }}
        />

        <div
          className="absolute w-1 h-1 rounded-full animate-rain-2"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.3) 0%, 
              hsl(var(--primary) / 0.1) 70%, 
              transparent 100%
            )`,
            top: "-10%",
            left: "70%",
            boxShadow: `0 0 4px hsl(var(--primary) / 0.15)`,
          }}
        />

        <div
          className="absolute w-2 h-2 rounded-full animate-rain-3"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.4) 0%, 
              hsl(var(--primary) / 0.2) 50%, 
              transparent 100%
            )`,
            top: "-8%",
            left: "50%",
            boxShadow: `0 0 6px hsl(var(--primary) / 0.25)`,
          }}
        />

        <div
          className="absolute w-1.2 h-1.2 rounded-full animate-rain-4"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.325) 0%, 
              hsl(var(--primary) / 0.125) 65%, 
              transparent 100%
            )`,
            top: "-12%",
            left: "15%",
            boxShadow: `0 0 4.5px hsl(var(--primary) / 0.175)`,
          }}
        />

        <div
          className="absolute w-0.8 h-0.8 rounded-full animate-rain-5"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.275) 0%, 
              hsl(var(--primary) / 0.09) 75%, 
              transparent 100%
            )`,
            top: "-15%",
            left: "85%",
            boxShadow: `0 0 3.5px hsl(var(--primary) / 0.14)`,
          }}
        />

        <div
          className="absolute w-1.8 h-1.8 rounded-full animate-rain-6"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.375) 0%, 
              hsl(var(--primary) / 0.175) 55%, 
              transparent 100%
            )`,
            top: "-6%",
            left: "65%",
            boxShadow: `0 0 5.5px hsl(var(--primary) / 0.225)`,
          }}
        />

        {/* Floating Orbs - Reduced intensity */}
        <div
          className="absolute w-4 h-4 rounded-full animate-orb-float-1"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.3) 0%, 
              hsl(var(--primary) / 0.15) 40%, 
              hsl(var(--primary) / 0.05) 70%,
              transparent 100%
            )`,
            top: "25%",
            left: "80%",
            boxShadow: `
              0 0 12.5px hsl(var(--primary) / 0.2), 
              0 0 25px hsl(var(--primary) / 0.1)
            `,
            filter: "blur(1px)",
          }}
        />

        <div
          className="absolute w-5 h-5 rounded-full animate-orb-float-2"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.25) 0%, 
              hsl(var(--primary) / 0.125) 50%, 
              hsl(var(--primary) / 0.04) 80%,
              transparent 100%
            )`,
            top: "70%",
            left: "10%",
            boxShadow: `
              0 0 15px hsl(var(--primary) / 0.15), 
              0 0 30px hsl(var(--primary) / 0.075)
            `,
            filter: "blur(1.5px)",
          }}
        />

        <div
          className="absolute w-3.5 h-3.5 rounded-full animate-orb-float-3"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.275) 0%, 
              hsl(var(--primary) / 0.14) 45%, 
              hsl(var(--primary) / 0.045) 75%,
              transparent 100%
            )`,
            top: "45%",
            right: "20%",
            boxShadow: `
              0 0 14px hsl(var(--primary) / 0.175), 
              0 0 27.5px hsl(var(--primary) / 0.09)
            `,
            filter: "blur(1.2px)",
          }}
        />

        <div
          className="absolute w-6 h-6 rounded-full animate-orb-float-4"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.225) 0%, 
              hsl(var(--primary) / 0.11) 55%, 
              hsl(var(--primary) / 0.035) 85%,
              transparent 100%
            )`,
            top: "15%",
            left: "35%",
            boxShadow: `
              0 0 17.5px hsl(var(--primary) / 0.14), 
              0 0 35px hsl(var(--primary) / 0.07)
            `,
            filter: "blur(1.8px)",
          }}
        />

        {/* Pulsing Energy Orbs - Reduced intensity */}
        <div
          className="absolute w-3 h-3 rounded-full animate-energy-pulse-1"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.4) 0%, 
              hsl(var(--primary) / 0.2) 50%, 
              transparent 100%
            )`,
            top: "40%",
            left: "15%",
            boxShadow: `0 0 10px hsl(var(--primary) / 0.3)`,
          }}
        />

        <div
          className="absolute w-2.5 h-2.5 rounded-full animate-energy-pulse-2"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.35) 0%, 
              hsl(var(--primary) / 0.175) 60%, 
              transparent 100%
            )`,
            top: "80%",
            right: "25%",
            boxShadow: `0 0 9px hsl(var(--primary) / 0.25)`,
          }}
        />

        <div
          className="absolute w-2 h-2 rounded-full animate-energy-pulse-3"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.375) 0%, 
              hsl(var(--primary) / 0.19) 55%, 
              transparent 100%
            )`,
            top: "20%",
            right: "40%",
            boxShadow: `0 0 8px hsl(var(--primary) / 0.275)`,
          }}
        />

        <div
          className="absolute w-3.5 h-3.5 rounded-full animate-energy-pulse-4"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.325) 0%, 
              hsl(var(--primary) / 0.16) 65%, 
              transparent 100%
            )`,
            top: "65%",
            left: "60%",
            boxShadow: `0 0 11px hsl(var(--primary) / 0.225)`,
          }}
        />

        {/* Shooting Stars - Reduced intensity */}
        <div
          className="absolute w-2 h-2 rounded-full animate-shooting-star-1"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.5) 0%, 
              hsl(var(--primary) / 0.35) 30%, 
              hsl(var(--primary) / 0.15) 60%,
              transparent 100%
            )`,
            top: "15%",
            right: "30%",
            boxShadow: `
              0 0 7.5px hsl(var(--primary) / 0.4), 
              -5px -2.5px 10px hsl(var(--primary) / 0.15),
              -10px -5px 15px hsl(var(--primary) / 0.05)
            `,
          }}
        />

        <div
          className="absolute w-1.5 h-1.5 rounded-full animate-shooting-star-2"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.45) 0%, 
              hsl(var(--primary) / 0.3) 40%, 
              hsl(var(--primary) / 0.1) 70%,
              transparent 100%
            )`,
            top: "55%",
            left: "75%",
            boxShadow: `
              0 0 6px hsl(var(--primary) / 0.35), 
              -4px -2px 7.5px hsl(var(--primary) / 0.125)
            `,
          }}
        />

        <div
          className="absolute w-1.8 h-1.8 rounded-full animate-shooting-star-3"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.475) 0%, 
              hsl(var(--primary) / 0.325) 35%, 
              hsl(var(--primary) / 0.125) 65%,
              transparent 100%
            )`,
            top: "30%",
            left: "10%",
            boxShadow: `
              0 0 7px hsl(var(--primary) / 0.375), 
              -4.5px -2.25px 9px hsl(var(--primary) / 0.14)
            `,
          }}
        />

        <div
          className="absolute w-1.2 h-1.2 rounded-full animate-shooting-star-4"
          style={{
            background: `radial-gradient(circle, 
              hsl(var(--primary) / 0.425) 0%, 
              hsl(var(--primary) / 0.275) 45%, 
              hsl(var(--primary) / 0.09) 75%,
              transparent 100%
            )`,
            top: "75%",
            right: "10%",
            boxShadow: `
              0 0 5px hsl(var(--primary) / 0.325), 
              -3.5px -1.75px 6.5px hsl(var(--primary) / 0.11)
            `,
          }}
        />

        {/* Sparkles - Reduced intensity */}
        <div
          className="absolute w-1 h-1 rounded-full animate-sparkle-1"
          style={{
            background: `hsl(var(--primary) / 0.4)`,
            top: "35%",
            left: "45%",
            boxShadow: `0 0 4px hsl(var(--primary) / 0.3)`,
          }}
        />

        <div
          className="absolute w-0.5 h-0.5 rounded-full animate-sparkle-2"
          style={{
            background: `hsl(var(--primary) / 0.45)`,
            top: "65%",
            right: "40%",
            boxShadow: `0 0 3px hsl(var(--primary) / 0.35)`,
          }}
        />

        <div
          className="absolute w-1.5 h-1.5 rounded-full animate-sparkle-3"
          style={{
            background: `hsl(var(--primary) / 0.35)`,
            top: "85%",
            left: "60%",
            boxShadow: `0 0 5px hsl(var(--primary) / 0.25)`,
          }}
        />

        <div
          className="absolute w-0.8 h-0.8 rounded-full animate-sparkle-4"
          style={{
            background: `hsl(var(--primary) / 0.425)`,
            top: "25%",
            left: "25%",
            boxShadow: `0 0 3.5px hsl(var(--primary) / 0.325)`,
          }}
        />

        <div
          className="absolute w-1.2 h-1.2 rounded-full animate-sparkle-5"
          style={{
            background: `hsl(var(--primary) / 0.375)`,
            top: "50%",
            right: "15%",
            boxShadow: `0 0 4.5px hsl(var(--primary) / 0.275)`,
          }}
        />

        <div
          className="absolute w-0.6 h-0.6 rounded-full animate-sparkle-6"
          style={{
            background: `hsl(var(--primary) / 0.475)`,
            top: "10%",
            left: "55%",
            boxShadow: `0 0 2.5px hsl(var(--primary) / 0.375)`,
          }}
        />

        <div
          className="absolute w-1.3 h-1.3 rounded-full animate-sparkle-7"
          style={{
            background: `hsl(var(--primary) / 0.325)`,
            top: "90%",
            right: "50%",
            boxShadow: `0 0 4.25px hsl(var(--primary) / 0.225)`,
          }}
        />

        <div
          className="absolute w-0.7 h-0.7 rounded-full animate-sparkle-8"
          style={{
            background: `hsl(var(--primary) / 0.44)`,
            top: "18%",
            right: "65%",
            boxShadow: `0 0 3.25px hsl(var(--primary) / 0.34)`,
          }}
        />

        {/* Floating Particles - Reduced intensity */}
        <div
          className="absolute w-0.5 h-0.5 rounded-full animate-particle-1"
          style={{
            background: `hsl(var(--primary) / 0.3)`,
            top: "22%",
            left: "18%",
            boxShadow: `0 0 2px hsl(var(--primary) / 0.2)`,
          }}
        />

        <div
          className="absolute w-0.3 h-0.3 rounded-full animate-particle-2"
          style={{
            background: `hsl(var(--primary) / 0.35)`,
            top: "38%",
            right: "28%",
            boxShadow: `0 0 1.5px hsl(var(--primary) / 0.25)`,
          }}
        />

        <div
          className="absolute w-0.4 h-0.4 rounded-full animate-particle-3"
          style={{
            background: `hsl(var(--primary) / 0.325)`,
            top: "58%",
            left: "32%",
            boxShadow: `0 0 1.75px hsl(var(--primary) / 0.225)`,
          }}
        />

        <div
          className="absolute w-0.6 h-0.6 rounded-full animate-particle-4"
          style={{
            background: `hsl(var(--primary) / 0.275)`,
            top: "72%",
            right: "35%",
            boxShadow: `0 0 2.25px hsl(var(--primary) / 0.175)`,
          }}
        />

        <div
          className="absolute w-0.35 h-0.35 rounded-full animate-particle-5"
          style={{
            background: `hsl(var(--primary) / 0.375)`,
            top: "12%",
            left: "68%",
            boxShadow: `0 0 1.6px hsl(var(--primary) / 0.275)`,
          }}
        />

        <div
          className="absolute w-0.45 h-0.45 rounded-full animate-particle-6"
          style={{
            background: `hsl(var(--primary) / 0.34)`,
            top: "88%",
            left: "22%",
            boxShadow: `0 0 1.9px hsl(var(--primary) / 0.24)`,
          }}
        />

        {/* Bubble Effects - Reduced intensity */}
        <div
          className="absolute w-2.5 h-2.5 rounded-full animate-bubble-1"
          style={{
            background: `radial-gradient(circle at 30% 30%, 
              hsl(var(--primary) / 0.2) 0%, 
              hsl(var(--primary) / 0.075) 50%, 
              hsl(var(--primary) / 0.025) 80%,
              transparent 100%
            )`,
            top: "95%",
            left: "45%",
            boxShadow: `0 0 7.5px hsl(var(--primary) / 0.1)`,
            filter: "blur(0.5px)",
          }}
        />

        <div
          className="absolute w-3.2 h-3.2 rounded-full animate-bubble-2"
          style={{
            background: `radial-gradient(circle at 25% 25%, 
              hsl(var(--primary) / 0.175) 0%, 
              hsl(var(--primary) / 0.06) 55%, 
              hsl(var(--primary) / 0.02) 85%,
              transparent 100%
            )`,
            top: "92%",
            right: "30%",
            boxShadow: `0 0 9px hsl(var(--primary) / 0.09)`,
            filter: "blur(0.7px)",
          }}
        />

        <div
          className="absolute w-1.8 h-1.8 rounded-full animate-bubble-3"
          style={{
            background: `radial-gradient(circle at 35% 35%, 
              hsl(var(--primary) / 0.225) 0%, 
              hsl(var(--primary) / 0.09) 45%, 
              hsl(var(--primary) / 0.03) 75%,
              transparent 100%
            )`,
            top: "98%",
            left: "15%",
            boxShadow: `0 0 6px hsl(var(--primary) / 0.125)`,
            filter: "blur(0.3px)",
          }}
        />
      </div>

      {/* Mouse-following glow effect - Reduced intensity */}
      {isMouseInside && (
        <>
          {/* Main cursor glow */}
          <div
            className="absolute pointer-events-none transition-opacity duration-300 ease-out"
            style={{
              left: mousePosition.x - 250,
              top: mousePosition.y - 250,
              width: "500px",
              height: "500px",
              background: `radial-gradient(circle, 
                hsl(var(--primary) / 0.075) 0%, 
                hsl(var(--primary) / 0.04) 30%, 
                hsl(var(--primary) / 0.02) 50%, 
                transparent 70%
              )`,
              borderRadius: "50%",
              filter: "blur(1px)",
              opacity: isMouseInside ? 1 : 0,
            }}
          />

          {/* Inner intense glow */}
          <div
            className="absolute pointer-events-none transition-opacity duration-200 ease-out"
            style={{
              left: mousePosition.x - 125,
              top: mousePosition.y - 125,
              width: "250px",
              height: "250px",
              background: `radial-gradient(circle, 
                hsl(var(--primary) / 0.1) 0%, 
                hsl(var(--primary) / 0.05) 40%, 
                transparent 70%
              )`,
              borderRadius: "50%",
              filter: "blur(0.5px)",
              opacity: isMouseInside ? 1 : 0,
            }}
          />

          {/* Outer subtle glow */}
          <div
            className="absolute pointer-events-none transition-opacity duration-500 ease-out"
            style={{
              left: mousePosition.x - 350,
              top: mousePosition.y - 350,
              width: "700px",
              height: "700px",
              background: `radial-gradient(circle, 
                hsl(var(--primary) / 0.03) 0%, 
                hsl(var(--primary) / 0.01) 30%, 
                transparent 60%
              )`,
              borderRadius: "50%",
              filter: "blur(2px)",
              opacity: isMouseInside ? 1 : 0,
            }}
          />
        </>
      )}

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-background/10 pointer-events-none" />

      {/* Additional subtle ambient lighting - Reduced opacity */}
      <div className="absolute inset-0 w-full h-full opacity-3.5">
        <div
          className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-21"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-32 right-32 w-80 h-80 rounded-full blur-3xl opacity-17.5"
          style={{
            background: "radial-gradient(circle, hsl(var(--blue-500) / 0.056) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl opacity-14"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.042) 0%, transparent 70%)",
          }}
        />
      </div>
    </div>
  )
}

export default AnimatedBackground
