"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { AppLogo } from "@/components/app-logo"

interface FixedHeaderProps {
  title?: string
  showLogo?: boolean
  className?: string
}

export function FixedHeader({ title = "Hisab Kitab", showLogo = true, className }: FixedHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200" : "bg-transparent",
        className,
      )}
    >
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          {showLogo && (
            <div
              className={cn(
                "transition-all duration-300 ease-in-out flex-shrink-0",
                isScrolled ? "scale-75" : "scale-100",
              )}
            >
              <AppLogo size="sm" className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h1
              className={cn(
                "font-bold transition-all duration-300 ease-in-out bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent truncate",
                isScrolled ? "text-base sm:text-lg" : "text-lg sm:text-xl",
              )}
            >
              {title}
            </h1>
            {!isScrolled && (
              <p className="text-xs text-gray-500 transition-opacity duration-300 hidden sm:block">
                Track your money with ease
              </p>
            )}
          </div>
        </div>

        {/* Demo Mode Badge */}
        <div
          className={cn("transition-all duration-300 ease-in-out flex-shrink-0", isScrolled ? "scale-90" : "scale-100")}
        >
          <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full border border-yellow-200">
            <span className="hidden sm:inline">Demo Mode</span>
            <span className="sm:hidden">Demo</span>
          </div>
        </div>
      </div>

      {/* Gradient overlay for smooth transition */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-white/50 to-transparent pointer-events-none transition-opacity duration-300",
          isScrolled ? "opacity-0" : "opacity-100",
        )}
      />
    </div>
  )
}
