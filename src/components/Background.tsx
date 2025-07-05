"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import InteractiveGridPattern from "@/components/magicui/interactive-grid-pattern"

const ORB_COUNT = 8

const AnimatedBackground: React.FC = () => {
  const backgroundRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Main vertical parallax (background moves slower than page)
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -200])

  // Background opacity changes very slightly while scrolling
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.85, 0.7])

  // Gradient overlay opacity
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.5, 0.7, 0.9])

  // Pre-compute a MotionValue for each orb so hooks aren't inside a loop later
  const orbYValues = Array.from({ length: ORB_COUNT }, (_, i) =>
    useTransform(scrollYProgress, [0, 1], [0, -50 - i * 10]),
  )

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
        y: bgY,
        opacity: bgOpacity,
        pointerEvents: "none",
        isolation: "isolate",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      {/* MagicUI grid -------------------------------------------------------- */}
      <InteractiveGridPattern className="absolute inset-0" width={25} height={25} />

      {/* Floating orbs ------------------------------------------------------- */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: ORB_COUNT }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20 blur-sm"
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + i * 8}%`,
              y: orbYValues[i],
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

      {/* Depth gradient overlay --------------------------------------------- */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)/0.1) 70%, hsl(var(--background)/0.3) 100%)",
          opacity: overlayOpacity,
        }}
      />
    </motion.div>
  )
}

export default AnimatedBackground
