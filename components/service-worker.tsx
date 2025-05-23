"use client"

import { useEffect } from "react"

export function ServiceWorker() {
  useEffect(() => {
    const registerSW = async () => {
      // Only register SW in production and if supported
      if (
        typeof window !== "undefined" &&
        "serviceWorker" in navigator &&
        process.env.NODE_ENV === "production"
      ) {
        try {
          // Wait for the window to load
          await new Promise((resolve) => {
            if (document.readyState === "complete") {
              resolve(undefined)
            } else {
              window.addEventListener("load", resolve)
            }
          })

          // Register the service worker
          const registration = await navigator.serviceWorker.register("/sw.js")
          console.log("SW registered:", registration)

          // Handle updates
          if (registration.waiting) {
            // New content is available, but waiting
            notifyUserOfUpdate()
          }

          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing
            if (!newWorker) return

            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                notifyUserOfUpdate()
              }
            })
          })

        } catch (error) {
          console.error("SW registration failed:", error)
        }
      }
    }

    const notifyUserOfUpdate = () => {
      const shouldUpdate = window.confirm(
        "New version available! Would you like to update?"
      )
      if (shouldUpdate) {
        window.location.reload()
      }
    }

    registerSW()

    // Cleanup function
    return () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister()
        })
      }
    }
  }, [])

  // This component doesn't render anything
  return null
}
