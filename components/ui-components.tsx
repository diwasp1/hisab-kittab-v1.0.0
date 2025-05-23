"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Calendar, User, CreditCard, FileText, Pencil, AlertTriangle } from "lucide-react"
import type { Contact } from "@/types/database"
import { useDemoMode } from "@/contexts/demo-context"
import { AvatarSelector } from "@/components/avatar-selector"

export function AddContactDialog({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false)
  const { addContact } = useDemoMode()
  const [avatarUrl, setAvatarUrl] = useState("")

  async function handleSubmit(formData: FormData) {
    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const notes = formData.get("notes") as string

    addContact({
      name,
      phone,
      email,
      notes,
      photo_url: avatarUrl || null,
    })

    setOpen(false)
  }

  function handleAvatarChange(url: string) {
    setAvatarUrl(url)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children || <Button>Add Contact</Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          {/* Add avatar selector */}
          <div className="flex justify-center mb-4">
            <AvatarSelector
              currentAvatarUrl={avatarUrl}
              name="New Contact"
              onAvatarChange={handleAvatarChange}
              size="md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" />
          </div>
          <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white">
            Add Contact
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function EditContactDialog({ contact, children }: { contact: Contact; children?: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(contact.photo_url || "")

  async function handleSubmit(formData: FormData) {
    // In a real app, we would update the contact in the database
    // For now, just show a toast
    setOpen(false)
  }

  function handleAvatarChange(url: string) {
    setAvatarUrl(url)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          {/* Add avatar selector */}
          <div className="flex justify-center mb-4">
            <AvatarSelector
              currentAvatarUrl={avatarUrl}
              name={contact.name}
              onAvatarChange={handleAvatarChange}
              size="md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={contact.name} required className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" defaultValue={contact.phone || ""} className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={contact.email || ""} className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" defaultValue={contact.notes || ""} />
          </div>
          <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function AddTransactionDialog({ contacts, children }: { contacts: Contact[]; children?: ReactNode }) {
  const [open, setOpen] = useState(false)
  const { addTransaction, settings } = useDemoMode()

  async function handleSubmit(formData: FormData) {
    const contactId = formData.get("contactId") as string
    const amount = Number.parseFloat(formData.get("amount") as string)
    const type = formData.get("type") as "GAVE" | "TOOK"
    const description = formData.get("description") as string
    const transactionDate = formData.get("transactionDate") as string

    addTransaction({
      contact_id: contactId,
      amount,
      type,
      description,
      transaction_date: transactionDate,
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contactId" className="flex items-center">
              <User className="h-4 w-4 mr-2 text-primary" />
              Contact
            </Label>
            <Select name="contactId" required>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select a contact" />
              </SelectTrigger>
              <SelectContent>
                {contacts.map((contact) => (
                  <SelectItem key={contact.id} value={contact.id}>
                    {contact.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount" className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-primary" />
              Amount ({settings.currency.symbol})
            </Label>
            <Input id="amount" name="amount" type="number" step="0.01" min="0" required className="h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type" className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-primary" />
              Type
            </Label>
            <Select name="type" required>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GAVE">Money Given</SelectItem>
                <SelectItem value="TOOK">Money Received</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="transactionDate" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              Date
            </Label>
            <Input
              id="transactionDate"
              name="transactionDate"
              type="date"
              required
              defaultValue={new Date().toISOString().split("T")[0]}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center">
              <FileText className="h-4 w-4 mr-2 text-primary" />
              Description
            </Label>
            <Textarea id="description" name="description" />
          </div>
          <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white">
            Add Transaction
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function DeleteContactButton({ id }: { id: string }) {
  const { deleteContact, balances, formatAmount, contacts } = useDemoMode()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showWarningDialog, setShowWarningDialog] = useState(false)

  // Find the contact and their balance
  const contact = contacts.find((c) => c.id === id)
  const contactBalance = balances.find((b) => b.contact_id === id)
  const hasUnsettledTransactions = contactBalance && contactBalance.net !== 0

  async function handleDeleteClick() {
    if (hasUnsettledTransactions) {
      setShowWarningDialog(true)
    } else {
      setShowConfirmDialog(true)
    }
  }

  async function confirmDelete() {
    deleteContact(id)
    setShowConfirmDialog(false)
  }

  return (
    <>
      <Button variant="ghost" size="icon" onClick={handleDeleteClick} className="h-8 w-8">
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>

      {/* Warning Dialog for Unsettled Transactions */}
      <Dialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-destructive">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Cannot Delete Contact
            </DialogTitle>
            <DialogDescription>This contact has unsettled transactions and cannot be deleted.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm font-medium text-red-800 mb-2">Outstanding Balance with {contact?.name}:</p>
              <p className="text-lg font-bold text-red-600">
                {contactBalance && contactBalance.net > 0
                  ? `+${formatAmount(contactBalance.net)} (They owe you)`
                  : contactBalance && contactBalance.net < 0
                    ? `-${formatAmount(Math.abs(contactBalance.net))} (You owe them)`
                    : formatAmount(0)}
              </p>
              <div className="mt-2 text-xs text-red-600">
                <p>Given: {formatAmount(contactBalance?.gave || 0)}</p>
                <p>Received: {formatAmount(contactBalance?.took || 0)}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Please settle all transactions before deleting this contact. You can add transactions to balance the
              account or transfer the debt to another contact.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWarningDialog(false)}>
              Understood
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Settled Contacts */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
              Delete Contact
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {contact?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm font-medium text-green-800 mb-1">✓ No outstanding balance</p>
              <p className="text-xs text-green-600">This contact can be safely deleted.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Contact
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function DeleteTransactionButton({ id }: { id: string }) {
  const { deleteTransaction } = useDemoMode()

  async function handleDelete() {
    deleteTransaction(id)
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleDelete} className="h-8 w-8">
      <Trash2 className="h-4 w-4 text-destructive" />
    </Button>
  )
}
