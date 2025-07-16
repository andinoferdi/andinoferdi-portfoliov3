"use client";

import { Navbar } from "./navbar";

// Navigation links configuration
const navigationLinks = [
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

// Main navbar demo component that will be used in pages
export const NavbarDemo = () => {
  return (
    <Navbar
      links={navigationLinks}
      githubUrl="https://github.com/EkiZR"
      logoText="Eki Portfolio"
      disableScrollEffect={false}
    />
  );
};
