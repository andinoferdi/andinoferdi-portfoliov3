"use client";

import type React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "#Home", label: "Home" },
  { href: "#About", label: "About" },
  { href: "#Portfolio", label: "Portfolio" },
  { href: "#Contact", label: "Contact" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const lastScrollY = useRef(0);
  const [activeSection, setActiveSection] = useState("Home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollY.current = currentScrollY;
    }

    setScrolled(currentScrollY > 20);

    const sections = navItems
      .map((item) => {
        const section = document.querySelector(item.href);
        if (section) {
          const rect = section.getBoundingClientRect();
          return {
            id: item.href.replace("#", ""),
            offset: rect.top + window.scrollY,
            height: rect.height,
            isVisible: rect.top <= 200 && rect.bottom >= 200,
          };
        }
        return null;
      })
      .filter(Boolean);

    const visibleSection = sections.find(
      (section) => section && section.isVisible
    );
    if (visibleSection) {
      setActiveSection(visibleSection.id);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [mounted, handleScroll]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  const getNavbarClasses = () => {
    let classes = "fixed w-full top-0 z-50 navbar-container";

    if (isOpen) {
      classes += " navbar-open";
    } else if (scrolled) {
      if (scrollDirection === "down") {
        classes += " navbar-hidden";
      } else {
        classes += " navbar-visible navbar-scrolled";
      }
    } else {
      classes += " navbar-transparent";
    }

    return classes;
  };

  if (!mounted) {
    return (
      <nav className="fixed w-full top-0 z-50 navbar-container navbar-transparent">
        <div className="mx-auto px-[5%] sm:px-[5%] lg:px-[10%]">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a
                href="#Home"
                className="text-xl font-bold gradient-text logo-hover"
              >
                Ekizr
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={getNavbarClasses()}>
      <div className="mx-auto px-[5%] sm:px-[5%] lg:px-[10%]">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#Home"
              onClick={(e) => scrollToSection(e, "#Home")}
              className="text-xl font-bold gradient-text logo-hover"
            >
              Ekizr
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="group relative px-3 py-2 text-sm font-medium nav-link"
              >
                <span
                  className={`relative z-10 nav-text ${
                    activeSection === item.href.substring(1)
                      ? "nav-text-active"
                      : "nav-text-inactive"
                  }`}
                >
                  {item.label}
                </span>

                {/* Active indicator */}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-blue-500 nav-indicator ${
                    activeSection === item.href.substring(1)
                      ? "nav-indicator-active"
                      : "nav-indicator-inactive"
                  }`}
                />

                {/* Hover background */}
                <span className="absolute inset-0 bg-primary/5 rounded-lg nav-hover-bg" />
              </a>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="mobile-menu-btn"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mobile-menu ${
          isOpen ? "mobile-menu-open" : "mobile-menu-closed"
        }`}
      >
        <div className="px-4 py-6 space-y-4 mobile-menu-content">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={`block px-4 py-3 text-lg font-medium mobile-nav-link ${
                activeSection === item.href.substring(1)
                  ? "mobile-nav-link-active"
                  : "mobile-nav-link-inactive"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
