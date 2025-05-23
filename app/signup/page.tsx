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
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8">
          {/* App Logo */}
          <div className="flex flex-col items-center justify-center">
            <AppLogo size="lg" className="mb-4" />
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Hisab Kitab
            </h1>
            <p className="text-sm text-muted-foreground text-center mt-2">Track money you lent and borrowed</p>
          </div>

          {/* Signup Form */}
          <div className="bg-card rounded-xl p-6 shadow-lg border">
            <h2 className="text-xl font-semibold mb-4 text-center">Create Account</h2>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="phone">Phone</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
              </TabsList>

              <TabsContent value="phone" className="space-y-4 mt-4">
                <form onSubmit={handlePhoneSignUp} className="space-y-4">
                  {!showOtpInput ? (
                    <>
                      <div className="space-y-2">
                        <div className="relative">
                          <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="h-12 pl-10 pr-4"
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="relative">
                          <Phone className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            type="tel"
                            placeholder="+91 9876543210"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="h-12 pl-10 pr-4"
                            disabled={isLoading}
                            required
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground text-center">
                        Enter the 6-digit code sent to {phoneNumber}
                      </p>
                      <Input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="h-12 text-center text-lg tracking-widest"
                        maxLength={6}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium"
                    disabled={isLoading || (!showOtpInput && !agreeToTerms)}
                  >
                    {isLoading
                      ? showOtpInput
                        ? "Verifying..."
                        : "Sending OTP..."
                      : showOtpInput
                        ? "Create Account"
                        : "Send OTP"}
                    {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
                  {showOtpInput && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full"
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

              <TabsContent value="email" className="space-y-4 mt-4">
                <form onSubmit={handleEmailSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-12 pl-10 pr-4"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 pl-10 pr-4"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 pl-10 pr-4"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium"
                    disabled={isLoading || !agreeToTerms}
                  >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                    {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Terms and Conditions */}
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={setAgreeToTerms} />
              <label
                htmlFor="terms"
                className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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

            <div className="mt-6 flex items-center">
              <div className="flex-1 border-t"></div>
              <span className="px-3 text-xs text-muted-foreground">OR</span>
              <div className="flex-1 border-t"></div>
            </div>

            {/* Google Sign Up */}
            <Button
              variant="outline"
              className="w-full h-12 mt-4 text-base font-medium"
              onClick={handleGoogleSignUp}
              disabled={isLoading || !agreeToTerms}
            >
              <Chrome className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
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
