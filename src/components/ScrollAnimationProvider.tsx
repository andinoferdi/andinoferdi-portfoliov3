"use client"

import type React from "react"
import { useEffect, useRef } from "react"

export default function ScrollAnimationProvider({ children }: { children: React.ReactNode }) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    if (isInitialized.current) return

    // Initialize scroll animations
    const initializeAnimations = () => {
      // Create intersection observer
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const element = entry.target as HTMLElement

            if (entry.isIntersecting) {
              // Add animation class
              element.classList.add("scroll-animate")

              // Get animation type from data attribute
              const animationType = element.getAttribute("data-aos") || "fade-up"
              element.classList.add(`animate-${animationType}`)

              // Remove from observer if once is true (default)
              const once = element.getAttribute("data-aos-once") !== "false"
              if (once) {
                observerRef.current?.unobserve(element)
              }
            } else {
              // Remove animation if not once
              const once = element.getAttribute("data-aos-once") !== "false"
              if (!once) {
                element.classList.remove("scroll-animate")
                const animationType = element.getAttribute("data-aos") || "fade-up"
                element.classList.remove(`animate-${animationType}`)
              }
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: "50px",
        },
      )

      // Observe all elements with data-aos attribute
      const animatedElements = document.querySelectorAll("[data-aos]")
      animatedElements.forEach((element) => {
        // Set initial state
        const htmlElement = element as HTMLElement
        htmlElement.classList.add("scroll-element")

        // Observe element
        observerRef.current?.observe(element)
      })
    }

    // Initialize on DOM ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initializeAnimations)
    } else {
      initializeAnimations()
    }

    isInitialized.current = true

    // Mutation observer for dynamically added elements
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element

            // Check if the element itself has data-aos
            if (element.hasAttribute("data-aos")) {
              element.classList.add("scroll-element")
              observerRef.current?.observe(element)
            }

            // Check for child elements with data-aos
            const childElements = element.querySelectorAll("[data-aos]")
            childElements.forEach((childElement) => {
              childElement.classList.add("scroll-element")
              observerRef.current?.observe(childElement)
            })
          }
        })
      })
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observerRef.current?.disconnect()
      mutationObserver.disconnect()
      document.removeEventListener("DOMContentLoaded", initializeAnimations)
    }
  }, [])

  return <>{children}</>
}
