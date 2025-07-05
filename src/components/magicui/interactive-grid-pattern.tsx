"use client"

import { cn } from "@/lib/utils"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import type React from "react"
import { useEffect, useRef } from "react"

export function InteractiveGridPattern({
  width = 25,
  height = 25,
  x = -1,
  y = -1,
  className,
  ...props
}: {
  width?: number
  height?: number
  x?: number
  y?: number
  className?: string
  [key: string]: any
}) {
  const mouseX = useMotionValue(x)
  const mouseY = useMotionValue(y)
  const containerRef = useRef<HTMLDivElement>(null)

  // Global mouse tracking to ensure consistent behavior
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const relativeX = e.clientX - rect.left
        const relativeY = e.clientY - rect.top

        // Always update mouse position for global tracking
        mouseX.set(relativeX)
        mouseY.set(relativeY)
      }
    }

    // Add global mouse listener to capture all mouse movements
    document.addEventListener("mousemove", handleGlobalMouseMove, { passive: true })

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
    }
  }, [mouseX, mouseY])

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 z-0 h-full w-full", className)}
      onMouseMove={handleMouseMove}
      style={{ pointerEvents: "none" }} // Allow mouse events to pass through
      {...props}
    >
      {/* Base grid layer - More visible */}
      <div className="absolute inset-0 h-full w-full">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid-pattern" width={width} height={height} patternUnits="userSpaceOnUse" x={-1} y={-1}>
              <path
                d={`M${width} 0L0 0L0 ${height}`}
                fill="none"
                className="stroke-muted-foreground/8 dark:stroke-muted-foreground/12"
                strokeWidth="0.4"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Illuminated grid layer with improved masking */}
      <motion.div
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{
          maskImage: useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, white 0%, white 30%, transparent 70%)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, white 0%, white 30%, transparent 70%)`,
        }}
      >
        <div className="absolute inset-0 h-full w-full">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid-pattern-glow" width={width} height={height} patternUnits="userSpaceOnUse" x={-1} y={-1}>
                <path
                  d={`M${width} 0L0 0L0 ${height}`}
                  fill="none"
                  className="stroke-primary/35 dark:stroke-white/35"
                  strokeWidth="0.8"
                />
              </pattern>

              {/* Reduced glow effect */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern-glow)" filter="url(#glow)" />
          </svg>

          {/* Reduced glow overlay */}
          <motion.div
            className="absolute inset-0 opacity-25"
            style={{
              background: useMotionTemplate`radial-gradient(180px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary)/0.12) 0%, hsl(var(--primary)/0.03) 40%, transparent 70%)`,
            }}
          />
        </div>
      </motion.div>

      {/* Subtle fallback overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: useMotionTemplate`radial-gradient(150px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary)/0.04) 0%, transparent 60%)`,
        }}
      />
    </div>
  )
}

export default InteractiveGridPattern
