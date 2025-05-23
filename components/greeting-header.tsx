"use client"

import { useState, useEffect } from "react"
import { useDemoMode } from "@/contexts/demo-context"

function getTimeBasedGreeting(): string {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12) {
    return "Good morning"
  } else if (hour >= 12 && hour < 17) {
    return "Good afternoon"
  } else if (hour >= 17 && hour < 22) {
    return "Good evening"
  } else {
    return "Good night"
  }
}

export function GreetingHeader() {
  const { profile } = useDemoMode()
  const [greeting, setGreeting] = useState("Good morning")

  useEffect(() => {
    // Set initial greeting
    setGreeting(getTimeBasedGreeting())

    // Update greeting every minute
    const interval = setInterval(() => {
      setGreeting(getTimeBasedGreeting())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center bg-gradient-to-r from-green-50 to-blue-50 p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 shadow-sm border border-gray-100">
      <div className="relative h-10 w-10 sm:h-12 sm:w-12 mr-3 sm:mr-4 flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-500 rounded-full shadow-md transform rotate-3 scale-95 opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-500 rounded-full shadow-md flex items-center justify-center">
          <span className="text-white text-base sm:text-lg font-bold">{profile?.full_name?.charAt(0) || "D"}</span>
          <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-white/30 rounded-full"></div>
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <h1 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
          {greeting}, {profile?.full_name?.split(" ")[0] || "Demo"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">Welcome to Hisab Kittab</p>
      </div>
    </div>
  )
}
