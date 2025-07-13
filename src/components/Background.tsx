"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import InteractiveGridPattern from "@/components/magicui/interactive-grid-pattern"

const ORB_COUNT = 8

const AnimatedBackground: React.FC = () => {
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return
      backgroundRef.current.dispatchEvent(
        new CustomEvent("backgroundMouseMove", {
          detail: { clientX: e.clientX, clientY: e.clientY },
        }),
      )
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <motion.div
      ref={backgroundRef}
      className="fixed inset-0 z-0 interactive-background scrolling-background"
      style={{
        // CRITICAL: Remove all scroll-based changes - keep completely static
        opacity: 1, // Fixed opacity - no scroll changes
        pointerEvents: "none",
        isolation: "isolate",
        height: "100vh",
        width: "100vw",
        background: "transparent",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      {/* MagicUI grid - completely static with consistent opacity */}
      <div className="absolute inset-0 w-full h-full opacity-100">
        <InteractiveGridPattern className="absolute inset-0 w-full h-full" width={25} height={25} />
      </div>

      {/* Floating orbs - consistent across all sections */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: ORB_COUNT }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400/20 blur-sm"
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + i * 8}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.25, 0.6, 0.25],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default AnimatedBackground
