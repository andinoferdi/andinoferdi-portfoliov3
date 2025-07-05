"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import WelcomeScreen from "@/components/WelcomeScreen"
import Navbar from "@/components/Navbar"
import AnimatedBackground from "@/components/Background"
import CursorLight from "@/components/CursorLight"
import Home from "@/components/sections/Home"
import About from "@/components/sections/About"
import Portfolio from "@/components/sections/Portfolio"
import Contact from "@/components/sections/Contact"

export default function HomePage() {
  const [showWelcome, setShowWelcome] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <CursorLight />
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Portfolio />
          <Contact />
        </>
      )}
    </>
  )
}
