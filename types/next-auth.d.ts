import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string // Add the id property from your backend
      accessToken: string
      refreshToken: string
      // Add any other custom properties you expect on the user session
    } & DefaultSession["user"]
    error?: "RefreshAccessTokenError" // Add optional error field
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` function,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends DefaultUser {
    // Add the properties returned by your authorize callback
    accessToken: string
    refreshToken: string
    // Add other properties like full_name, etc. if needed directly on User
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    // This structure should match the object returned from the authorize callback
    id: string
    accessToken: string
    refreshToken: string
    // Add any other user details you stored in the token
    name?: string | null
    email?: string | null
    picture?: string | null
    // Add error property for refresh token rotation error handling
    error?: "RefreshAccessTokenError"
  }
} 