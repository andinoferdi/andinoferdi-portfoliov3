import { StarsBackground } from "@/components/background/stars";
import HeroSection from "@/sections/hero/index";
import AboutSection from "@/sections/about/index";
import Portfolio from "@/sections/portfolio/index";
import { BottomNav } from "@/components/ui/bottomnav";
import MusicPlayer from "@/components/MusicPlayer/music-player";
import {
  IconBrandGithub,
  IconBrandX,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";

export default function Home() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Projects",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#Portfolio",
    },
    {
      title: "About",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#about",
    },
    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://twitter.com/yourusername",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/yourusername",
    },
  ];

  return (
    <StarsBackground>
      <div className="bg-transparent relative">
        <HeroSection />
        <AboutSection />
        <Portfolio />
        <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50">
          <BottomNav items={links} />
        </div>
        <MusicPlayer />
      </div>
    </StarsBackground>
  );
}
