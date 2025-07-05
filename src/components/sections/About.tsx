"use client"

import type React from "react"
import { memo, useMemo } from "react"
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles } from "lucide-react"
import Image from "next/image"

// Types
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>
  color: string
  value: number
  label: string
  description: string
  delay: number
}

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]" data-aos="fade-up">
    <div className="inline-block relative group">
      <h2 className="text-4xl md:text-5xl font-bold gradient-text">About Me</h2>
    </div>
    <p
      className="mt-2 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <Sparkles className="w-5 h-5 text-primary" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-primary" />
    </p>
  </div>
))

Header.displayName = "Header"

const ProfileImage = memo(() => (
  <div
    className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2"
    data-aos="zoom-in"
    data-aos-delay="300"
  >
    <div className="relative group">
      {/* Optimized gradient backgrounds with reduced complexity for mobile */}
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-cyan-500 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-blue-500 via-cyan-500 to-sky-500 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500 via-blue-500 to-primary rounded-full blur-2xl animate-float opacity-50" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_hsl(var(--primary)/0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-border rounded-full z-20 transition-all duration-700 group-hover:border-primary/40 group-hover:scale-105" />

          {/* Optimized overlay effects - disabled on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />

          <Image
            src="/Photo.jpg"
            alt="Profile"
            width={320}
            height={320}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            priority
          />

          {/* Advanced hover effects - desktop only */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
))

ProfileImage.displayName = "ProfileImage"

const StatCard = memo<StatCardProps>(({ icon: Icon, color, value, label, description, delay }) => (
  <div className="relative group" data-aos="fade-up" data-aos-delay={delay}>
    <div className="relative z-10 bg-card/50 backdrop-blur-lg rounded-2xl p-6 border border-border overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
      <div
        className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
      ></div>

      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-muted/50 transition-transform group-hover:rotate-6">
          <Icon className="w-8 h-8 text-foreground" />
        </div>
        <span className="text-4xl font-bold text-foreground">{value}</span>
      </div>

      <div>
        <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">{label}</p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{description}</p>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </div>
    </div>
  </div>
))

StatCard.displayName = "StatCard"

const AboutPage: React.FC = () => {
  // Memoized calculations - using mock data since we removed backend
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const startDate = new Date("2021-11-06")
    const today = new Date()
    const experience =
      today.getFullYear() -
      startDate.getFullYear() -
      (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0)

    return {
      totalProjects: 12, // Mock data
      totalCertificates: 8, // Mock data
      YearExperience: experience,
    }
  }, [])

  // Memoized stats data
  const statsData = useMemo(
    () => [
      {
        icon: Code,
        color: "from-primary to-blue-500",
        value: totalProjects,
        label: "Total Projects",
        description: "Innovative web solutions crafted",
        delay: 400,
      },
      {
        icon: Award,
        color: "from-blue-500 to-primary",
        value: totalCertificates,
        label: "Certificates",
        description: "Professional skills validated",
        delay: 500,
      },
      {
        icon: Globe,
        color: "from-primary to-cyan-500",
        value: YearExperience,
        label: "Years of Experience",
        description: "Continuous learning journey",
        delay: 600,
      },
    ],
    [totalProjects, totalCertificates, YearExperience],
  )

  return (
    <div
      className="h-auto pb-[10%] text-foreground overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0"
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left" data-aos="fade-right" data-aos-delay="200">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="gradient-text">Hello, I&apos;m</span>
              <span className="block mt-2 text-foreground">Eki Zulfar Rachman</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed text-justify pb-4 sm:pb-0">
              Seorang lulusan Teknik Jaringan Komputer dan Telekomunikasi yang memiliki ketertarikan besar dalam
              pengembangan Front-End. Saya berfokus pada menciptakan pengalaman digital yang menarik dan selalu berusaha
              memberikan solusi terbaik dalam setiap proyek yang saya kerjakan.
            </p>

            {/* Quote Section */}
            <div
              className="relative bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 border border-border rounded-2xl p-4 my-6 backdrop-blur-md shadow-2xl overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {/* Floating orbs background */}
              <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-2 w-12 h-12 bg-gradient-to-r from-blue-500/20 to-primary/20 rounded-full blur-lg"></div>

              {/* Quote icon */}
              <div className="absolute top-3 left-4 text-primary opacity-30">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>

              <blockquote className="text-muted-foreground text-center lg:text-left italic font-medium text-sm relative z-10 pl-6">
                &quot;Leveraging AI as a professional tool, not a replacement.&quot;
              </blockquote>
            </div>

            <div
              className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <a
                href="https://drive.google.com/drive/folders/1BOm51Grsabb3zj6Xk27K-iRwI1zITcpo"
                className="w-full lg:w-auto"
              >
                <button className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-primary to-blue-500 text-primary-foreground font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
                </button>
              </a>
              <a href="#Portfolio" className="w-full lg:w-auto">
                <button className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-primary/50 text-primary font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-primary/10">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Portfolio
                </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        <a href="#Portfolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
            {statsData.map((stat, index) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>
    </div>
  )
}

export default memo(AboutPage)
