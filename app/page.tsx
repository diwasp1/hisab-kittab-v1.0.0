"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDemoMode } from "@/contexts/demo-context"

export default function Home() {
  const router = useRouter()
  const { isDemoMode } = useDemoMode()

  useEffect(() => {
    if (isDemoMode) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }, [router, isDemoMode])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Loading...</p>
    </div>
  )
}
