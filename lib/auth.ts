import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // For development/testing, use a mock user
          // This ensures the app works even if the backend is unavailable
          return {
            id: "1",
            name: "Test User",
            email: credentials.email,
          }

          // The real API implementation is commented out until the backend is ready
          /*
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          if (!response.ok) {
            console.error(`Auth API error: ${response.status} ${response.statusText}`)
            return null
          }

          const data = await response.json()

          if (data.access) {
            return {
              id: "1",
              email: credentials.email,
              name: credentials.email.split("@")[0],
              accessToken: data.access,
              refreshToken: data.refresh,
            }
          }
          */
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as any
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-do-not-use-in-production",
  debug: process.env.NODE_ENV === "development",
}
