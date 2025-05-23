"use client"

import { useRouter } from "next/navigation"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Mail, Phone, HomeIcon, ChevronRight, LogOut } from "lucide-react"
import { useDemoMode } from "@/contexts/demo-context"
import { signOut } from "@/app/actions/auth"
import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { AvatarSelector } from "@/components/avatar-selector"
import { useToast } from "@/hooks/use-toast"

export default function UserPage() {
  const { profile } = useDemoMode()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(profile?.photo_url || profile?.avatar_url || "")

  async function handleSignOut() {
    setIsLoading(true)
    try {
      // Call the server action and get the redirect URL
      const result = await signOut()

      // If we have a redirect URL, navigate to it
      if (result?.redirectUrl) {
        router.push(result.redirectUrl)
      }
    } catch (error) {
      console.error("Error signing out:", error)
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  function handleAvatarChange(url: string) {
    setAvatarUrl(url)
    // In a real app, we would update the profile photo here
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pb-16">
      {/* Header */}
      <PageHeader title="Profile" showActions={false} />

      <div className="p-4">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <AvatarSelector
            currentAvatarUrl={avatarUrl}
            name={profile?.full_name || "Demo User"}
            onAvatarChange={handleAvatarChange}
          />
        </div>

        {/* Personal Info */}
        <Card className="mb-6 border-none shadow-md">
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Personal info</h2>
                <Button variant="ghost" className="h-8 px-2 text-primary" onClick={() => router.push("/profile")}>
                  Edit
                </Button>
              </div>
            </div>

            <div className="divide-y">
              <div className="p-4 flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{profile?.full_name || "Demo User"}</p>
                </div>
              </div>

              <div className="p-4 flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">E-mail</p>
                  <p className="font-medium">demo@hisabkitab.com</p>
                </div>
              </div>

              <div className="p-4 flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Phone number</p>
                  <p className="font-medium">+91 9876543210</p>
                </div>
              </div>

              <div className="p-4 flex items-center">
                <HomeIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Home address</p>
                  <p className="font-medium">123 Main Street, Apartment 4B, Mumbai 400001</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card className="mb-6 border-none shadow-md">
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Account info</h2>
            </div>

            <div className="divide-y">
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto font-normal"
                onClick={() => router.push("/settings")}
              >
                <span>Settings</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Button>

              <Button variant="ghost" className="w-full justify-between p-4 h-auto font-normal" onClick={() => {}}>
                <span>Privacy & Security</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Button>

              <Button variant="ghost" className="w-full justify-between p-4 h-auto font-normal" onClick={() => {}}>
                <span>Help & Support</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto font-normal text-red-500"
                onClick={handleSignOut}
                disabled={isLoading}
              >
                <div className="flex items-center">
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>{isLoading ? "Signing out..." : "Sign Out"}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Version */}
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">Hisab Kitab v1.0.0</p>
          <p className="text-xs text-muted-foreground">Demo Version</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <MobileNav />
    </div>
  )
}
