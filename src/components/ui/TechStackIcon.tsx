"use client";

import Image from "next/image";

interface TechStackIconProps {
  icon: string;
  language: string;
}

const TechStackIcon: React.FC<TechStackIconProps> = ({ icon, language }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/30 bg-background/5 hover:border-primary/30 transition-all duration-300 group">
      <div className="relative w-12 h-12 mb-2 transition-transform duration-300 group-hover:scale-110">
        <Image src={icon} alt={language} fill className="object-contain" />
      </div>
      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
        {language}
      </span>
    </div>
  );
};

export default TechStackIcon;
