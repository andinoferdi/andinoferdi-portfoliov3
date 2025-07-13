"use client";

import type React from "react";
import { useState, useEffect, useCallback, memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
} from "lucide-react";

// Types
interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  link: string;
}

interface CTAButtonProps {
  href: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  variant?: "primary" | "secondary";
}

interface SocialLinkProps {
  icon: React.ComponentType<{ className?: string }>;
  link: string;
}

interface TechStackProps {
  tech: string;
}

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = [
  "Network & Telecom Student",
  "Tech Enthusiast",
  "Creative Developer",
];
const TECH_STACK = ["React", "Javascript", "Node.js", "Tailwind"];
const SOCIAL_LINKS: SocialLink[] = [
  { icon: Github, link: "https://github.com/EkiZR" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/ekizr/" },
  { icon: Instagram, link: "https://www.instagram.com/ekizr._/?hl=id" },
];

// Memoized Components
const StatusBadge = memo(() => (
  <div
    className="inline-block animate-float lg:mx-0 content-layer"
    data-aos="fade-up"
    data-aos-delay="100"
  >
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-card/40 backdrop-blur-xl border border-border">
        <span className="gradient-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-primary" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

StatusBadge.displayName = "StatusBadge";

const MainTitle = memo(() => (
  <div
    className="space-y-2 content-layer"
    data-aos="fade-up"
    data-aos-delay="200"
  >
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-primary to-blue-500 blur-2xl opacity-20"></span>
        <span className="relative text-foreground">Frontend</span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-primary to-blue-500 blur-2xl opacity-20"></span>
        <span className="relative gradient-text">Developer</span>
      </span>
    </h1>
  </div>
));

MainTitle.displayName = "MainTitle";

const TechStack = memo<TechStackProps>(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-card/50 backdrop-blur-sm border border-border text-sm text-muted-foreground hover:bg-card/70 hover:text-foreground transition-colors content-layer">
    {tech}
  </div>
));

TechStack.displayName = "TechStack";

const CTAButton = memo<CTAButtonProps>(
  ({ href, text, icon: Icon, variant = "primary" }) => (
    <a href={href} className="content-layer">
      <button
        className={`group relative w-[160px] ${
          variant === "primary" ? "primary-btn" : "secondary-btn"
        }`}
      >
        <div
          className={`absolute -inset-0.5 ${
            variant === "primary"
              ? "bg-gradient-to-r from-primary to-blue-500"
              : "bg-gradient-to-r from-muted to-accent"
          } rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700`}
        ></div>
        <div
          className={`relative h-11 ${
            variant === "primary" ? "bg-background" : "bg-card"
          } backdrop-blur-xl rounded-lg border border-border leading-none overflow-hidden`}
        >
          <div
            className={`absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ${
              variant === "primary"
                ? "bg-gradient-to-r from-primary/20 to-blue-500/20"
                : "bg-gradient-to-r from-muted/20 to-accent/20"
            }`}
          ></div>
          <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
            <span
              className={`${
                variant === "primary"
                  ? "text-foreground"
                  : "text-muted-foreground"
              } font-medium z-10`}
            >
              {text}
            </span>
            <Icon
              className={`w-4 h-4 ${
                variant === "primary"
                  ? "text-foreground"
                  : "text-muted-foreground"
              } ${
                text === "Contact"
                  ? "group-hover:translate-x-1"
                  : "group-hover:rotate-45"
              } transform transition-all duration-300 z-10`}
            />
          </span>
        </div>
      </button>
    </a>
  )
);

CTAButton.displayName = "CTAButton";

const SocialLink = memo<SocialLinkProps>(({ icon: Icon, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="content-layer"
  >
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-card/50 backdrop-blur-xl p-2 flex items-center justify-center border border-border group-hover:border-primary/50 transition-all duration-300">
        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </button>
  </a>
));

SocialLink.displayName = "SocialLink";

// Simple CSS-based animation component to replace Lottie
const AnimatedHero = memo(() => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center transition-all duration-500 ${
        isHovering ? "scale-105" : "scale-100"
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated Background Circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-80 h-80 md:w-96 md:h-96">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-spin-slower"></div>

          {/* Middle pulsing ring */}
          <div className="absolute inset-8 border border-blue-500/30 rounded-full animate-pulse-slow"></div>

          {/* Inner floating elements */}
          <div className="absolute inset-16 flex items-center justify-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              {/* Central icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-primary to-blue-500 rounded-full flex items-center justify-center animate-float">
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    {"</>"}
                  </span>
                </div>
              </div>

              {/* Floating tech icons */}
              {["JS", "TS", "React", "Next"].map((tech, index) => (
                <div
                  key={tech}
                  className="absolute w-8 h-8 md:w-10 md:h-10 bg-card/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-xs font-medium animate-float"
                  style={{
                    top: `${50 + 35 * Math.sin((index * Math.PI * 2) / 4)}%`,
                    left: `${50 + 35 * Math.cos((index * Math.PI * 2) / 4)}%`,
                    transform: "translate(-50%, -50%)",
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
          isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
        }`}
      ></div>
    </div>
  );
});

AnimatedHero.displayName = "AnimatedHero";

const Home: React.FC = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping, isTyping]);

  return (
    <div
      className="min-h-screen overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] content-layer relative"
      id="Home"
    >
      <div
        className={`relative z-10 transition-all duration-1000 content-layer ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto min-h-screen content-layer">
          <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20 content-layer">
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0 content-layer">
              <div className="space-y-4 sm:space-y-6 content-layer">
                <StatusBadge />
                <MainTitle />

                {/* Typing Effect */}
                <div
                  className="h-8 flex items-center content-layer"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <span className="text-xl md:text-2xl text-muted-foreground font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-primary to-blue-500 ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p
                  className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed font-light content-layer"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  Menciptakan Website Yang Inovatif, Fungsional, dan
                  User-Friendly untuk Solusi Digital.
                </p>

                {/* Tech Stack */}
                <div
                  className="flex flex-wrap gap-3 justify-start content-layer"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div
                  className="flex flex-row gap-3 w-full justify-start content-layer"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  <CTAButton
                    href="#Portfolio"
                    text="Projects"
                    icon={ExternalLink}
                    variant="primary"
                  />
                  <CTAButton
                    href="#Contact"
                    text="Contact"
                    icon={Mail}
                    variant="secondary"
                  />
                </div>

                {/* Social Links */}
                <div
                  className="hidden sm:flex gap-4 justify-start content-layer"
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Custom Animated Hero */}
            <div
              className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0 content-layer"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <div className="relative w-full opacity-90 content-layer">
                <AnimatedHero />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
