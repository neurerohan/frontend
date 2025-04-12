'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

/**
 * This component handles session errors, specifically forcing sign-out
 * if the access token refresh fails.
 */
export function SessionErrorHandler() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      console.error("Refresh token failed. Signing out...");
      // Force sign out
      signOut({ callbackUrl: '/auth/login?error=SessionExpired' }); 
    }
  }, [session]);

  // Optionally, render an alert if the error occurs before sign-out completes
  if (session?.error === "RefreshAccessTokenError") {
    return (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm">
            <Alert variant="destructive">
                <AlertTitle>Session Error</AlertTitle>
                <AlertDescription>Your session has expired. Please sign in again.</AlertDescription>
            </Alert>
        </div>
    );
  }

  return null // Render nothing if no error
} 