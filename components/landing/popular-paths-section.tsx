import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PopularPathsSection() {
  const popularPaths = [
    {
      id: 1,
      title: "Web Development for Nepali Market",
      description:
        "Learn to build websites and web applications with a focus on Nepal's business needs and local market.",
      level: "Beginner to Intermediate",
      duration: "4 months",
      enrolledCount: 1250,
      image: "/placeholder.svg?height=100&width=200",
      slug: "web-development-nepal",
    },
    {
      id: 2,
      title: "Digital Marketing in Nepal",
      description: "Master digital marketing strategies specifically for Nepali businesses and consumers.",
      level: "Beginner",
      duration: "3 months",
      enrolledCount: 980,
      image: "/placeholder.svg?height=100&width=200",
      slug: "digital-marketing-nepal",
    },
    {
      id: 3,
      title: "SEE Computer Science Preparation",
      description: "Comprehensive preparation for SEE Computer Science with practice questions and exam strategies.",
      level: "Beginner",
      duration: "6 months",
      enrolledCount: 1750,
      image: "/placeholder.svg?height=100&width=200",
      slug: "see-computer-science",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Popular Learning Paths in Nepal</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover the most in-demand skills and courses for Nepali students and professionals
            </p>
          </div>
        </div>
        <div className="grid gap-6 mt-12">
          {popularPaths.map((path) => (
            <Card key={path.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative h-48 w-full sm:h-auto sm:w-1/3">
                    <Image src={path.image || "/placeholder.svg"} alt={path.title} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-xl">{path.title}</h3>
                        <Badge variant="outline">{path.level}</Badge>
                      </div>
                      <p className="text-muted-foreground">{path.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{path.duration}</span>
                        <span className="mx-2">•</span>
                        <span>{path.enrolledCount} enrolled</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button asChild size="sm" className="w-full sm:w-auto">
                        <Link href={`/learn/${path.slug}`}>
                          View Path <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link href="/career-map">
              Explore All Career Paths <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
