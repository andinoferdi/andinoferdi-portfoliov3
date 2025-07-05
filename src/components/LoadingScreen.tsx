"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import { Code2, Github, Globe, User, Zap, Cpu, Database } from "lucide-react"

interface LoadingScreenProps {
  onLoadingComplete?: () => void
}

interface LoadingStepProps {
  step: string
  isActive: boolean
  isCompleted: boolean
}

const LoadingStep: React.FC<LoadingStepProps> = ({ step, isActive, isCompleted }) => (
  <motion.div
    className="flex items-center gap-3 text-sm"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative">
      {isCompleted ? (
        <motion.div
          className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <motion.div
            className="w-2 h-2 bg-white rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          />
        </motion.div>
      ) : isActive ? (
        <div className="relative">
          <div className="w-4 h-4 rounded-full border-2 border-blue-500/30" />
          <motion.div
            className="absolute inset-0 w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>
      ) : (
        <div className="w-4 h-4 rounded-full border-2 border-gray-600" />
      )}
    </div>
    <span
      className={`transition-colors duration-300 ${
        isCompleted ? "text-blue-400" : isActive ? "text-white" : "text-gray-500"
      }`}
    >
      {step}
    </span>
  </motion.div>
)

const InteractiveLoadingAnimation: React.FC<{
  progress: number
  currentStep: number
}> = ({ progress, currentStep }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const loadingSteps = [
    "Initializing components...",
    "Loading assets...",
    "Connecting to services...",
    "Optimizing performance...",
    "Finalizing setup...",
  ]

  // Prevent hydration mismatch by not rendering floating icons until mounted
  const floatingIcons = mounted ? [Github, Globe, User, Zap, Cpu, Database] : []

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Main Loading Animation */}
      <div className="relative">
        {/* Outer Ring */}
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-blue-500/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Inner Pulse */}
          <div className="absolute inset-4 md:inset-6">
            <motion.div
              className="w-full h-full rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>

          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="p-4 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <Code2 className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
            </motion.div>
          </div>
        </div>

        {/* Floating Icons - only render after mount to prevent hydration issues */}
        {floatingIcons.map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 flex items-center justify-center"
            style={{
              top: `${50 + 40 * Math.sin((index * Math.PI * 2) / 6)}%`,
              left: `${50 + 40 * Math.cos((index * Math.PI * 2) / 6)}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -10, 0],
              rotate: [0, 360],
            }}
            transition={{
              opacity: { duration: 0.3, delay: index * 0.1 },
              scale: { duration: 0.3, delay: index * 0.1 },
              y: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.2,
              },
              rotate: {
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
            }}
          >
            <Icon className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md space-y-4">
        <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute inset-y-0 left-0 bg-white/30 rounded-full"
            style={{ width: `${progress}%` }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Loading...</span>
          <span className="text-blue-400 font-medium">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Loading Steps */}
      <div className="space-y-3 w-full max-w-md">
        {loadingSteps.map((step, index) => (
          <LoadingStep key={index} step={step} isActive={index === currentStep} isCompleted={index < currentStep} />
        ))}
      </div>

      {/* Brand */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          EkiZR
        </h2>
        <p className="text-gray-400 text-sm">Creative Developer</p>
      </motion.div>
    </div>
  )
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [isMinimumTimeElapsed, setIsMinimumTimeElapsed] = useState(false)

  useEffect(() => {
    // Prevent flickering by checking document state immediately
    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        setIsPageLoaded(true)
        setProgress(90)
      } else if (document.readyState === "interactive") {
        setProgress(60)
      }
    }

    const handleLoad = () => {
      setIsPageLoaded(true)
    }

    const handleDOMContentLoaded = () => {
      setProgress(60)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("load", handleLoad)
      document.addEventListener("DOMContentLoaded", handleDOMContentLoaded)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("load", handleLoad)
        document.removeEventListener("DOMContentLoaded", handleDOMContentLoaded)
      }
    }
  }, [])

  useEffect(() => {
    const minTimeTimer = setTimeout(() => {
      setIsMinimumTimeElapsed(true)
    }, 2000) // Enforce a minimum 2 second loading screen

    return () => {
      clearTimeout(minTimeTimer)
    }
  }, [])

  useEffect(() => {
    let progressTimer: NodeJS.Timeout
    let stepTimer: NodeJS.Timeout

    if (isPageLoaded && isMinimumTimeElapsed) {
      // Page is loaded, complete the loading quickly
      progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressTimer)
            setTimeout(() => {
              setIsLoading(false)
              setTimeout(() => {
                onLoadingComplete?.()
              }, 500)
            }, 200)
            return 100
          }
          return Math.min(prev + 10, 100)
        })
      }, 30)

      stepTimer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < 4) {
            return prev + 1
          }
          clearInterval(stepTimer)
          return prev
        })
      }, 100)
    } else {
      // Simulate realistic loading progress
      progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev < 30) return prev + 3
          if (prev < 60) return prev + 2
          if (prev < 90) return prev + 1
          return prev + 0.5
        })
      }, 150)

      stepTimer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < 4) {
            return prev + 1
          }
          return prev
        })
      }, 600)
    }

    return () => {
      clearInterval(progressTimer)
      clearInterval(stepTimer)
    }
  }, [isPageLoaded, isMinimumTimeElapsed, onLoadingComplete])

  const containerVariants: Variants = {
    exit: {
      opacity: 0,
      scale: 0.98,
      filter: "blur(4px)",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          {/* Animated Background Patterns */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Geometric Patterns */}
            <div className="absolute inset-0">
              {/* Animated Circles */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-blue-500/20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full border border-cyan-500/20"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />

              {/* Floating Dots */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-cyan-900/10" />
          </div>

          <div className="relative z-10 px-4 w-full max-w-lg">
            <InteractiveLoadingAnimation progress={progress} currentStep={currentStep} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
