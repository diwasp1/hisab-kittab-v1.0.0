"use client"

import { useEffect } from "react"

export function ServiceWorkerRegistration() {
  useEffect(() => {
    // Only register service worker in production or on localhost
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Check if we're on HTTPS or localhost
      const isSecureContext =
        window.location.protocol === "https:" ||
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname.endsWith(".local")

      if (!isSecureContext) {
        console.log("Service Worker not registered: Requires HTTPS or localhost")
        return
      }

      navigator.serviceWorker
        .register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        })
        .then((registration) => {
          console.log("Service Worker registered successfully:", registration)

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  // New content is available, show update notification
                  if (confirm("New version available! Reload to update?")) {
                    window.location.reload()
                  }
                }
              })
            }
          })

          // Check for updates periodically
          setInterval(() => {
            registration.update()
          }, 60000) // Check every minute
        })
        .catch((error) => {
          if (error.message.includes("insecure")) {
            console.log("Service Worker requires HTTPS. PWA features will be limited.")
          } else {
            console.error("Service Worker registration failed:", error)
          }
        })

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data && event.data.type === "CACHE_UPDATED") {
          console.log("Cache updated")
        }
      })
    }
  }, [])

  return null
}
