import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-zinc-900 dark:text-white"
        />
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
          fill="currentColor"
          className="text-zinc-900 dark:text-white font-mono"
        >
          AF
        </text>
      </svg>
    </div>
  );
};
