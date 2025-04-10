import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Simple NextAuth handler without any custom error handling
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
