"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function signUp(formData: FormData) {
  const method = formData.get("method") as string

  if (method === "google") {
    // In a real app, we would handle Google OAuth here
    console.log("Google signup")
  } else if (method === "phone") {
    const phoneNumber = formData.get("phoneNumber") as string
    const otp = formData.get("otp") as string
    // In a real app, we would verify OTP here
    console.log("Phone signup:", phoneNumber, otp)
  } else {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const fullName = formData.get("fullName") as string
    // In a real app, we would create user with email/password here
    console.log("Email signup:", email, fullName)
  }

  // For demo, just enable demo mode
  cookies().set("hisabKitabDemoMode", "true", { path: "/", maxAge: 60 * 60 * 24 * 30 })
  redirect("/dashboard")
}

export async function signIn(formData: FormData) {
  const method = formData.get("method") as string

  if (method === "google") {
    // In a real app, we would handle Google OAuth here
    console.log("Google signin")
  } else if (method === "phone") {
    const phoneNumber = formData.get("phoneNumber") as string
    const otp = formData.get("otp") as string
    // In a real app, we would verify OTP here
    console.log("Phone signin:", phoneNumber, otp)
  } else {
    const emailOrPhone = formData.get("emailOrPhone") as string
    const password = formData.get("password") as string
    // In a real app, we would authenticate user here
    console.log("Email/Phone signin:", emailOrPhone)
  }

  // For demo, just enable demo mode
  cookies().set("hisabKitabDemoMode", "true", { path: "/", maxAge: 60 * 60 * 24 * 30 })
  redirect("/dashboard")
}

// Modified to return a URL instead of redirecting directly
export async function signOut() {
  // Just disable demo mode
  cookies().set("hisabKitabDemoMode", "false", { path: "/", maxAge: 0 })

  // Return the URL instead of redirecting
  return { redirectUrl: "/login" }
}

export async function sendOTP(phoneNumber: string) {
  // In a real app, we would send OTP via SMS service
  console.log("Sending OTP to:", phoneNumber)
  return { success: true, message: "OTP sent successfully" }
}

export async function verifyOTP(phoneNumber: string, otp: string) {
  // In a real app, we would verify OTP
  console.log("Verifying OTP:", phoneNumber, otp)
  return { success: true, message: "OTP verified successfully" }
}
