import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CareerMapHero() {
  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Career Map for Nepali Students</h1>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover the right career path based on your education level, interests, and goals in Nepal
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button asChild size="lg">
              <Link href="#education-level">Find Your Path</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/learn">Browse All Paths</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
