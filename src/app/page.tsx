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
import Footer from "@/components/Footer"

export default function HomePage() {
  const [showLoading, setShowLoading] = useState(true)

  return (
    <div style={{ background: "transparent", minHeight: "100vh", position: "relative" }}>
      <AnimatePresence mode="wait">
        {showLoading && <LoadingScreen onLoadingComplete={() => setShowLoading(false)} />}
      </AnimatePresence>

      {!showLoading && (
        <>
          <CursorLight />
          <Navbar />
          <ScrollProgressBar />
          <AnimatedBackground />
          {/* CRITICAL: Remove all background styles from main content wrapper */}
          <div style={{ background: "transparent", position: "relative", zIndex: 1 }}>
            <MusicPlayerContainer autoPlay={true} />
            <Home />
            <About />
            <Portfolio />
            <Contact />
            <Footer />
          </div>
        </>
      )}
    </div>
  )
}
