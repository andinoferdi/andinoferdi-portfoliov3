"use client";

import type React from "react";
import { memo, useMemo } from "react";
import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

// Types
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  value: number;
  label: string;
  description: string;
  delay: number;
}

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2 className="text-4xl md:text-5xl font-bold gradient-text">About Me</h2>
    </div>
    <p className="mt-2 text-white/70 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2">
      <Sparkles className="w-5 h-5 text-primary" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-primary" />
    </p>
  </div>
));

Header.displayName = "Header";

const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div className="relative group">
      {/* Optimized gradient backgrounds with reduced complexity for mobile */}
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-cyan-500 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-blue-500 via-cyan-500 to-sky-500 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500 via-blue-500 to-primary rounded-full blur-2xl animate-float opacity-50" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_hsl(var(--primary)/0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-primary/40 group-hover:scale-105" />

          {/* Optimized overlay effects - disabled on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
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
));

ProfileImage.displayName = "ProfileImage";

const StatCard = memo<StatCardProps>(
  ({ icon: Icon, color, value, label, description, delay }) => (
    <div className="relative group" data-aos="fade-up" data-aos-delay={delay}>
      <div
        className="relative z-10 rounded-2xl p-6 border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between"
        style={{ background: "rgba(255, 255, 255, 0.02)" }}
      >
        <div
          className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
        ></div>

        <div className="flex items-center justify-between mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:rotate-6"
            style={{ background: "rgba(255, 255, 255, 0.05)" }}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
          <span className="text-4xl font-bold text-white">{value}</span>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wider text-white/70 mb-2">
            {label}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-white/70">{description}</p>
            <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  )
);

StatCard.displayName = "StatCard";

const AboutSection: React.FC = () => {
  // Memoized calculations - using mock data since we removed backend
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const startDate = new Date("2021-11-06");
    const today = new Date();
    const experience =
      today.getFullYear() -
      startDate.getFullYear() -
      (today <
      new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate())
        ? 1
        : 0);

    return {
      totalProjects: 12, // Mock data
      totalCertificates: 8, // Mock data
      YearExperience: experience,
    };
  }, []);

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
    [totalProjects, totalCertificates, YearExperience]
  );

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] bg-transparent"
      id="About"
    >
      <Header />

      <div className="w-full mx-auto relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="gradient-text">Hello, I&apos;m</span>
              <span className="block mt-2 text-white">Eki Zulfar Rachman</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-white/70 leading-relaxed text-justify pb-4 sm:pb-0">
              Seorang lulusan Teknik Jaringan Komputer dan Telekomunikasi yang
              memiliki ketertarikan besar dalam pengembangan Front-End. Saya
              berfokus pada menciptakan pengalaman digital yang menarik dan
              selalu berusaha memberikan solusi terbaik dalam setiap proyek yang
              saya kerjakan.
            </p>

            {/* Quote Section */}
            <div
              className="relative rounded-2xl p-4 my-6 shadow-2xl overflow-hidden"
              style={{
                background: "rgba(59, 130, 246, 0.02)",
                border: "1px solid rgba(59, 130, 246, 0.1)",
              }}
            >
              {/* Floating orbs background */}
              <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-2 w-12 h-12 bg-gradient-to-r from-blue-500/20 to-primary/20 rounded-full blur-lg"></div>

              {/* Quote icon */}
              <div className="absolute top-3 left-4 text-primary opacity-30">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>

              <blockquote className="text-white/70 text-center lg:text-left italic font-medium text-sm relative z-10 pl-6">
                &quot;Leveraging AI as a professional tool, not a
                replacement.&quot;
              </blockquote>
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
              <a
                href="https://drive.google.com/drive/folders/1BOm51Grsabb3zj6Xk27K-iRwI1zITcpo"
                className="w-full lg:w-auto"
              >
                <button className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-primary to-blue-500 text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
                </button>
              </a>
              <a href="#Portfolio" className="w-full lg:w-auto">
                <button
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-primary/50 text-primary font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2"
                  style={{ background: "rgba(59, 130, 246, 0.05)" }}
                >
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Portfolio
                </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        <a href="#Portfolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>
    </div>
  );
};

export default memo(AboutSection);
