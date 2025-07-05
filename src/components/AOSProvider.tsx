"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

/** Minimal runtime shape of the AOS instance we use */
interface AOSInstance {
  init: (opts?: Record<string, unknown>) => void
  refresh: () => void
}

interface Props {
  children: React.ReactNode
}

export default function AOSProvider({ children }: Props) {
  const aos = useRef<AOSInstance | null>(null)
  const initialized = useRef(false)
  const [, forceRerender] = useState(0) // forces rerender after AOS loads

  /* ────────────────────────────────────────────────────────────
   *  STEP 1:  Lazy-load css (+ JS) once in the browser
   * ──────────────────────────────────────────────────────────── */
  useEffect(() => {
    // Inject CSS only once
    if (!document.querySelector('link[href*="aos.css"]')) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/aos@2.3.4/dist/aos.css"
      document.head.appendChild(link)
    }

    // Dynamically import the JS bundle
    import("aos")
      .then((mod) => {
        aos.current = (mod.default ?? mod) as AOSInstance
        forceRerender((n) => n + 1) // trigger init effect below
      })
      .catch((err) => console.error("Failed to load AOS:", err))
  }, [])

  /* ────────────────────────────────────────────────────────────
   *  STEP 2:  Initialise & keep AOS refreshed
   * ──────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!aos.current || initialized.current) return

    aos.current.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
      delay: 100,
    })
    initialized.current = true

    // Refresh debounced when DOM changes add AOS elements
    const debouncedRefresh = (() => {
      let t: ReturnType<typeof setTimeout>
      return () => {
        clearTimeout(t)
        t = setTimeout(() => aos.current?.refresh(), 120)
      }
    })()

    const observer = new MutationObserver((mutations) => {
      if (
        mutations.some((m) =>
          Array.from(m.addedNodes).some(
            (n) => n.nodeType === 1 && (n as Element).matches?.("[data-aos], [data-aos] *"),
          ),
        )
      ) {
        debouncedRefresh()
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })
    window.addEventListener("popstate", debouncedRefresh)

    return () => {
      observer.disconnect()
      window.removeEventListener("popstate", debouncedRefresh)
    }
  }, [aos.current])

  return <>{children}</>
}
