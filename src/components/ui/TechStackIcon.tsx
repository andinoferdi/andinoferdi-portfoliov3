import type React from "react"
import Image from "next/image"

interface TechStackIconProps {
  icon: string
  language: string
}

const TechStackIcon: React.FC<TechStackIconProps> = ({ icon, language }) => {
  return (
    <div className="group p-6 rounded-2xl bg-card/50 hover:bg-card/70 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl border border-border hover:border-primary/50">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
        <Image
          src={icon || "/placeholder.svg"}
          alt={`${language} icon`}
          width={80}
          height={80}
          className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300"
        />
      </div>
      <span className="text-muted-foreground font-semibold text-sm md:text-base tracking-wide group-hover:text-foreground transition-colors duration-300">
        {language}
      </span>
    </div>
  )
}

export default TechStackIcon
