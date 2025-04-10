"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams?.get("error")

  useEffect(() => {
    // Log the error for debugging
    if (error) {
      console.error("Authentication error:", error)
    }
  }, [error])

  // Map error codes to user-friendly messages
  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case "Configuration":
        return "There is a problem with the server configuration. Please contact support."
      case "AccessDenied":
        return "You do not have permission to sign in."
      case "Verification":
        return "The verification link is invalid or has expired."
      case "OAuthSignin":
        return "Error in the OAuth sign-in process."
      case "OAuthCallback":
        return "Error in the OAuth callback process."
      case "OAuthCreateAccount":
        return "Could not create OAuth provider account."
      case "EmailCreateAccount":
        return "Could not create email provider account."
      case "Callback":
        return "Error in the OAuth callback handler."
      case "OAuthAccountNotLinked":
        return "Email already in use with different provider."
      case "EmailSignin":
        return "Error sending the email for sign in."
      case "CredentialsSignin":
        return "Invalid credentials. Please check your email and password."
      case "SessionRequired":
        return "You must be signed in to access this page."
      case "Default":
      default:
        return "An authentication error occurred. Please try again or contact support if the problem persists."
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <CardTitle>Authentication Error</CardTitle>
          </div>
          <CardDescription>There was a problem with your authentication request.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <p className="text-sm text-red-800 dark:text-red-300">{getErrorMessage(error)}</p>
              {error && <p className="mt-2 text-xs text-red-600 dark:text-red-400">Error code: {error}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/login">Try Again</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
