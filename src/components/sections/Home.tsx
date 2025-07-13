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
import Lottie from "lottie-react";

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

// Lottie animation data (inline untuk menghindari masalah loading)
const lottieAnimationData = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 800,
  h: 600,
  nm: "Developer Animation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            {
              i: { x: [0.833], y: [0.833] },
              o: { x: [0.167], y: [0.167] },
              t: 0,
              s: [0],
            },
            { t: 89, s: [360] },
          ],
        },
        p: { a: 0, k: [400, 300, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              d: 1,
              ty: "el",
              s: { a: 0, k: [200, 200] },
              p: { a: 0, k: [0, 0] },
            },
            {
              ty: "st",
              c: { a: 0, k: [0.23, 0.51, 0.91, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 4 },
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0,
    },
  ],
};

// Memoized Components
const StatusBadge = memo(() => (
  <div
    className="inline-block animate-float lg:mx-0 content-layer"
    data-aos="fade-up"
    data-aos-delay="100"
  >
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div
        className="relative px-2 watch:px-1 mobile:px-3 sm:px-4 py-1.5 watch:py-1 mobile:py-2 rounded-full border border-border"
        style={{ background: "rgba(255, 255, 255, 0.02)" }}
      >
        <span className="gradient-text text-[0.6rem] watch:text-[0.5rem] mobile:text-[0.7rem] sm:text-sm font-medium flex items-center">
          <Sparkles className="w-2.5 h-2.5 watch:w-2 watch:h-2 mobile:w-3 mobile:h-3 sm:w-4 sm:h-4 mr-1.5 watch:mr-1 mobile:mr-2 text-primary" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

StatusBadge.displayName = "StatusBadge";

const MainTitle = memo(() => (
  <div
    className="space-y-1 watch:space-y-0.5 mobile:space-y-2 content-layer"
    data-aos="fade-up"
    data-aos-delay="200"
  >
    <h1 className="text-2xl watch:text-lg mobile:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight watch:leading-tight mobile:leading-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-1 watch:-inset-0.5 mobile:-inset-2 bg-gradient-to-r from-primary to-blue-500 blur-xl watch:blur-sm mobile:blur-2xl opacity-20"></span>
        <span className="relative text-foreground">Frontend</span>
      </span>
      <br />
      <span className="relative inline-block mt-1 watch:mt-0.5 mobile:mt-2">
        <span className="absolute -inset-1 watch:-inset-0.5 mobile:-inset-2 bg-gradient-to-r from-primary to-blue-500 blur-xl watch:blur-sm mobile:blur-2xl opacity-20"></span>
        <span className="relative gradient-text">Developer</span>
      </span>
    </h1>
  </div>
));

MainTitle.displayName = "MainTitle";

const TechStack = memo<TechStackProps>(({ tech }) => (
  <div
    className="px-2 watch:px-1 mobile:px-3 md:px-4 py-1 watch:py-0.5 mobile:py-1.5 md:py-2 hidden mobile:block rounded-full border border-border text-xs watch:text-[0.6rem] mobile:text-sm text-muted-foreground hover:text-foreground transition-colors content-layer"
    style={{ background: "rgba(255, 255, 255, 0.02)" }}
  >
    {tech}
  </div>
));

TechStack.displayName = "TechStack";

const CTAButton = memo<CTAButtonProps>(
  ({ href, text, icon: Icon, variant = "primary" }) => (
    <a href={href} className="content-layer">
      <button
        className={`group relative w-full watch:w-24 mobile:w-32 sm:w-[160px] ${
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
          className={`relative h-8 watch:h-6 mobile:h-9 sm:h-11 rounded-lg border border-border leading-none overflow-hidden`}
          style={{
            background:
              variant === "primary"
                ? "rgba(0, 0, 0, 0.02)"
                : "rgba(255, 255, 255, 0.02)",
          }}
        >
          <div
            className={`absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ${
              variant === "primary"
                ? "bg-gradient-to-r from-primary/20 to-blue-500/20"
                : "bg-gradient-to-r from-muted/20 to-accent/20"
            }`}
          ></div>
          <span className="absolute inset-0 flex items-center justify-center gap-1 watch:gap-0.5 mobile:gap-1.5 sm:gap-2 text-xs watch:text-[0.6rem] mobile:text-sm group-hover:gap-2 watch:group-hover:gap-1 mobile:group-hover:gap-2 sm:group-hover:gap-3 transition-all duration-300">
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
              className={`w-3 h-3 watch:w-2 watch:h-2 mobile:w-3.5 mobile:h-3.5 sm:w-4 sm:h-4 ${
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
    <button className="group relative p-2 watch:p-1 mobile:p-2.5 sm:p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div
        className="relative rounded-xl p-1.5 watch:p-1 mobile:p-2 flex items-center justify-center border border-border group-hover:border-primary/50 transition-all duration-300"
        style={{ background: "rgba(255, 255, 255, 0.02)" }}
      >
        <Icon className="w-4 h-4 watch:w-3 watch:h-3 mobile:w-4 mobile:h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </button>
  </a>
));

SocialLink.displayName = "SocialLink";

const Home: React.FC = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

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
      className="min-h-screen overflow-hidden px-[3%] watch:px-[2%] mobile:px-[4%] sm:px-[5%] lg:px-[10%] content-layer relative pt-safe-top pb-safe-bottom"
      id="Home"
      style={{ background: "transparent" }}
    >
      <div
        className={`relative z-10 transition-all duration-1000 content-layer ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "transparent" }}
      >
        <div
          className="container mx-auto min-h-screen content-layer"
          style={{ background: "transparent" }}
        >
          <div
            className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-4 watch:gap-2 mobile:gap-6 sm:gap-8 lg:gap-20 content-layer"
            style={{ background: "transparent" }}
          >
            {/* Left Column */}
            <div
              className="w-full lg:w-1/2 space-y-3 watch:space-y-2 mobile:space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1 content-layer"
              style={{ background: "transparent" }}
            >
              <div
                className="space-y-2 watch:space-y-1 mobile:space-y-3 sm:space-y-4 lg:space-y-6 content-layer"
                style={{ background: "transparent" }}
              >
                <StatusBadge />
                <MainTitle />

                {/* Typing Effect */}
                <div
                  className="h-6 watch:h-4 mobile:h-7 sm:h-8 flex items-center justify-center lg:justify-start content-layer"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <span className="text-sm watch:text-xs mobile:text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-light text-center lg:text-left">
                    {text}
                  </span>
                  <span className="w-[2px] watch:w-[1px] mobile:w-[2.5px] sm:w-[3px] h-4 watch:h-3 mobile:h-5 sm:h-6 bg-gradient-to-t from-primary to-blue-500 ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p
                  className="text-xs watch:text-[0.6rem] mobile:text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed font-light content-layer text-center lg:text-left px-2 watch:px-1 mobile:px-0"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  Menciptakan Website Yang Inovatif, Fungsional, dan
                  User-Friendly untuk Solusi Digital.
                </p>

                {/* Tech Stack */}
                <div
                  className="flex flex-wrap gap-1.5 watch:gap-1 mobile:gap-2 sm:gap-3 justify-center lg:justify-start content-layer"
                  data-aos="fade-up"
                  data-aos-delay="500"
                  style={{ background: "transparent" }}
                >
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div
                  className="flex flex-col watch:flex-col mobile:flex-row gap-2 watch:gap-1.5 mobile:gap-3 w-full justify-center lg:justify-start content-layer"
                  data-aos="fade-up"
                  data-aos-delay="600"
                  style={{ background: "transparent" }}
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
                  className="flex gap-2 watch:gap-1 mobile:gap-3 sm:gap-4 justify-center lg:justify-start content-layer"
                  data-aos="fade-up"
                  data-aos-delay="700"
                  style={{ background: "transparent" }}
                >
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Lottie Animation */}
            <div
              className="w-full py-[5%] watch:py-[3%] mobile:py-[8%] sm:py-[10%] lg:py-0 lg:w-1/2 h-48 watch:h-32 mobile:h-64 sm:h-80 lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-1 lg:order-2 content-layer"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="400"
              style={{ background: "transparent" }}
            >
              <div
                className="relative w-full opacity-90 content-layer"
                style={{ background: "transparent" }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl watch:rounded-lg mobile:rounded-3xl blur-2xl watch:blur-lg mobile:blur-3xl transition-all duration-700 ease-in-out ${
                    isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
                  }`}
                ></div>

                <div
                  className={`relative lg:left-12 z-10 w-full opacity-90 transform transition-transform duration-500 content-layer ${
                    isHovering ? "scale-105" : "scale-100"
                  }`}
                  style={{ background: "transparent" }}
                >
                  <Lottie
                    animationData={lottieAnimationData}
                    loop={true}
                    autoplay={true}
                    style={{ width: "100%", height: "100%" }}
                    className={`w-full h-full transition-all duration-500 ${
                      isHovering
                        ? "scale-[120%] watch:scale-[110%] mobile:scale-[130%] sm:scale-[160%] md:scale-[150%] lg:scale-[145%] rotate-2"
                        : "scale-[115%] watch:scale-[105%] mobile:scale-[125%] sm:scale-[155%] md:scale-[145%] lg:scale-[140%]"
                    }`}
                  />
                </div>

                <div
                  className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                    isHovering ? "opacity-50" : "opacity-20"
                  }`}
                >
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 watch:w-32 watch:h-32 mobile:w-80 mobile:h-80 sm:w-[400px] sm:h-[400px] bg-gradient-to-br from-primary/10 to-blue-500/10 blur-2xl watch:blur-lg mobile:blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                      isHovering ? "scale-110" : "scale-100"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
