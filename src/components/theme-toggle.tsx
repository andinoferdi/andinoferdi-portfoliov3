"use client"

import * as React from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10 rounded-lg bg-muted/50 animate-pulse" />
  }

  const themes = [
    { name: "light", icon: Sun, label: "Light" },
    { name: "dark", icon: Moon, label: "Dark" },
    { name: "system", icon: Monitor, label: "System" },
  ]

  return (
    <div className="relative group">
      <div className="flex items-center bg-card/50 backdrop-blur-xl rounded-lg border border-border p-1 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
        {themes.map(({ name, icon: Icon, label }) => (
          <button
            key={name}
            onClick={() => setTheme(name)}
            className={`relative p-2 rounded-md transition-all duration-300 ${
              theme === name
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
            title={label}
          >
            <Icon className="w-4 h-4" />

            {/* Active indicator */}
            {theme === name && <div className="absolute inset-0 bg-primary/20 rounded-md animate-pulse" />}
          </button>
        ))}
      </div>

      {/* Tooltip */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Theme: {theme}
      </div>
    </div>
  )
}
