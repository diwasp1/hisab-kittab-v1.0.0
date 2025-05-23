import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Check for demo mode in cookies
  const isDemoMode = request.cookies.get("hisabKitabDemoMode")?.value === "true"

  // If in demo mode, handle routing for demo user
  if (isDemoMode) {
    // If user is in demo mode and trying to access login/signup, redirect to dashboard
    if (
      request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/signup")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    // Allow access to all other routes in demo mode
    return response
  }

  // If user is not in demo mode and trying to access protected routes, redirect to login
  if (
    !isDemoMode &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/signup") &&
    request.nextUrl.pathname !== "/"
  ) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
