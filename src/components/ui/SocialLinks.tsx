"use client"

import type React from "react"
import { Linkedin, Github, Instagram, Youtube, ExternalLink } from "lucide-react"

interface SocialLink {
  name: string
  displayName: string
  subText: string
  icon: React.ComponentType<{ className?: string }>
  url: string
  color: string
  gradient: string
  isPrimary?: boolean
}

const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    displayName: "Let's Connect",
    subText: "on LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/ekizr/",
    color: "#0A66C2",
    gradient: "from-[#0A66C2] to-[#0077B5]",
    isPrimary: true,
  },
  {
    name: "Instagram",
    displayName: "Instagram",
    subText: "@ekizr._",
    icon: Instagram,
    url: "https://www.instagram.com/ekizr._/?hl=id",
    color: "#E4405F",
    gradient: "from-[#833AB4] via-[#E4405F] to-[#FCAF45]",
  },
  {
    name: "YouTube",
    displayName: "Youtube",
    subText: "@eki zulfar",
    icon: Youtube,
    url: "https://www.youtube.com/@eki_zulfar",
    color: "#FF0000",
    gradient: "from-[#FF0000] to-[#CC0000]",
  },
  {
    name: "GitHub",
    displayName: "Github",
    subText: "@EkiZR",
    icon: Github,
    url: "https://github.com/EkiZR",
    color: "#ffffff",
    gradient: "from-[#333] to-[#24292e]",
  },
]

const SocialLinks: React.FC = () => {
  const linkedIn = socialLinks.find((link) => link.isPrimary)!
  const otherLinks = socialLinks.filter((link) => !link.isPrimary)
  const [instagram, youtube, github] = otherLinks

  return (
    <div className="w-full bg-gradient-to-br from-card/50 to-card/30 rounded-2xl p-6 py-8 backdrop-blur-xl border border-border">
      <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
        <span className="inline-block w-8 h-1 bg-primary rounded-full"></span>
        Connect With Me
      </h3>

      <div className="flex flex-col gap-4">
        {/* LinkedIn - Primary Row */}
        <a
          href={linkedIn.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border overflow-hidden hover:border-primary/50 transition-all duration-500"
        >
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${linkedIn.gradient}`}
          />

          <div className="relative flex items-center gap-4">
            <div className="relative flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-20 rounded-md transition-all duration-500 group-hover:scale-110 group-hover:opacity-30"
                style={{ backgroundColor: linkedIn.color }}
              />
              <div className="relative p-2 rounded-md">
                <linkedIn.icon
                  className="w-6 h-6 transition-all duration-500 group-hover:scale-105"
                  style={{ color: linkedIn.color }}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold pt-[0.2rem] text-foreground tracking-tight leading-none group-hover:text-foreground transition-colors duration-300">
                {linkedIn.displayName}
              </span>
              <span className="text-sm text-muted-foreground group-hover:text-muted-foreground transition-colors duration-300">
                {linkedIn.subText}
              </span>
            </div>
          </div>

          <ExternalLink className="relative w-5 h-5 text-muted-foreground group-hover:text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-1" />
        </a>

        {/* Second Row - Instagram & YouTube */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[instagram, youtube].map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border overflow-hidden hover:border-primary/50 transition-all duration-500"
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${link.gradient}`}
              />

              <div className="relative flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-20 rounded-lg transition-all duration-500 group-hover:scale-125 group-hover:opacity-30"
                  style={{ backgroundColor: link.color }}
                />
                <div className="relative p-2 rounded-lg">
                  <link.icon
                    className="w-5 h-5 transition-all duration-500 group-hover:scale-110"
                    style={{ color: link.color }}
                  />
                </div>
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-foreground group-hover:text-foreground transition-colors duration-300">
                  {link.displayName}
                </span>
                <span className="text-xs text-muted-foreground truncate group-hover:text-muted-foreground transition-colors duration-300">
                  {link.subText}
                </span>
              </div>

              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2" />
            </a>
          ))}
        </div>

        {/* Third Row - GitHub */}
        <div className="grid grid-cols-1 gap-4">
          <a
            key={github.name}
            href={github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border overflow-hidden hover:border-primary/50 transition-all duration-500"
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${github.gradient}`}
            />

            <div className="relative flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-20 rounded-lg transition-all duration-500 group-hover:scale-125 group-hover:opacity-30"
                style={{ backgroundColor: github.color }}
              />
              <div className="relative p-2 rounded-lg">
                <github.icon
                  className="w-5 h-5 transition-all duration-500 group-hover:scale-110"
                  style={{ color: github.color }}
                />
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-foreground group-hover:text-foreground transition-colors duration-300">
                {github.displayName}
              </span>
              <span className="text-xs text-muted-foreground truncate group-hover:text-muted-foreground transition-colors duration-300">
                {github.subText}
              </span>
            </div>

            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default SocialLinks
