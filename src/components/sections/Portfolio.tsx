"use client"

import type React from "react"
import { useState, useCallback, useMemo } from "react"
import { Code, Award, Boxes } from "lucide-react"
import CardProject from "@/components/ui/CardProject"
import TechStackIcon from "@/components/ui/TechStackIcon"
import Certificate from "@/components/ui/Certificate"

// Types
interface Project {
  id: number
  title: string
  description: string
  image: string
  link: string
  github?: string
  techStack?: string[]
  features?: string[]
}

interface CertificateType {
  id: number
  title: string
  image: string
  issuer: string
  date: string
}

interface TechStack {
  icon: string
  language: string
}

interface ToggleButtonProps {
  onClick: () => void
  isShowingMore: boolean
}

interface TabButtonProps {
  active: boolean
  onClick: () => void
  icon: React.ComponentType<{ className?: string }>
  label: string
}

// Mock Data (replacing Supabase data)
const mockProjects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern e-commerce platform built with Next.js and TypeScript",
    image: "/placeholder.svg?height=300&width=400",
    link: "https://example.com",
    github: "https://github.com/EkiZR",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: ["Responsive Design", "Payment Integration", "Admin Dashboard"],
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates",
    image: "/placeholder.svg?height=300&width=400",
    link: "https://example.com",
    github: "https://github.com/EkiZR",
    techStack: ["React", "Node.js", "MongoDB"],
    features: ["Real-time Updates", "Team Collaboration", "File Sharing"],
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Beautiful weather dashboard with location-based forecasts",
    image: "/placeholder.svg?height=300&width=400",
    link: "https://example.com",
    github: "https://github.com/EkiZR",
    techStack: ["React", "API Integration", "Chart.js"],
    features: ["Location Detection", "7-day Forecast", "Interactive Charts"],
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Personal portfolio website showcasing projects and skills",
    image: "/placeholder.svg?height=300&width=400",
    link: "https://eki.my.id",
    github: "https://github.com/EkiZR",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS"],
    features: ["Smooth Animations", "Responsive Design", "Contact Form"],
  },
  {
    id: 5,
    title: "Blog Platform",
    description: "Full-stack blog platform with content management system",
    image: "/placeholder.svg?height=300&width=400",
    link: "https://example.com",
    github: "https://github.com/EkiZR",
    techStack: ["Next.js", "Prisma", "PostgreSQL"],
    features: ["Content Management", "SEO Optimized", "Comment System"],
  },
  {
    id: 6,
    title: "Chat Application",
    description: "Real-time chat application with multiple room support",
    image: "/placeholder.svg?height=300&width=400",
    link: "https://example.com",
    github: "https://github.com/EkiZR",
    techStack: ["React", "Socket.io", "Express"],
    features: ["Real-time Messaging", "Multiple Rooms", "File Sharing"],
  },
]

const mockCertificates: CertificateType[] = [
  {
    id: 1,
    title: "React Developer Certification",
    image: "/placeholder.svg?height=400&width=600",
    issuer: "Meta",
    date: "2023",
  },
  {
    id: 2,
    title: "JavaScript Algorithms and Data Structures",
    image: "/placeholder.svg?height=400&width=600",
    issuer: "freeCodeCamp",
    date: "2023",
  },
  {
    id: 3,
    title: "Frontend Web Development",
    image: "/placeholder.svg?height=400&width=600",
    issuer: "Coursera",
    date: "2022",
  },
  {
    id: 4,
    title: "Node.js Developer Certification",
    image: "/placeholder.svg?height=400&width=600",
    issuer: "OpenJS Foundation",
    date: "2023",
  },
  {
    id: 5,
    title: "TypeScript Fundamentals",
    image: "/placeholder.svg?height=400&width=600",
    issuer: "Microsoft",
    date: "2023",
  },
  {
    id: 6,
    title: "Web Performance Optimization",
    image: "/placeholder.svg?height=400&width=600",
    issuer: "Google",
    date: "2023",
  },
]

const techStacks: TechStack[] = [
  { icon: "/html.png", language: "HTML" },
  { icon: "/css.png", language: "CSS" },
  { icon: "/javascript.png", language: "JavaScript" },
  { icon: "/tailwind.svg", language: "Tailwind CSS" },
  { icon: "/reactjs.svg", language: "ReactJS" },
  { icon: "/nextjs.svg", language: "Next.js" },
  { icon: "/nodejs.svg", language: "Node.js" },
  { icon: "/typescript.svg", language: "TypeScript" },
  { icon: "/firebase.svg", language: "Firebase" },
  { icon: "/mongodb.svg", language: "MongoDB" },
  { icon: "/vercel.svg", language: "Vercel" },
  { icon: "/git.svg", language: "Git" },
]

// Components
const ToggleButton: React.FC<ToggleButtonProps> = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 text-muted-foreground hover:text-foreground text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-card/50 hover:bg-card/70 rounded-md border border-border hover:border-primary/50 backdrop-blur-sm group relative overflow-hidden"
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${
          isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"
        }`}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
)

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex-1 flex flex-col items-center gap-2 py-4 px-6 rounded-xl transition-all duration-300 ${
      active
        ? "bg-gradient-to-br from-primary/20 to-blue-500/20 text-foreground border border-primary/30"
        : "bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card/70 border border-border"
    }`}
  >
    <Icon className={`w-5 h-5 transition-all duration-300 ${active ? "text-primary scale-110" : ""}`} />
    <span className="text-sm font-medium">{label}</span>
  </button>
)

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"projects" | "certificates" | "techstack">("projects")
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [showAllCertificates, setShowAllCertificates] = useState(false)

  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false
  const initialItems = isMobile ? 4 : 6

  const toggleShowMore = useCallback((type: "projects" | "certificates") => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev)
    } else {
      setShowAllCertificates((prev) => !prev)
    }
  }, [])

  const displayedProjects = useMemo(
    () => (showAllProjects ? mockProjects : mockProjects.slice(0, initialItems)),
    [showAllProjects, initialItems],
  )

  const displayedCertificates = useMemo(
    () => (showAllCertificates ? mockCertificates : mockCertificates.slice(0, initialItems)),
    [showAllCertificates, initialItems],
  )

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-background overflow-hidden" id="Portfolio">
      {/* Header */}
      <div className="text-center pb-10" data-aos="fade-up">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto gradient-text">
          Portfolio Showcase
        </h2>
        <p
          className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base mt-2"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Explore my journey through projects, certifications, and technical expertise. Each section represents a
          milestone in my continuous learning path.
        </p>
      </div>

      {/* Tab Navigation */}
      <div
        className="flex flex-col sm:flex-row gap-4 mb-8 p-2 bg-card/50 backdrop-blur-xl rounded-2xl border border-border"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <TabButton
          active={activeTab === "projects"}
          onClick={() => setActiveTab("projects")}
          icon={Code}
          label="Projects"
        />
        <TabButton
          active={activeTab === "certificates"}
          onClick={() => setActiveTab("certificates")}
          icon={Award}
          label="Certificates"
        />
        <TabButton
          active={activeTab === "techstack"}
          onClick={() => setActiveTab("techstack")}
          icon={Boxes}
          label="Tech Stack"
        />
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
              {displayedProjects.map((project, index) => (
                <div key={project.id} data-aos="fade-up" data-aos-delay={index * 100}>
                  <CardProject
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    link={project.link}
                    github={project.github}
                    techStack={project.techStack}
                  />
                </div>
              ))}
            </div>
            {mockProjects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start" data-aos="fade-up" data-aos-delay="300">
                <ToggleButton onClick={() => toggleShowMore("projects")} isShowingMore={showAllProjects} />
              </div>
            )}
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === "certificates" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {displayedCertificates.map((certificate, index) => (
                <div key={certificate.id} data-aos="zoom-in" data-aos-delay={index * 100}>
                  <Certificate image={certificate.image} title={certificate.title} issuer={certificate.issuer} />
                </div>
              ))}
            </div>
            {mockCertificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start" data-aos="fade-up" data-aos-delay="300">
                <ToggleButton onClick={() => toggleShowMore("certificates")} isShowingMore={showAllCertificates} />
              </div>
            )}
          </div>
        )}

        {/* Tech Stack Tab */}
        {activeTab === "techstack" && (
          <div className="pb-[5%]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
              {techStacks.map((stack, index) => (
                <div key={index} data-aos="flip-left" data-aos-delay={index * 100}>
                  <TechStackIcon icon={stack.icon} language={stack.language} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Portfolio
