"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, X, Shield } from "lucide-react"
import { AppLogo } from "@/components/app-logo"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showHttpsWarning, setShowHttpsWarning] = useState(false)

  useEffect(() => {
    // Check if we're on HTTPS or localhost
    const isSecureContext =
      window.location.protocol === "https:" ||
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.endsWith(".local")

    if (!isSecureContext) {
      setShowHttpsWarning(true)
      return
    }

    // Check if app is already installed
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
    const isInWebAppiOS = (window.navigator as any).standalone === true

    if (isStandalone || isInWebAppiOS) {
      setIsInstalled(true)
      return
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallPrompt(true)
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        setShowInstallPrompt(false)
      }
    } catch (error) {
      console.error("Install prompt failed:", error)
    }

    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    setShowHttpsWarning(false)
    // Remember user dismissed the prompt
    localStorage.setItem("pwa-install-dismissed", "true")
  }

  // Show HTTPS warning if not secure
  if (showHttpsWarning) {
    return (
      <Card className="fixed bottom-20 left-4 right-4 z-50 border-orange-200 bg-orange-50 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-orange-800">HTTPS Required</h3>
                <p className="text-xs text-orange-700">PWA features require HTTPS for security</p>
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={handleDismiss} className="h-8 w-8 p-0">
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Don't show if already installed or user dismissed
  if (isInstalled || !showInstallPrompt) {
    return null
  }

  // Check if user previously dismissed
  if (typeof window !== "undefined" && localStorage.getItem("pwa-install-dismissed")) {
    return null
  }

  return (
    <Card className="fixed bottom-20 left-4 right-4 z-50 border-primary shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AppLogo size="sm" className="w-10 h-10" />
            <div>
              <h3 className="font-semibold text-sm">Install Hisab Kittab</h3>
              <p className="text-xs text-muted-foreground">Get quick access from your home screen</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" onClick={handleInstallClick} className="h-8">
              <Download className="h-3 w-3 mr-1" />
              Install
            </Button>
            <Button size="sm" variant="ghost" onClick={handleDismiss} className="h-8 w-8 p-0">
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
