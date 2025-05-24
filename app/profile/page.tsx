"use client"

import { useState } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save } from "lucide-react"
import { useDemoMode } from "@/contexts/demo-context"
import { PageHeader } from "@/components/page-header"
import { AvatarSelector } from "@/components/avatar-selector"

export default function ProfilePage() {
  const { profile } = useDemoMode()
  const [isEditing, setIsEditing] = useState(false)
  const [fullName, setFullName] = useState(profile?.full_name || "")
  const [email, setEmail] = useState("demo@hisabkittab.com")
  const [phone, setPhone] = useState("+91 9876543210")
  const [avatarUrl, setAvatarUrl] = useState(profile?.photo_url || profile?.avatar_url || "")

  function handleSave() {
    // In a real app, we would update the profile here
    setIsEditing(false)
  }

  function handleAvatarChange(url: string) {
    setAvatarUrl(url)
    // In a real app, we would update the profile photo here
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pb-16">
      {/* Header */}
      <PageHeader title="Profile" showBackButton={true} showActions={false} />

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Profile Picture Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <AvatarSelector
                currentAvatarUrl={avatarUrl}
                name={profile?.full_name || "Demo User"}
                onAvatarChange={handleAvatarChange}
              />
              <div className="text-center">
                <h2 className="text-xl font-semibold">{profile?.full_name || "Demo User"}</h2>
                <p className="text-sm text-muted-foreground">demo@hisabkittab.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Personal Information</CardTitle>
            <Button
              variant={isEditing ? "default" : "outline"}
              size="sm"
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </>
              ) : (
                "Edit"
              )}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={!isEditing}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditing}
                className="h-12"
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">5</p>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">3</p>
                <p className="text-sm text-muted-foreground">Active Contacts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <MobileNav />
    </div>
  )
}
