"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDemoMode } from "@/contexts/demo-context"
import { ArrowRight, Mail, Lock, Phone, Chrome } from "lucide-react"
import { AppLogo } from "@/components/app-logo"

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState("")
  const [password, setPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [activeTab, setActiveTab] = useState("phone")
  const { setDemoMode } = useDemoMode()
  const router = useRouter()

  function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setDemoMode(true)
      router.push("/dashboard")
    }, 800)
  }

  function handlePhoneLogin(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    if (!showOtpInput) {
      // Simulate sending OTP
      setTimeout(() => {
        setShowOtpInput(true)
        setIsLoading(false)
      }, 1000)
    } else {
      // Simulate OTP verification
      setTimeout(() => {
        setDemoMode(true)
        router.push("/dashboard")
      }, 800)
    }
  }

  function handleGoogleLogin() {
    setIsLoading(true)
    // Simulate Google OAuth
    setTimeout(() => {
      setDemoMode(true)
      router.push("/dashboard")
    }, 1000)
  }

  function handleDemoLogin() {
    setIsLoading(true)
    setDemoMode(true)
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="flex-1 flex flex-col items-center justify-center p-4 py-6">
        <div className="w-full max-w-sm space-y-6">
          {/* App Logo - Reduced size and spacing */}
          <div className="flex flex-col items-center justify-center">
            <AppLogo size="md" className="mb-3" />
            <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Hisab Kittab
            </h1>
            <p className="text-xs text-muted-foreground text-center mt-1">Track money you lent and borrowed</p>
          </div>

          {/* Login Form - Reduced padding and spacing */}
          <div className="bg-card rounded-xl p-5 shadow-lg border">
            <h2 className="text-lg font-semibold mb-3 text-center">Welcome Back</h2>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-3">
                <TabsTrigger value="phone" className="text-sm">
                  Phone
                </TabsTrigger>
                <TabsTrigger value="email" className="text-sm">
                  Email
                </TabsTrigger>
              </TabsList>

              <TabsContent value="phone" className="space-y-3 mt-3">
                <form onSubmit={handlePhoneLogin} className="space-y-3">
                  {!showOtpInput ? (
                    <div className="space-y-2">
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="tel"
                          placeholder="+91 9876543210"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="h-10 pl-9 pr-4 text-sm"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground text-center">
                        Enter the 6-digit code sent to {phoneNumber}
                      </p>
                      <Input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="h-10 text-center text-base tracking-widest"
                        maxLength={6}
                        disabled={isLoading}
                      />
                    </div>
                  )}
                  <Button type="submit" className="w-full h-10 text-sm font-medium" disabled={isLoading}>
                    {isLoading
                      ? showOtpInput
                        ? "Verifying..."
                        : "Sending OTP..."
                      : showOtpInput
                        ? "Verify OTP"
                        : "Send OTP"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                  {showOtpInput && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full h-8 text-xs"
                      onClick={() => {
                        setShowOtpInput(false)
                        setOtp("")
                      }}
                    >
                      Change Phone Number
                    </Button>
                  )}
                </form>
              </TabsContent>

              <TabsContent value="email" className="space-y-3 mt-3">
                <form onSubmit={handleEmailLogin} className="space-y-3">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Email or Phone"
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        className="h-10 pl-9 pr-4 text-sm"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-10 pl-9 pr-4 text-sm"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-10 text-sm font-medium" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-4 flex items-center">
              <div className="flex-1 border-t"></div>
              <span className="px-2 text-xs text-muted-foreground">OR</span>
              <div className="flex-1 border-t"></div>
            </div>

            {/* Google Sign In */}
            <Button
              variant="outline"
              className="w-full h-10 mt-3 text-sm font-medium"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>

            {/* Demo Mode */}
            <Button
              variant="outline"
              className="w-full h-10 mt-2 text-sm font-medium"
              onClick={handleDemoLogin}
              disabled={isLoading}
            >
              Try Demo
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
