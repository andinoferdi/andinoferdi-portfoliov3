"use client"

import { cn } from "@/lib/utils"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import type React from "react"
import { useEffect, useRef, useState } from "react"

interface InteractiveGridPatternProps {
  width?: number
  height?: number
  x?: number
  y?: number
  className?: string
  [key: string]: string | number | undefined
}

const InteractiveGridPattern: React.FC<InteractiveGridPatternProps> = ({
  width = 25,
  height = 25,
  x = -1,
  y = -1,
  className,
  ...props
}) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMouseInside, setIsMouseInside] = useState(false)
  const [hasMouseEntered, setHasMouseEntered] = useState(false)
  const [screenSize, setScreenSize] = useState<"watch" | "mobile" | "tablet" | "desktop">("desktop")

  // Detect screen size for responsive circle sizes
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      if (width < 320) setScreenSize("watch")
      else if (width < 768) setScreenSize("mobile")
      else if (width < 1024) setScreenSize("tablet")
      else setScreenSize("desktop")
    }

    updateScreenSize()
    window.addEventListener("resize", updateScreenSize)
    return () => window.removeEventListener("resize", updateScreenSize)
  }, [])

  // Responsive circle sizes based on screen size
  const getCircleSizes = () => {
    switch (screenSize) {
      case "watch":
        return { main: 60, glow: 40, fallback: 30 }
      case "mobile":
        return { main: 120, glow: 80, fallback: 60 }
      case "tablet":
        return { main: 150, glow: 100, fallback: 75 }
      default:
        return { main: 180, glow: 120, fallback: 90 }
    }
  }

  const sizes = getCircleSizes()

  // 🎯 RESPONSIVE CIRCLE SIZES
  const maskImage = useMotionTemplate`radial-gradient(${sizes.main}px circle at ${mouseX}px ${mouseY}px, white 0%, white 40%, transparent 80%)`
  const glowBackground = useMotionTemplate`radial-gradient(${sizes.glow}px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 30%, rgba(59, 130, 246, 0.05) 50%, transparent 80%)`
  const fallbackBackground = useMotionTemplate`radial-gradient(${sizes.fallback}px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%)`

  // Global mouse tracking untuk detect mouse enter ke website
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const relativeX = e.clientX - rect.left
        const relativeY = e.clientY - rect.top

        // Update mouse position
        mouseX.set(relativeX)
        mouseY.set(relativeY)

        // Check if mouse is inside the container
        const isInside = relativeX >= 0 && relativeX <= rect.width && relativeY >= 0 && relativeY <= rect.height

        if (isInside && !hasMouseEntered) {
          setHasMouseEntered(true)
          setIsMouseInside(true)
        } else if (isInside) {
          setIsMouseInside(true)
        } else {
          setIsMouseInside(false)
        }
      }
    }

    // Touch events for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      if (containerRef.current && e.touches.length > 0) {
        const touch = e.touches[0]
        const rect = containerRef.current.getBoundingClientRect()
        const relativeX = touch.clientX - rect.left
        const relativeY = touch.clientY - rect.top

        mouseX.set(relativeX)
        mouseY.set(relativeY)

        const isInside = relativeX >= 0 && relativeX <= rect.width && relativeY >= 0 && relativeY <= rect.height

        if (isInside && !hasMouseEntered) {
          setHasMouseEntered(true)
          setIsMouseInside(true)
        } else if (isInside) {
          setIsMouseInside(true)
        }
      }
    }

    // Mouse leave detection untuk window
    const handleMouseLeave = () => {
      setIsMouseInside(false)
    }

    const handleTouchEnd = () => {
      setIsMouseInside(false)
    }

    document.addEventListener("mousemove", handleGlobalMouseMove, { passive: true })
    document.addEventListener("touchmove", handleTouchMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true })
    document.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [mouseX, mouseY, hasMouseEntered])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = event.currentTarget.getBoundingClientRect()
    mouseX.set(event.clientX - left)
    mouseY.set(event.clientY - top)
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length > 0) {
      const touch = event.touches[0]
      const { left, top } = event.currentTarget.getBoundingClientRect()
      mouseX.set(touch.clientX - left)
      mouseY.set(touch.clientY - top)
    }
  }

  const handleMouseEnter = () => {
    if (!hasMouseEntered) {
      setHasMouseEntered(true)
    }
    setIsMouseInside(true)
  }

  const handleTouchStart = () => {
    if (!hasMouseEntered) {
      setHasMouseEntered(true)
    }
    setIsMouseInside(true)
  }

  const handleMouseLeave = () => {
    setIsMouseInside(false)
  }

  const handleTouchEnd = () => {
    setIsMouseInside(false)
  }

  // Responsive grid size
  const responsiveWidth = screenSize === "watch" ? 20 : screenSize === "mobile" ? 22 : width
  const responsiveHeight = screenSize === "watch" ? 20 : screenSize === "mobile" ? 22 : height

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 z-0 h-full w-full", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ pointerEvents: "none" }}
      {...props}
    >
      {/* Base grid layer - Always visible but subtle */}
      <div className="absolute inset-0 h-full w-full">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern
              id="grid-pattern"
              width={responsiveWidth}
              height={responsiveHeight}
              patternUnits="userSpaceOnUse"
              x={x}
              y={y}
            >
              <path
                d={`M${responsiveWidth} 0L0 0L0 ${responsiveHeight}`}
                fill="none"
                stroke="rgba(59, 130, 246, 0.15)"
                strokeWidth={screenSize === "watch" ? "0.3" : screenSize === "mobile" ? "0.4" : "0.5"}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Illuminated grid layer - Only show after mouse enters */}
      <motion.div
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{
          maskImage: maskImage,
          WebkitMaskImage: maskImage,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: hasMouseEntered && isMouseInside ? 1 : 0,
        }}
        transition={{
          duration: screenSize === "watch" ? 0.4 : 0.6,
          ease: "easeOut",
          delay: hasMouseEntered && !isMouseInside ? 0 : screenSize === "watch" ? 0.1 : 0.2,
        }}
      >
        <div className="absolute inset-0 h-full w-full">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern
                id="grid-pattern-glow"
                width={responsiveWidth}
                height={responsiveHeight}
                patternUnits="userSpaceOnUse"
                x={x}
                y={y}
              >
                <path
                  d={`M${responsiveWidth} 0L0 0L0 ${responsiveHeight}`}
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.9)"
                  strokeWidth={screenSize === "watch" ? "0.8" : screenSize === "mobile" ? "1.0" : "1.2"}
                />
              </pattern>

              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation={screenSize === "watch" ? "1" : "2"} result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern-glow)" filter="url(#glow)" />
          </svg>

          <motion.div
            className="absolute inset-0 opacity-40"
            style={{
              background: glowBackground,
            }}
          />
        </div>
      </motion.div>

      {/* Enhanced fallback overlay - Only show after mouse enters */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: fallbackBackground,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: hasMouseEntered && isMouseInside ? 0.3 : 0,
        }}
        transition={{
          duration: screenSize === "watch" ? 0.4 : 0.6,
          ease: "easeOut",
          delay: hasMouseEntered && !isMouseInside ? 0 : screenSize === "watch" ? 0.2 : 0.4,
        }}
      />
    </div>
  )
}

export default InteractiveGridPattern
