"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type React from "react";

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  className,
  ...props
}: {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  className?: string;
  [key: string]: any;
}) {
  const mouseX = useMotionValue(x);
  const mouseY = useMotionValue(y);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "absolute inset-0 z-0 h-full w-full bg-background",
        className
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <div className="absolute inset-0 h-full w-full">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="grid-pattern"
              width={width}
              height={height}
              patternUnits="userSpaceOnUse"
              x={-1}
              y={-1}
            >
              <path
                d={`M${width} 0L0 0L0 ${height}`}
                fill="none"
                className="stroke-muted-foreground/10"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
      <motion.div
        className="pointer-events-none absolute inset-0 h-full w-full bg-background"
        style={{
          maskImage: useMotionTemplate`radial-gradient(300px at ${mouseX}px ${mouseY}px, white, transparent)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(300px at ${mouseX}px ${mouseY}px, white, transparent)`,
        }}
      >
        <div className="absolute inset-0 h-full w-full">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="grid-pattern-glow"
                width={width}
                height={height}
                patternUnits="userSpaceOnUse"
                x={-1}
                y={-1}
              >
                <path
                  d={`M${width} 0L0 0L0 ${height}`}
                  fill="none"
                  className="stroke-black dark:stroke-white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern-glow)" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

export default InteractiveGridPattern;
