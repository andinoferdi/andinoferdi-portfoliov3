"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useEffect } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  useEffect(() => {
    // Add class to disable transitions during theme change
    const handleThemeChange = () => {
      document.documentElement.classList.add("theme-transition-disable")

      // Re-enable transitions after theme change is complete
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transition-disable")
      }, 100)
    }

    // Listen for theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", handleThemeChange)

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange)
    }
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
