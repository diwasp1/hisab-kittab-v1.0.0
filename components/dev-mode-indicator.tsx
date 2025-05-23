"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export function DevModeIndicator() {
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    // Only show in development or non-HTTPS environments
    const isSecureContext =
      window.location.protocol === "https:" ||
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.endsWith(".local")

    const isDevelopment = process.env.NODE_ENV === "development"

    if (!isSecureContext && !isDevelopment) {
      setShowIndicator(true)
    }
  }, [])

  if (!showIndicator) {
    return null
  }

  return (
    <Card className="fixed top-4 left-4 right-4 z-50 border-orange-200 bg-orange-50 shadow-lg">
      <CardContent className="p-3">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <div>
            <p className="text-xs font-medium text-orange-800">Development Mode</p>
            <p className="text-xs text-orange-700">PWA features require HTTPS in production</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
