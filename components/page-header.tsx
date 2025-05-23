"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  showActions?: boolean
  showBackButton?: boolean
  customActions?: ReactNode
}

export function PageHeader({ title, showActions = true, showBackButton = false, customActions }: PageHeaderProps) {
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
    // Ensure we scroll to top after navigation
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
  }

  return (
    <div className="sticky top-0 z-10 bg-white border-b">
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div className="flex items-center min-w-0 flex-1">
          {showBackButton && (
            <Button variant="ghost" size="icon" onClick={handleBackClick} className="mr-2 -ml-2 flex-shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-lg sm:text-xl font-bold truncate">{title}</h1>
        </div>
        {customActions && <div className="flex-shrink-0">{customActions}</div>}
      </div>
    </div>
  )
}
