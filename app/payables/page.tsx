"use client"

import { MobileNav } from "@/components/mobile-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUp, Check, RefreshCw, TrendingDown } from "lucide-react"
import { useDemoMode } from "@/contexts/demo-context"
import { QuickPaymentDialog } from "@/components/quick-payment-dialog"
import { PageHeader } from "@/components/page-header"

export default function PayablesPage() {
  const { balances, formatAmount } = useDemoMode()

  // Filter people you owe money to
  const peopleYouOwe = balances.filter((balance) => balance.net < 0)

  // Calculate total payable amount
  const totalPayable = peopleYouOwe.reduce((sum, balance) => sum + Math.abs(balance.net), 0)

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pb-16">
      {/* Header */}
      <PageHeader title="Money to Pay" showBackButton={true} />

      {/* Summary Card */}
      <div className="p-4">
        <Card className="border-none shadow-md overflow-hidden rounded-xl mb-6 bg-gradient-to-r from-red-50 to-red-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-medium text-gray-700">Total Payable</h3>
              <div className="h-8 w-8 rounded-full bg-red-200 flex items-center justify-center">
                <TrendingDown className="h-4 w-4 text-red-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-red-600">-{formatAmount(totalPayable)}</p>
            <p className="text-sm text-gray-600 mt-1">
              To {peopleYouOwe.length} contact{peopleYouOwe.length !== 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>

        {/* People List */}
        {peopleYouOwe.length > 0 ? (
          <Card className="border-none shadow-md overflow-hidden rounded-xl">
            <CardContent className="p-0 divide-y">
              {peopleYouOwe.map((balance) => (
                <div key={balance.contact_id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-semibold text-red-600">{balance.contact_name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{balance.contact_name}</p>
                        <p className="text-xs text-muted-foreground">you owe money</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-500">-{formatAmount(Math.abs(balance.net))}</p>
                      <p className="text-xs text-muted-foreground">
                        Given: {formatAmount(balance.gave)} • Received: {formatAmount(balance.took)}
                      </p>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="mt-3 flex space-x-2 justify-end">
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
                        className="text-xs h-8 rounded-full bg-red-50 border-red-100 text-red-600 hover:bg-red-100 hover:text-red-700"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Paid Full
                      </Button>
                    </QuickPaymentDialog>

                    <QuickPaymentDialog
                      contactId={balance.contact_id}
                      contactName={balance.contact_name}
                      amount={Math.abs(balance.net) / 2}
                      type="GAVE"
                      mode="half"
                    >
                      <Button size="sm" variant="outline" className="text-xs h-8 rounded-full">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Paid Half
                      </Button>
                    </QuickPaymentDialog>

                    <QuickPaymentDialog
                      contactId={balance.contact_id}
                      contactName={balance.contact_name}
                      type="GAVE"
                      mode="custom"
                    >
                      <Button size="sm" variant="outline" className="text-xs h-8 rounded-full">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        Custom
                      </Button>
                    </QuickPaymentDialog>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingDown className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No money to pay</h3>
            <p className="text-gray-500 mb-6 max-w-xs mx-auto">You don't owe anyone money at the moment.</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <MobileNav />
    </div>
  )
}
