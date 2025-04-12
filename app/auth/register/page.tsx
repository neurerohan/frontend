import Link from "next/link"
import { Compass } from "lucide-react"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Create Account</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Start your learning journey with Course Compass Nepal.
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
