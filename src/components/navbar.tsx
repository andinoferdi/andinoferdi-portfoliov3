"use client";

import { cn } from "@/lib/utils";
import {
  IconArrowUp,
  IconBrandGithub,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Logo } from "./svg/logo";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Separator } from "./ui/separator";

interface NavLink {
  title: string;
  href: string;
  isComingSoon?: boolean;
}

interface NavbarProps {
  links?: NavLink[];
  githubUrl?: string;
  logoText?: string;
  disableScrollEffect?: boolean;
}

const defaultLinks: NavLink[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Projects",
    href: "#Portfolio",
  },
  {
    title: "Contact",
    href: "#contact",
    isComingSoon: true,
  },
];

export const Header = ({
  links = defaultLinks,
  githubUrl = "https://github.com/EkiZR",
  logoText = "Eki Portfolio",
  disableScrollEffect = false,
}: NavbarProps = {}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const pathname = usePathname();

  const isDisableHeaderScroll = disableScrollEffect || pathname === "";

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (isDisableHeaderScroll) {
      setIsScrolled(false);
      return;
    }

    if (currentScrollY === 0) {
      setIsScrolled(false);
    } else if (currentScrollY > 50) {
      setIsScrolled(true);
    }

    lastScrollY.current = currentScrollY;
  }, [isDisableHeaderScroll]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, isDisableHeaderScroll]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out pt-0 pb-3">
        <div className="container mx-auto px-6 lg:px-10">
          <div
            className={cn(
              "relative overflow-hidden transition-all duration-500 ease-in-out rounded-2xl",
              isScrolled
                ? "bg-black/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                : "bg-transparent"
            )}
          >
            {/* Gradient overlay */}
            {isScrolled && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-blue-500/5 to-primary/5 opacity-50" />
            )}

            {/* Glow effect */}
            {isScrolled && (
              <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-primary/5 to-blue-500/5 blur-lg transition-opacity duration-500" />
            )}

            <div className="relative z-10 flex justify-between items-center px-6 lg:px-8 py-4 lg:py-5">
              {/* Logo Section */}
              <div className="flex items-center gap-4">
                <div className="relative group flex items-center justify-center">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300" />
                  <div className="relative flex items-center justify-center">
                    <Logo className="size-11 lg:size-14 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg lg:text-xl font-semibold gradient-text leading-none">
                    {logoText}
                  </h1>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div
                className={cn(
                  "hidden lg:flex items-center gap-1 rounded-xl py-1.5 px-1.5",
                  isScrolled
                    ? "bg-white/5 backdrop-blur-sm"
                    : "bg-black/20 backdrop-blur-lg"
                )}
              >
                {links.map((link) => (
                  <HeaderLink
                    key={link.title}
                    title={link.title}
                    href={link.href}
                    isComingSoon={link.isComingSoon}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {/* GitHub Button */}
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
                  <div
                    className={cn(
                      "relative rounded-xl p-3 transition-all duration-300 group-hover:scale-105 flex items-center justify-center",
                      isScrolled
                        ? "bg-white/10 hover:bg-white/20"
                        : "bg-black/20 backdrop-blur-lg hover:bg-white/20"
                    )}
                  >
                    <IconBrandGithub className="w-6 h-6 text-white/70 group-hover:text-primary transition-colors" />
                  </div>
                </a>

                {/* Theme Toggle */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
                  <div className="relative">
                    <ModeToggle />
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                  <DrawerTrigger asChild>
                    <div className="lg:hidden group relative flex items-center">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          "relative rounded-xl transition-all duration-300 group-hover:scale-105 p-3 flex items-center justify-center",
                          isScrolled
                            ? "bg-white/10 hover:bg-white/20"
                            : "bg-black/20 backdrop-blur-lg hover:bg-white/20"
                        )}
                      >
                        <IconMenu2 className="w-6 h-6 text-white/70 group-hover:text-primary transition-colors" />
                        <span className="sr-only">Menu</span>
                      </Button>
                    </div>
                  </DrawerTrigger>

                  {/* Mobile Drawer */}
                  <DrawerContent className="bg-black/90 backdrop-blur-2xl border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-blue-500/5" />

                    <DrawerHeader className="relative z-10 flex justify-between items-center">
                      <DrawerTitle className="flex items-center gap-3">
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-full blur opacity-30" />
                          <Logo className="relative size-12" />
                        </div>
                        <span className="gradient-text text-xl font-semibold">
                          {logoText}
                        </span>
                      </DrawerTitle>

                      <DrawerClose asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-white/10 hover:bg-white/20 border-0 rounded-xl transition-all duration-300 p-3"
                        >
                          <IconX className="w-6 h-6 text-white/70" />
                        </Button>
                      </DrawerClose>
                    </DrawerHeader>

                    <div className="relative z-10 px-6 pb-8 flex flex-col gap-4">
                      {links.map((link, index) => (
                        <div key={link.title} className="space-y-4">
                          <Link
                            href={link.href}
                            className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                            onClick={() => setIsDrawerOpen(false)}
                          >
                            <span className="text-xl font-medium text-white group-hover:text-primary transition-colors">
                              {link.title}
                            </span>
                            {link.isComingSoon && (
                              <span className="px-3 py-1 text-sm bg-primary/20 text-primary rounded-full">
                                Coming Soon
                              </span>
                            )}
                          </Link>
                          {index < links.length - 1 && (
                            <Separator className="bg-white/5" />
                          )}
                        </div>
                      ))}

                      <div className="mt-6 pt-6 border-t border-white/10">
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-blue-500/10 hover:from-primary/20 hover:to-blue-500/20 transition-all duration-300"
                          onClick={() => setIsDrawerOpen(false)}
                        >
                          <IconBrandGithub className="w-6 h-6 text-primary" />
                          <span className="text-lg font-medium text-white">
                            GitHub Profile
                          </span>
                        </a>
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Scroll to Top Button */}
      {!isDisableHeaderScroll && <ScrollToTopButton />}
    </>
  );
};

// Export as Navbar as well for compatibility
export const Navbar = Header;

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-300" />
      <Button
        variant="outline"
        size="icon"
        className="relative bg-black/80 backdrop-blur-xl border-white/20 hover:bg-black/60 rounded-full p-3 transition-all duration-300 group-hover:scale-110 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <IconArrowUp className="w-5 h-5 text-primary" />
      </Button>
    </div>
  );
};

const HeaderLink = ({
  title,
  href,
  isComingSoon,
}: {
  title: string;
  href: string;
  isComingSoon?: boolean;
}) => {
  const pathname = usePathname() || "/";
  const isActive =
    href === pathname ||
    (href !== "/" && pathname.includes(href.replace("#", "")));

  return (
    <Link
      href={href}
      className={cn(
        "relative px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-300 group flex items-center gap-2 min-h-[44px]",
        isActive
          ? "text-white bg-gradient-to-r from-primary/20 to-blue-500/20 shadow-[0_4px_16px_rgba(59,130,246,0.2)]"
          : "text-white/70 hover:text-white hover:bg-white/10"
      )}
    >
      {/* Active indicator */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg blur-sm" />
      )}

      <span className="relative z-10">{title}</span>

      {isComingSoon && (
        <span className="relative z-10 px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
          Soon
        </span>
      )}

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
};
