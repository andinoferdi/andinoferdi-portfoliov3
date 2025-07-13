"use client"

import type React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="px-[5%] sm:px-[5%] lg:px-[10%] pb-8 relative" style={{ background: "transparent", zIndex: 1 }}>
      <div className="text-center pt-8 border-t border-border/10" style={{ background: "transparent" }}>
        <span className="text-sm text-muted-foreground" style={{ background: "transparent" }}>
          © 2025{" "}
          <a
            href="https://eki.my.id/"
            className="hover:underline text-primary transition-colors"
            style={{ background: "transparent" }}
          >
            EkiZR™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
