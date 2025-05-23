"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { useDemoMode } from "@/contexts/demo-context"
import { DollarSign, Users, ArrowUp, ArrowDown } from "lucide-react"

export function DashboardCharts() {
  const { balances, formatAmount, contacts } = useDemoMode()

  // Calculate totals
  const totalGave = balances.reduce((sum, balance) => sum + balance.gave, 0)
  const totalTook = balances.reduce((sum, balance) => sum + balance.took, 0)
  const netBalance = totalGave - totalTook

  // Count people who owe you and people you owe
  const peopleWhoOweYou = balances.filter((balance) => balance.net > 0).length
  const peopleYouOwe = balances.filter((balance) => balance.net < 0).length

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Financial Overview</h2>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
        {/* Net Balance Card */}
        <Card className="overflow-hidden border-none shadow-lg transition-all hover:shadow-xl">
          <div className="h-1.5 bg-gradient-to-r from-green-500 to-green-400 w-full"></div>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-5">
              <h3 className="text-sm sm:text-base font-medium text-gray-600">Net Balance</h3>
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              </div>
            </div>

            <div className="flex items-baseline mb-4 sm:mb-6">
              <span className={`text-2xl sm:text-3xl font-bold ${netBalance >= 0 ? "text-green-600" : "text-red-500"}`}>
                {netBalance >= 0 ? "+" : ""}
                {formatAmount(netBalance)}
              </span>
              <span className="text-gray-500 ml-2 text-xs sm:text-sm hidden sm:inline">in your favor</span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <Link href="/receivables">
                <div className="bg-green-50 rounded-xl p-2 sm:p-3 transition-all hover:bg-green-100 cursor-pointer">
                  <div className="flex items-center text-green-600 mb-1">
                    <ArrowUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                    <span className="text-xs font-medium">Given</span>
                  </div>
                  <span className="text-sm sm:text-lg font-bold text-green-600">{formatAmount(totalGave)}</span>
                </div>
              </Link>

              <Link href="/payables">
                <div className="bg-red-50 rounded-xl p-2 sm:p-3 transition-all hover:bg-red-100 cursor-pointer">
                  <div className="flex items-center text-red-500 mb-1">
                    <ArrowDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                    <span className="text-xs font-medium">Received</span>
                  </div>
                  <span className="text-sm sm:text-lg font-bold text-red-500">{formatAmount(totalTook)}</span>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* People Summary Card */}
        <Card className="overflow-hidden border-none shadow-lg transition-all hover:shadow-xl">
          <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-400 w-full"></div>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-5">
              <h3 className="text-sm sm:text-base font-medium text-gray-600">People Summary</h3>
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              </div>
            </div>

            <div className="flex items-baseline mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl font-bold text-gray-800">{contacts.length}</span>
              <span className="text-gray-500 ml-2 text-xs sm:text-sm hidden sm:inline">total contacts</span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <Link href="/receivables">
                <div className="bg-green-50 rounded-xl p-2 sm:p-3 transition-all hover:bg-green-100 cursor-pointer">
                  <div className="flex items-center text-green-600 mb-1">
                    <ArrowUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                    <span className="text-xs font-medium">Owe You</span>
                  </div>
                  <span className="text-sm sm:text-lg font-bold text-green-600">{peopleWhoOweYou}</span>
                </div>
              </Link>

              <Link href="/payables">
                <div className="bg-red-50 rounded-xl p-2 sm:p-3 transition-all hover:bg-red-100 cursor-pointer">
                  <div className="flex items-center text-red-500 mb-1">
                    <ArrowDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                    <span className="text-xs font-medium">You Owe</span>
                  </div>
                  <span className="text-sm sm:text-lg font-bold text-red-500">{peopleYouOwe}</span>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
