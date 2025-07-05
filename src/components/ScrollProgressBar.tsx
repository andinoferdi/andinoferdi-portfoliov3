"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import type React from "react";

const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-16 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgressBar;
