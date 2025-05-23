"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { useDemoMode } from "@/contexts/demo-context"
import { ArrowRight, User, Mail, Lock, Phone, Chrome } from "lucide-react"
import { AppLogo } from "@/components/app-logo"

export default function SignUpPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [activeTab, setActiveTab] = useState("phone")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const { setDemoMode } = useDemoMode()
  const router = useRouter()

  function handleEmailSignUp(e: React.FormEvent) {
    e.preventDefault()
    if (!agreeToTerms) return

    setIsLoading(true)
    // Simulate signup process
    setTimeout(() => {
      setDemoMode(true)
      router.push("/dashboard")
    }, 800)
  }

  function handlePhoneSignUp(e: React.FormEvent) {
    e.preventDefault()
    if (!agreeToTerms) return

    setIsLoading(true)

    if (!showOtpInput) {
      // Simulate sending OTP
      setTimeout(() => {
        setShowOtpInput(true)
        setIsLoading(false)
      }, 1000)
    } else {
      // Simulate OTP verification and account creation
      setTimeout(() => {
        setDemoMode(true)
        router.push("/dashboard")
      }, 800)
    }
  }

  function handleGoogleSignUp() {
    if (!agreeToTerms) return

    setIsLoading(true)
    // Simulate Google OAuth
    setTimeout(() => {
      setDemoMode(true)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="flex-1 flex flex-col items-center justify-center p-4 py-6">
        <div className="w-full max-w-sm space-y-5">
          {/* App Logo - Reduced size and spacing */}
          <div className="flex flex-col items-center justify-center">
            <AppLogo size="md" className="mb-3" />
            <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Hisab Kittab
            </h1>
            <p className="text-xs text-muted-foreground text-center mt-1">Track money you lent and borrowed</p>
          </div>

          {/* Signup Form - Reduced padding and spacing */}
          <div className="bg-card rounded-xl p-5 shadow-lg border">
            <h2 className="text-lg font-semibold mb-3 text-center">Create Account</h2>

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
                <form onSubmit={handlePhoneSignUp} className="space-y-3">
                  {!showOtpInput ? (
                    <>
                      <div className="space-y-2">
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="h-10 pl-9 pr-4 text-sm"
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
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
                            required
                          />
                        </div>
                      </div>
                    </>
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
                        required
                      />
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full h-10 text-sm font-medium"
                    disabled={isLoading || (!showOtpInput && !agreeToTerms)}
                  >
                    {isLoading
                      ? showOtpInput
                        ? "Verifying..."
                        : "Sending OTP..."
                      : showOtpInput
                        ? "Create Account"
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
                <form onSubmit={handleEmailSignUp} className="space-y-3">
                  <div className="space-y-2">
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-10 pl-9 pr-4 text-sm"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-10 pl-9 pr-4 text-sm"
                        disabled={isLoading}
                        required
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
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-10 text-sm font-medium"
                    disabled={isLoading || !agreeToTerms}
                  >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Terms and Conditions - Reduced spacing */}
            <div className="flex items-start space-x-2 mt-3">
              <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={setAgreeToTerms} className="mt-0.5" />
              <label
                htmlFor="terms"
                className="text-xs text-muted-foreground leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div className="mt-4 flex items-center">
              <div className="flex-1 border-t"></div>
              <span className="px-2 text-xs text-muted-foreground">OR</span>
              <div className="flex-1 border-t"></div>
            </div>

            {/* Google Sign Up */}
            <Button
              variant="outline"
              className="w-full h-10 mt-3 text-sm font-medium"
              onClick={handleGoogleSignUp}
              disabled={isLoading || !agreeToTerms}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
