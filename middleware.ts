import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path starts with /dashboard
  const isProtectedRoute = pathname.startsWith("/dashboard")
  const isAuthRoute = pathname.startsWith("/auth")

  try {
    // Get the authentication token
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    }).catch((error) => {
      console.error("Token fetch error:", error)
      return null
    })

    // If the user is not authenticated and trying to access a protected route
    if (isProtectedRoute && !token) {
      const url = new URL("/auth/login", request.url)
      url.searchParams.set("callbackUrl", encodeURI(request.url))
      return NextResponse.redirect(url)
    }

    // If the user is authenticated and trying to access an auth route
    if (isAuthRoute && token && pathname !== "/auth/error") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  } catch (error) {
    console.error("Middleware error:", error)
    // Continue to the page even if token validation fails
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
}
