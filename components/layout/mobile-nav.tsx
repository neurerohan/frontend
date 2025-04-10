"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, GraduationCap, LogOut, User as UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const loggedInRoutes = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/learning-paths", label: "Learning Paths" },
  { href: "/mentorship", label: "Mentorship" },
  { href: "/jobs", label: "Jobs" },
];

const loggedOutRoutes = [
  { href: "/#features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"

  const routes = isAuthenticated ? loggedInRoutes : loggedOutRoutes;

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (status === "loading") {
    return <div className="md:hidden h-10 w-10 animate-pulse rounded-md bg-muted"></div>;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link href="/" className="flex items-center space-x-2 px-6 pt-2 pb-4" onClick={() => setOpen(false)}>
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="font-bold">Nyure Education</span>
        </Link>
        <div className="flex h-full flex-col justify-between pb-6">
          <div className="grid gap-3 px-6">
            {routes.map((route) => {
              const isActive = pathname === route.href || (route.href !== "/" && pathname?.startsWith(route.href));
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary font-semibold" : "text-muted-foreground"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {route.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-auto border-t px-6 pt-4">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session?.user?.image ?? undefined} alt={session?.user?.name ?? "User"} />
                    <AvatarFallback>{session?.user?.name?.charAt(0).toUpperCase() ?? "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session?.user?.name ?? "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session?.user?.email ?? ""}
                    </p>
                  </div>
                </div>
                 <Button variant="ghost" className="justify-start pl-0" onClick={() => signOut({ callbackUrl: '/' })}>
                   <LogOut className="mr-2 h-4 w-4" />
                   <span>Log out</span>
                 </Button>
              </div>
            ) : (
              <div className="grid gap-3">
                <Link href="/auth/login" onClick={() => setOpen(false)}>
                  <Button className="w-full">Log in</Button>
                </Link>
                <Link href="/auth/register" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
