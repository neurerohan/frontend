"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BookOpen, Compass, Users, Briefcase, MessageSquare, Trophy, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export function DashboardNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Overview",
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/learning-paths",
      icon: <Compass className="h-5 w-5" />,
      label: "Learning Paths",
      active: pathname?.startsWith("/dashboard/learning-paths"),
    },
    {
      href: "/dashboard/resources",
      icon: <BookOpen className="h-5 w-5" />,
      label: "Resources",
      active: pathname?.startsWith("/dashboard/resources"),
    },
    {
      href: "/dashboard/mentorship",
      icon: <Users className="h-5 w-5" />,
      label: "Mentorship",
      active: pathname?.startsWith("/dashboard/mentorship"),
    },
    {
      href: "/dashboard/jobs",
      icon: <Briefcase className="h-5 w-5" />,
      label: "Jobs",
      active: pathname?.startsWith("/dashboard/jobs"),
    },
    {
      href: "/dashboard/forums",
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Forums",
      active: pathname?.startsWith("/dashboard/forums"),
    },
    {
      href: "/dashboard/achievements",
      icon: <Trophy className="h-5 w-5" />,
      label: "Achievements",
      active: pathname?.startsWith("/dashboard/achievements"),
    },
    {
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      active: pathname?.startsWith("/dashboard/settings"),
    },
  ]

  return (
    <nav className="grid items-start px-2 py-4">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            route.active ? "bg-accent text-accent-foreground" : "transparent",
          )}
        >
          {route.icon}
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
