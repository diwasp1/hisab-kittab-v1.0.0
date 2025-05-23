"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, Users, TrendingUp, TrendingDown, Check, RefreshCw } from "lucide-react"
import { useDemoMode } from "@/contexts/demo-context"
import { GreetingHeader } from "@/components/greeting-header"
import { QuickPaymentDialog } from "@/components/quick-payment-dialog"
import { DashboardCharts } from "@/components/dashboard-charts"
import { PWAInstall } from "@/components/pwa-install"
import { DevModeIndicator } from "@/components/dev-mode-indicator"
import { FixedHeader } from "@/components/fixed-header"

export default function DashboardPage() {
  const { balances, formatAmount } = useDemoMode()
  const [activeFilter, setActiveFilter] = useState("all")

  // Ensure we start at the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Separate people based on who owes whom
  const peopleWhoOweYou = balances.filter((balance) => balance.net > 0)
  const peopleYouOwe = balances.filter((balance) => balance.net < 0)
  const settledPeople = balances.filter((balance) => balance.net === 0)

  // Filter balances based on active filter
  const filteredBalances = () => {
    switch (activeFilter) {
      case "theyOwe":
        return peopleWhoOweYou
      case "youOwe":
        return peopleYouOwe
      case "settled":
        return settledPeople
      default:
        return balances
    }
  }

  const displayedBalances = filteredBalances()

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pb-16">
      {/* Dev Mode Indicator */}
      <DevModeIndicator />

      {/* Fixed Header */}
      <FixedHeader />

      {/* Main Content with top padding to account for fixed header */}
      <div className="pt-16 sm:pt-20">
        {/* Content Container */}
        <div className="px-3 sm:px-4 lg:px-6 pt-2 sm:pt-4 bg-white">
          <GreetingHeader />

          {/* Financial Insights */}
          <div className="my-6 sm:my-8">
            <DashboardCharts />
          </div>

          {/* Section Tabs */}
          <div className="mb-6">
            <div className="flex overflow-x-auto pb-2 space-x-2 -mx-1 px-1 scrollbar-hide">
              <Button
                variant="outline"
                className={`whitespace-nowrap rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium shadow-sm flex-shrink-0 ${
                  activeFilter === "all" ? "bg-primary text-white hover:bg-primary/90" : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => setActiveFilter("all")}
              >
                All Contacts
              </Button>
              <Button
                variant="outline"
                className={`whitespace-nowrap rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium shadow-sm flex-shrink-0 ${
                  activeFilter === "theyOwe"
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => setActiveFilter("theyOwe")}
              >
                They Owe You
              </Button>
              <Button
                variant="outline"
                className={`whitespace-nowrap rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium shadow-sm flex-shrink-0 ${
                  activeFilter === "youOwe" ? "bg-primary text-white hover:bg-primary/90" : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => setActiveFilter("youOwe")}
              >
                You Owe
              </Button>
              <Button
                variant="outline"
                className={`whitespace-nowrap rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium shadow-sm flex-shrink-0 ${
                  activeFilter === "settled"
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => setActiveFilter("settled")}
              >
                Settled
              </Button>
            </div>
          </div>

          {/* People Who Owe You Money */}
          {activeFilter !== "youOwe" && activeFilter !== "settled" && peopleWhoOweYou.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center min-w-0 flex-1">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  </div>
                  <h2 className="text-sm sm:text-base font-semibold text-gray-800 truncate">You will receive</h2>
                </div>
                <Link
                  href="/receivables"
                  className="text-xs sm:text-sm text-primary font-medium hover:underline flex items-center flex-shrink-0"
                >
                  <span className="hidden sm:inline">View all</span>
                  <span className="sm:hidden">All</span>
                  <ArrowUp className="h-3 w-3 ml-1 rotate-45" />
                </Link>
              </div>

              <Card className="border-none shadow-md overflow-hidden rounded-xl">
                <CardContent className="p-0 divide-y">
                  {(activeFilter === "theyOwe" ? peopleWhoOweYou : peopleWhoOweYou.slice(0, 3)).map((balance) => (
                    <div key={balance.contact_id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center min-w-0 flex-1">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                            <span className="text-xs sm:text-sm font-semibold text-green-600">
                              {balance.contact_name.charAt(0)}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-800 text-sm sm:text-base truncate">
                              {balance.contact_name}
                            </p>
                            <p className="text-xs text-muted-foreground">owes you money</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-semibold text-green-500 text-sm sm:text-base">
                            +{formatAmount(balance.net)}
                          </p>
                          <p className="text-xs text-muted-foreground hidden sm:block">
                            Given: {formatAmount(balance.gave)} • Received: {formatAmount(balance.took)}
                          </p>
                        </div>
                      </div>

                      {/* Quick Action Buttons */}
                      <div className="flex flex-wrap gap-2 justify-end">
                        <QuickPaymentDialog
                          contactId={balance.contact_id}
                          contactName={balance.contact_name}
                          amount={balance.net}
                          type="TOOK"
                          mode="full"
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7 sm:h-8 rounded-full bg-green-50 border-green-100 text-green-600 hover:bg-green-100 hover:text-green-700 px-2 sm:px-3"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">Received Full</span>
                            <span className="sm:hidden">Full</span>
                          </Button>
                        </QuickPaymentDialog>

                        <QuickPaymentDialog
                          contactId={balance.contact_id}
                          contactName={balance.contact_name}
                          amount={balance.net / 2}
                          type="TOOK"
                          mode="half"
                        >
                          <Button size="sm" variant="outline" className="text-xs h-7 sm:h-8 rounded-full px-2 sm:px-3">
                            <RefreshCw className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">Received Half</span>
                            <span className="sm:hidden">Half</span>
                          </Button>
                        </QuickPaymentDialog>

                        <QuickPaymentDialog
                          contactId={balance.contact_id}
                          contactName={balance.contact_name}
                          type="TOOK"
                          mode="custom"
                        >
                          <Button size="sm" variant="outline" className="text-xs h-7 sm:h-8 rounded-full px-2 sm:px-3">
                            <ArrowDown className="h-3 w-3 mr-1" />
                            Custom
                          </Button>
                        </QuickPaymentDialog>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* People You Owe Money To */}
          {activeFilter !== "theyOwe" && activeFilter !== "settled" && peopleYouOwe.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center min-w-0 flex-1">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-100 flex items-center justify-center mr-2 flex-shrink-0">
                    <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                  </div>
                  <h2 className="text-sm sm:text-base font-semibold text-gray-800 truncate">You owe</h2>
                </div>
                <Link
                  href="/payables"
                  className="text-xs sm:text-sm text-primary font-medium hover:underline flex items-center flex-shrink-0"
                >
                  <span className="hidden sm:inline">View all</span>
                  <span className="sm:hidden">All</span>
                  <ArrowUp className="h-3 w-3 ml-1 rotate-45" />
                </Link>
              </div>

              <Card className="border-none shadow-md overflow-hidden rounded-xl">
                <CardContent className="p-0 divide-y">
                  {(activeFilter === "youOwe" ? peopleYouOwe : peopleYouOwe.slice(0, 3)).map((balance) => (
                    <div key={balance.contact_id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center min-w-0 flex-1">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                            <span className="text-xs sm:text-sm font-semibold text-red-600">
                              {balance.contact_name.charAt(0)}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-800 text-sm sm:text-base truncate">
                              {balance.contact_name}
                            </p>
                            <p className="text-xs text-muted-foreground">you owe money</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-semibold text-red-500 text-sm sm:text-base">
                            -{formatAmount(Math.abs(balance.net))}
                          </p>
                          <p className="text-xs text-muted-foreground hidden sm:block">
                            Given: {formatAmount(balance.gave)} • Received: {formatAmount(balance.took)}
                          </p>
                        </div>
                      </div>

                      {/* Quick Action Buttons */}
                      <div className="flex flex-wrap gap-2 justify-end">
                        <QuickPaymentDialog
                          contactId={balance.contact_id}
                          contactName={balance.contact_name}
                          amount={Math.abs(balance.net)}
                          type="GAVE"
                          mode="full"
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7 sm:h-8 rounded-full bg-red-50 border-red-100 text-red-600 hover:bg-red-100 hover:text-red-700 px-2 sm:px-3"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">Paid Full</span>
                            <span className="sm:hidden">Full</span>
                          </Button>
                        </QuickPaymentDialog>

                        <QuickPaymentDialog
                          contactId={balance.contact_id}
                          contactName={balance.contact_name}
                          amount={Math.abs(balance.net) / 2}
                          type="GAVE"
                          mode="half"
                        >
                          <Button size="sm" variant="outline" className="text-xs h-7 sm:h-8 rounded-full px-2 sm:px-3">
                            <RefreshCw className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">Paid Half</span>
                            <span className="sm:hidden">Half</span>
                          </Button>
                        </QuickPaymentDialog>

                        <QuickPaymentDialog
                          contactId={balance.contact_id}
                          contactName={balance.contact_name}
                          type="GAVE"
                          mode="custom"
                        >
                          <Button size="sm" variant="outline" className="text-xs h-7 sm:h-8 rounded-full px-2 sm:px-3">
                            <ArrowUp className="h-3 w-3 mr-1" />
                            Custom
                          </Button>
                        </QuickPaymentDialog>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settled Accounts */}
          {activeFilter !== "theyOwe" && activeFilter !== "youOwe" && settledPeople.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center min-w-0 flex-1">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 flex-shrink-0">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                  </div>
                  <h2 className="text-sm sm:text-base font-semibold text-gray-800 truncate">Settled accounts</h2>
                </div>
              </div>

              <Card className="border-none shadow-md overflow-hidden rounded-xl">
                <CardContent className="p-0 divide-y">
                  {(activeFilter === "settled" ? settledPeople : settledPeople.slice(0, 3)).map((balance) => (
                    <div key={balance.contact_id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center min-w-0 flex-1">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                            <span className="text-xs sm:text-sm font-semibold text-gray-600">
                              {balance.contact_name.charAt(0)}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-800 text-sm sm:text-base truncate">
                              {balance.contact_name}
                            </p>
                            <p className="text-xs text-muted-foreground">account settled</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-semibold text-gray-500 text-sm sm:text-base">{formatAmount(0)}</p>
                          <p className="text-xs text-muted-foreground hidden sm:block">
                            Given: {formatAmount(balance.gave)} • Received: {formatAmount(balance.took)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Empty State */}
          {displayedBalances.length === 0 && (
            <div className="text-center py-8 sm:py-12 bg-white rounded-xl shadow-sm border border-gray-100 mx-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
              <p className="text-gray-500 mb-4 sm:mb-6 max-w-xs mx-auto text-sm sm:text-base px-4">
                {activeFilter === "theyOwe"
                  ? "No one owes you money at the moment."
                  : activeFilter === "youOwe"
                    ? "You don't owe anyone money at the moment."
                    : activeFilter === "settled"
                      ? "No settled accounts found."
                      : "Add contacts and start tracking your money to see your financial overview."}
              </p>
              <Link href="/contacts">
                <Button className="bg-primary hover:bg-primary/90 rounded-full px-4 sm:px-6 text-sm sm:text-base">
                  Add New Contact
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* PWA Install Prompt */}
      <PWAInstall />

      {/* Bottom Navigation */}
      <MobileNav />
    </div>
  )
}
