"use client"

import { useState } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { AddContactDialog, DeleteContactButton } from "@/components/ui-components"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Phone, Mail, Search, Plus, Pencil } from "lucide-react"
import { useDemoMode } from "@/contexts/demo-context"
import { PageHeader } from "@/components/page-header"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { Contact } from "@/types/database"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AvatarSelector } from "@/components/avatar-selector"

export default function ContactsPage() {
  const { contacts } = useDemoMode()
  const [searchQuery, setSearchQuery] = useState("")
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState("")
  const { toast } = useToast()

  // Filter contacts based on search query
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.phone && contact.phone.includes(searchQuery)) ||
      (contact.email && contact.email.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  function handleEditContact(contact: Contact) {
    setEditingContact(contact)
    setAvatarUrl(contact.photo_url || "")
    setIsEditDialogOpen(true)
  }

  function handleSaveEdit(formData: FormData) {
    // In a real app, we would update the contact in the database
    // For now, just show a toast
    toast({
      title: "Contact Updated",
      description: "Contact has been updated successfully",
    })
    setIsEditDialogOpen(false)
    setEditingContact(null)
  }

  function handleAvatarChange(url: string) {
    setAvatarUrl(url)
  }

  // Custom header actions with Add Contact button
  const headerActions = (
    <AddContactDialog>
      <Button size="icon" className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90">
        <Plus className="h-5 w-5" />
      </Button>
    </AddContactDialog>
  )

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pb-16">
      {/* Header with Add Contact button */}
      <PageHeader title="Contacts" customActions={headerActions} />

      {/* Search */}
      <div className="px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search contacts"
            className="pl-10 h-12 bg-gray-50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="px-4">
        <Card className="border-none shadow-md">
          <CardContent className="p-0 divide-y">
            {filteredContacts.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-muted-foreground">No contacts found</p>
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <div key={contact.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="w-12 h-12 mr-3">
                        <AvatarImage src={contact.photo_url || ""} alt={contact.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <div className="flex flex-col mt-1 space-y-1">
                          {contact.phone && (
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Phone className="h-3 w-3 mr-1" />
                              <span>{contact.phone}</span>
                            </div>
                          )}
                          {contact.email && (
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Mail className="h-3 w-3 mr-1" />
                              <span>{contact.email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {/* Edit Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditContact(contact)}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4 text-gray-500" />
                      </Button>
                      {/* Delete Button */}
                      <DeleteContactButton id={contact.id} />
                    </div>
                  </div>
                  {contact.notes && <p className="text-sm text-muted-foreground mt-2 ml-15">{contact.notes}</p>}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Contact Dialog */}
      {editingContact && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Contact</DialogTitle>
            </DialogHeader>
            <form action={handleSaveEdit} className="space-y-4">
              {/* Add avatar selector */}
              <div className="flex justify-center mb-4">
                <AvatarSelector
                  currentAvatarUrl={avatarUrl}
                  name={editingContact.name}
                  onAvatarChange={handleAvatarChange}
                  size="md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" defaultValue={editingContact.name} required className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" defaultValue={editingContact.phone || ""} className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={editingContact.email || ""}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" name="notes" defaultValue={editingContact.notes || ""} />
              </div>
              <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white">
                Save Changes
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Bottom Navigation */}
      <MobileNav />
    </div>
  )
}
