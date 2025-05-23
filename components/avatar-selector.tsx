"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, LinkIcon } from "lucide-react"

// Sample avatar options
const AVATAR_OPTIONS = [
  "/abstract-avatar-1.png",
  "/abstract-avatar-2.png",
  "/abstract-avatar-3.png",
  "/abstract-avatar-4.png",
  "/abstract-avatar-five.png",
  "/abstract-avatar-6.png",
]

interface AvatarSelectorProps {
  currentAvatarUrl: string | null
  name: string
  onAvatarChange: (url: string) => void
  size?: "sm" | "md" | "lg"
}

export function AvatarSelector({ currentAvatarUrl, name, onAvatarChange, size = "lg" }: AvatarSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("gallery")
  const [urlInput, setUrlInput] = useState("")

  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  }

  const buttonSizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  const iconSizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const handleSelectAvatar = (url: string) => {
    onAvatarChange(url)
    setIsOpen(false)
  }

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (urlInput.trim()) {
      onAvatarChange(urlInput.trim())
      setIsOpen(false)
      setUrlInput("")
    }
  }

  return (
    <div className="relative">
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={currentAvatarUrl || ""} alt={name} />
        <AvatarFallback className="bg-primary text-primary-foreground">{name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="icon" className={`absolute -bottom-2 -right-2 ${buttonSizeClasses[size]} rounded-full`}>
            <Camera className={iconSizeClasses[size]} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Avatar</DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="url">URL</TabsTrigger>
            </TabsList>

            <TabsContent value="gallery" className="mt-4">
              <div className="grid grid-cols-3 gap-4">
                {AVATAR_OPTIONS.map((url, index) => (
                  <button
                    key={index}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => handleSelectAvatar(url)}
                  >
                    <Avatar className="h-20 w-20 mx-auto">
                      <AvatarImage src={url || "/placeholder.svg"} alt={`Avatar option ${index + 1}`} />
                    </Avatar>
                  </button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="url" className="mt-4">
              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="avatar-url" className="flex items-center">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Image URL
                  </Label>
                  <Input
                    id="avatar-url"
                    placeholder="https://example.com/avatar.jpg"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="h-10"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Set Avatar
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
