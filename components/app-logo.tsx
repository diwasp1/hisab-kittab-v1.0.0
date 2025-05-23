"use client"

import { cn } from "@/lib/utils"

interface AppLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function AppLogo({ size = "md", className }: AppLogoProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  const textSizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-4xl",
  }

  const bookPageSizes = {
    sm: "w-4 h-6",
    md: "w-8 h-12",
    lg: "w-10 h-16",
  }

  return (
    <div className={cn("relative overflow-hidden rounded-xl", sizeClasses[size], className)}>
      {/* Green background */}
      <div className="absolute inset-0 bg-primary rounded-xl shadow-lg flex items-center justify-center">
        {/* Book design */}
        <div className="relative flex items-center justify-center">
          {/* Left page of book (H) */}
          <div className={cn("relative bg-white/90 rounded-l-md transform skew-y-3", bookPageSizes[size])}>
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center font-bold text-primary",
                textSizeClasses[size],
              )}
            >
              H
            </span>
            {/* Page edge details */}
            <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gray-200"></div>
            <div className="absolute left-1 right-1 bottom-1 h-[1px] bg-gray-200"></div>
          </div>

          {/* Book spine */}
          <div className={cn("relative h-full w-1 bg-white/70 z-10 transform -skew-y-6 mx-0.5")}></div>

          {/* Right page of book (K) */}
          <div className={cn("relative bg-white/90 rounded-r-md transform -skew-y-3", bookPageSizes[size])}>
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center font-bold text-primary",
                textSizeClasses[size],
              )}
            >
              K
            </span>
            {/* Page edge details */}
            <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gray-200"></div>
            <div className="absolute left-1 right-1 bottom-1 h-[1px] bg-gray-200"></div>
          </div>

          {/* Book shadow */}
          <div className="absolute -bottom-1 left-0 right-0 h-1 bg-black/10 rounded-full blur-[1px]"></div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1 right-1 w-2 h-2 bg-white/30 rounded-full"></div>
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-white/20 rounded-full"></div>
    </div>
  )
}
