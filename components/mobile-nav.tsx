"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CreditCard, Users, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AddTransactionDialog } from "@/components/ui-components"
import { useDemoMode } from "@/contexts/demo-context"

export function MobileNav() {
  const pathname = usePathname()
  const { contacts, settings } = useDemoMode()
  const currencySymbol = settings.currency.symbol

  // Function to handle navigation with scroll to top
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If we're already on the same page, scroll to top
    if (pathname === href) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-50">
      <div className="flex items-center justify-around h-16">
        <Link href="/dashboard" className="flex-1" onClick={(e) => handleNavigation(e, "/dashboard")}>
          <div
            className={cn(
              "flex flex-col items-center justify-center h-full",
              pathname === "/dashboard" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </div>
        </Link>

        <Link href="/transactions" className="flex-1" onClick={(e) => handleNavigation(e, "/transactions")}>
          <div
            className={cn(
              "flex flex-col items-center justify-center h-full",
              pathname === "/transactions" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <CreditCard className="h-5 w-5" />
            <span className="text-xs mt-1">Transactions</span>
          </div>
        </Link>

        <div className="flex-1 flex items-center justify-center">
          <AddTransactionDialog contacts={contacts}>
            <Button className="h-12 w-12 rounded-full p-0 shadow-lg bg-primary hover:bg-primary/90">
              <span className="text-xl font-semibold">{currencySymbol}</span>
            </Button>
          </AddTransactionDialog>
        </div>

        <Link href="/contacts" className="flex-1" onClick={(e) => handleNavigation(e, "/contacts")}>
          <div
            className={cn(
              "flex flex-col items-center justify-center h-full",
              pathname === "/contacts" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Users className="h-5 w-5" />
            <span className="text-xs mt-1">Contacts</span>
          </div>
        </Link>

        <Link href="/user" className="flex-1" onClick={(e) => handleNavigation(e, "/user")}>
          <div
            className={cn(
              "flex flex-col items-center justify-center h-full",
              pathname === "/user" || pathname === "/profile" || pathname === "/settings"
                ? "text-primary"
                : "text-muted-foreground",
            )}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
