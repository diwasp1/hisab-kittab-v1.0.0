"use client"

import type React from "react"

import { useState, type ReactNode, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useDemoMode } from "@/contexts/demo-context"
import { Calendar } from "lucide-react"

interface QuickPaymentDialogProps {
  contactId: string
  contactName: string
  amount?: number
  type: "GAVE" | "TOOK"
  mode?: "full" | "half" | "custom"
  children: ReactNode
}

export function QuickPaymentDialog({
  contactId,
  contactName,
  amount,
  type,
  mode = "full",
  children,
}: QuickPaymentDialogProps) {
  const [open, setOpen] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [description, setDescription] = useState("")
  const { addTransaction, formatAmount, settings, balances } = useDemoMode()
  const today = new Date().toISOString().split("T")[0]

  // Find the current balance for this contact
  const contactBalance = balances.find((balance) => balance.contact_id === contactId)

  // Calculate the appropriate amount based on context
  const getAppropriateAmount = () => {
    // For custom mode, don't pre-fill any amount
    if (mode === "custom") {
      return 0
    }

    // If an explicit amount is passed (like for "Received Half"), use that
    if (amount !== undefined) {
      return amount
    }

    // Otherwise calculate the remaining balance (for "Received Full")
    if (!contactBalance) return 0

    if (type === "TOOK") {
      // For receiving money (they owe you)
      return contactBalance.net > 0 ? contactBalance.net : 0
    } else {
      // For paying money (you owe them)
      return contactBalance.net < 0 ? Math.abs(contactBalance.net) : 0
    }
  }

  // Update payment amount when dialog opens
  useEffect(() => {
    if (open) {
      if (mode === "custom") {
        setPaymentAmount("") // Empty string for custom mode
      } else {
        const appropriateAmount = getAppropriateAmount()
        setPaymentAmount(appropriateAmount.toString())
      }
    }
  }, [open, contactBalance, mode])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!paymentAmount || Number.parseFloat(paymentAmount) <= 0) {
      return
    }

    addTransaction({
      contact_id: contactId,
      amount: Number.parseFloat(paymentAmount),
      type,
      description: description || `Quick ${type === "TOOK" ? "payment received from" : "payment to"} ${contactName}`,
      transaction_date: today,
    })

    // Close dialog and reset form without showing redundant toast
    setOpen(false)
    setDescription("")
    setPaymentAmount("")
  }

  const actionText = type === "TOOK" ? "Received" : "Paid"
  const actionDescription =
    type === "TOOK" ? `Record money received from ${contactName}` : `Record payment made to ${contactName}`

  // Get the actual remaining amount for display
  const remainingAmount = getAppropriateAmount()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{actionText} Payment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Contact</Label>
            <div className="flex items-center p-3 bg-gray-50 rounded-md">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                <span className="text-sm font-semibold text-primary">{contactName.charAt(0)}</span>
              </div>
              <span className="font-medium">{contactName}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount ({settings.currency.symbol})</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="h-12"
              placeholder={
                mode === "custom"
                  ? `Enter any amount`
                  : mode === "half"
                    ? `Enter amount (Suggested: ${formatAmount(amount || 0)})`
                    : `Enter amount (Remaining: ${formatAmount(getAppropriateAmount())})`
              }
              required
              // Only allow focus for custom mode, disable for fixed amounts
              readOnly={mode !== "custom"}
              // Add this to prevent keyboard from opening for fixed amounts
              onClick={(e) => {
                if (mode !== "custom") {
                  // Blur the input to prevent keyboard from showing
                  e.currentTarget.blur()
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              Date
            </Label>
            <Input id="date" type="date" value={today} readOnly className="h-12 bg-gray-50" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`Quick ${actionText.toLowerCase()} from ${contactName}`}
              className="min-h-[80px]"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {actionText} {paymentAmount ? formatAmount(Number(paymentAmount)) : ""}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
