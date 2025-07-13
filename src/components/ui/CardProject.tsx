"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, ArrowRight, Github } from "lucide-react"

interface CardProjectProps {
  id: number
  title: string
  description: string
  image: string
  link: string
  github?: string
  techStack?: string[]
}

const CardProject: React.FC<CardProjectProps> = ({ id, title, description, image, link, github, techStack }) => {
  const handleLiveDemo = (e: React.MouseEvent) => {
    if (!link) {
      e.preventDefault()
      alert("Live demo link is not available")
    }
  }

  const handleGithub = (e: React.MouseEvent) => {
    if (!github) {
      e.preventDefault()
      alert("GitHub repository is not available")
    }
  }

  return (
    <div className="group relative w-full" style={{ background: "transparent" }}>
      <div
        className="relative overflow-hidden rounded-xl border border-border/50 shadow-2xl transition-all duration-300 hover:shadow-primary/20"
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-cyan-500/5 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

        <div className="relative p-5 z-10" style={{ background: "transparent" }}>
          <div className="relative overflow-hidden rounded-lg mb-4" style={{ background: "transparent" }}>
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={400}
              height={250}
              className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="space-y-3" style={{ background: "transparent" }}>
            <h3 className="text-xl font-semibold gradient-text">{title}</h3>

            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{description}</p>

            {/* Tech Stack */}
            {techStack && techStack.length > 0 && (
              <div className="flex flex-wrap gap-1" style={{ background: "transparent" }}>
                {techStack.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full border border-primary/30"
                  >
                    {tech}
                  </span>
                ))}
                {techStack.length > 3 && (
                  <span className="px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded-full border border-border">
                    +{techStack.length - 3}
                  </span>
                )}
              </div>
            )}

            <div className="pt-4 flex items-center justify-between gap-2" style={{ background: "transparent" }}>
              <div className="flex gap-2" style={{ background: "transparent" }}>
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLiveDemo}
                    className="inline-flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors duration-200 text-sm"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Demo</span>
                  </a>
                )}

                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleGithub}
                    className="inline-flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                  >
                    <Github className="w-3 h-3" />
                    <span>Code</span>
                  </a>
                )}
              </div>

              <Link
                href={`/project/${id}`}
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-primary/50 text-foreground transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  backdropFilter: "none",
                  WebkitBackdropFilter: "none",
                }}
              >
                <span>Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="absolute inset-0 border border-transparent group-hover:border-primary/50 rounded-xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  )
}

export default CardProject
