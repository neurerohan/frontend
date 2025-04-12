import type { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode"

// Helper function to refresh the access token
async function refreshAccessToken(token: JWT) {
  try {
    console.log("Attempting token refresh...")
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: token.refreshToken }),
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      console.error("Token refresh failed:", refreshedTokens)
      throw refreshedTokens
    }

    console.log("Token refreshed successfully.")

    // Decode the new access token to get its expiry time
    const decodedAccessToken: { exp: number } = jwtDecode(refreshedTokens.access)
    const newTokenExpiry = decodedAccessToken.exp * 1000 // Convert seconds to milliseconds

    return {
      ...token, // Keep the old token properties
      accessToken: refreshedTokens.access,
      accessTokenExpires: newTokenExpiry,
      // Keep the same refresh token if the backend doesn't return a new one
      refreshToken: refreshedTokens.refresh ?? token.refreshToken,
    }
  } catch (error) {
    console.error("Error refreshing access token", error)
    // Indicate refresh error
    return {
      ...token,
      error: "RefreshAccessTokenError" as const,
    }
  }
}

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
          // Fetch tokens from the backend
          const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          if (!tokenResponse.ok) {
            const errorData = await tokenResponse.json().catch(() => null) // Try to parse JSON error
            console.error(`Auth API token error: ${tokenResponse.status} ${tokenResponse.statusText}`, errorData)
            return null // Indicate failure
          }

          const tokens = await tokenResponse.json()

          if (!tokens.access || !tokens.refresh) {
             console.error("Auth API error: Tokens not found in response")
             return null
          }

          // Fetch user profile using the access token
          const profileResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/`, {
            headers: {
              "Authorization": `Bearer ${tokens.access}`
            }
          })

          if (!profileResponse.ok) {
            console.error(`Auth API profile error: ${profileResponse.status} ${profileResponse.statusText}`)
            return null
          }

          const userProfile = await profileResponse.json()

          // Decode access token to get expiry time
          const decodedAccessToken: { exp: number } = jwtDecode(tokens.access)
          const accessTokenExpires = decodedAccessToken.exp * 1000 // Convert seconds to milliseconds

          // Return the user object expected by NextAuth, including tokens AND expiry
          return {
            id: userProfile.id,
            email: userProfile.email,
            name: userProfile.full_name || userProfile.username,
            accessToken: tokens.access,
            accessTokenExpires: accessTokenExpires, // Add expiry time
            refreshToken: tokens.refresh,
          }

        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error", // Optional: page to display auth errors
  },
  session: {
    strategy: "jwt",
     // maxAge: 30 * 24 * 60 * 60, // 30 days - Session cookie expiry
     // Consider aligning maxAge with your refresh token's lifespan if applicable
     maxAge: 60 * 60 // 1 hour - shorter session for testing refresh
  },
  callbacks: {
     async jwt({ token, user, account }) {
       // Initial sign in
       if (account && user) {
         console.log("Initial sign in, populating token:", user)
         // The user object here comes from the authorize function
         return {
           ...token,
           accessToken: user.accessToken,
           accessTokenExpires: (user as any).accessTokenExpires, // Get expiry from user obj
           refreshToken: user.refreshToken,
           id: user.id, // Persist user id
           name: user.name,
           email: user.email,
           // Add other user properties you want in the token
         }
       }

       // Return previous token if the access token has not expired yet
       // Add a buffer (e.g., 60 seconds) to refresh before expiry
       const bufferSeconds = 60
       if (Date.now() < (token.accessTokenExpires as number) - bufferSeconds * 1000) {
         console.log("Access token is still valid.")
         return token
       }

       // Access token has expired, try to update it
       console.log("Access token expired, attempting refresh...")
       return refreshAccessToken(token)
     },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from the token
       if (token) {
          session.user.id = token.id
          session.user.name = token.name
          session.user.email = token.email
          session.user.accessToken = token.accessToken // Pass the potentially refreshed token
          session.error = token.error // Pass error flag for client-side handling
          // Add any other properties from the token needed client-side
       }
      console.log("Populated session:", session)
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in Vercel Env Vars
  debug: process.env.NODE_ENV === "development",
}
