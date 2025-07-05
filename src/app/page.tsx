"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import LoadingScreen from "@/components/LoadingScreen"
import Navbar from "@/components/Navbar"
import ScrollProgressBar from "@/components/ScrollProgressBar"
import AnimatedBackground from "@/components/Background"
import CursorLight from "@/components/CursorLight"
import MusicPlayerContainer from "@/components/MusicPlayer/MusicPlayerContainer"
import Home from "@/components/sections/Home"
import About from "@/components/sections/About"
import Portfolio from "@/components/sections/Portfolio"
import Contact from "@/components/sections/Contact"

export default function HomePage() {
  const [showLoading, setShowLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoading && <LoadingScreen onLoadingComplete={() => setShowLoading(false)} />}
      </AnimatePresence>

      {!showLoading && (
        <div className="relative min-h-screen">
          <CursorLight />
          <Navbar />
          <ScrollProgressBar />
          <AnimatedBackground />
          <div className="relative z-10">
            <MusicPlayerContainer autoPlay={true} />
            <Home />
            <About />
            <Portfolio />
            <Contact />
          </div>
        </div>
      )}
    </>
  )
}
