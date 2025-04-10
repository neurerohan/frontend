"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"

interface MainNavProps {
  className?: string
}

// Define different routes for logged-in and logged-out states
const loggedInRoutes = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/learning-paths", label: "Learning Paths" },
  // { href: "/resources", label: "Resources" }, // Example: Keep some links common or move all behind login
  { href: "/mentorship", label: "Mentorship" },
  { href: "/jobs", label: "Jobs" },
  // { href: "/forums", label: "Forums" },
];

const loggedOutRoutes = [
  { href: "/#features", label: "Features" }, // Link to features section on landing page
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()
  const { status } = useSession() // Get auth status
  const isAuthenticated = status === "authenticated"

  // Select routes based on auth status
  const routes = isAuthenticated ? loggedInRoutes : loggedOutRoutes;

  // Hide Nav links entirely during loading or if no routes defined for state
  if (status === "loading" || routes.length === 0) {
     return <div className={cn("hidden md:flex h-9 w-64 animate-pulse rounded-md bg-muted", className)}></div>; // Placeholder/Loading state
  }

  return (
    <nav className={cn("hidden md:flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => {
        const isActive = pathname === route.href || (route.href !== "/" && pathname?.startsWith(route.href));
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive ? "text-primary font-semibold" : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  )
}
