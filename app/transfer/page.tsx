"use client"

import { useRouter } from "next/navigation"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, CreditCard, ArrowRightLeft, Smartphone, Users } from "lucide-react"
import { useDemoMode } from "@/contexts/demo-context"
import { PageHeader } from "@/components/page-header"

export default function TransferPage() {
  const { contacts } = useDemoMode()
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pb-16">
      {/* Header */}
      <PageHeader title="Add Transaction" showBackButton={true} showActions={false} />

      <div className="p-4">
        {/* Transaction Type */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Transaction Type</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-2 border-primary overflow-hidden">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <ArrowRightLeft className="h-6 w-6 text-green-600" />
                </div>
                <p className="font-medium">Money Given</p>
                <p className="text-xs text-muted-foreground">You lent money</p>
              </CardContent>
            </Card>

            <Card className="border overflow-hidden">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-2">
                  <ArrowRightLeft className="h-6 w-6 text-red-600" />
                </div>
                <p className="font-medium">Money Received</p>
                <p className="text-xs text-muted-foreground">You borrowed money</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transaction Methods */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>

          <Card className="mb-4 border-none shadow-md">
            <CardContent className="p-0">
              <Button variant="ghost" className="w-full justify-between p-4 h-auto font-normal" onClick={() => {}}>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <span>Select Contact</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Button>
            </CardContent>
          </Card>

          <Card className="mb-4 border-none shadow-md">
            <CardContent className="p-0">
              <Button variant="ghost" className="w-full justify-between p-4 h-auto font-normal" onClick={() => {}}>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <CreditCard className="h-5 w-5 text-green-600" />
                  </div>
                  <span>Enter Amount</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Button>
            </CardContent>
          </Card>

          <Card className="mb-4 border-none shadow-md">
            <CardContent className="p-0">
              <Button variant="ghost" className="w-full justify-between p-4 h-auto font-normal" onClick={() => {}}>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <Smartphone className="h-5 w-5 text-purple-600" />
                  </div>
                  <span>Add Description</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Button>
            </CardContent>
          </Card>

          <Button className="w-full h-12 bg-black text-white hover:bg-gray-800 mt-6">Continue</Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <MobileNav />
    </div>
  )
}
