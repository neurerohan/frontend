'use client'

import { SessionProvider } from "next-auth/react"
import type { ReactNode } from "react"

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // You can add logic here if needed before rendering SessionProvider
  // e.g., setting up base path if required by next-auth
  return <SessionProvider>{children}</SessionProvider>;
} 