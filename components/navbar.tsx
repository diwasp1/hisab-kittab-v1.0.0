"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, Users, Home } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/dashboard" className="font-bold text-xl">
          Hisab Kittab
        </Link>
        <div className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Demo Mode</div>
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link
            href="/transactions"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/transactions" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Transactions</span>
            </div>
          </Link>
          <Link
            href="/contacts"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/contacts" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Contacts</span>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  )
}
