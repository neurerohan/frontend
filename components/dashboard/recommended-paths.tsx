import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecommendedPaths() {
  const paths = [
    {
      id: 1,
      title: "Full-Stack Web Development",
      description: "Learn frontend and backend technologies to build complete web applications",
      level: "Intermediate",
      duration: "6 months",
      enrolledCount: 1250,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      description: "Master the basics of data analysis, visualization, and machine learning",
      level: "Beginner",
      duration: "4 months",
      enrolledCount: 980,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 3,
      title: "Mobile App Development",
      description: "Build cross-platform mobile applications using React Native",
      level: "Intermediate",
      duration: "5 months",
      enrolledCount: 750,
      image: "/placeholder.svg?height=100&width=200",
    },
  ]

  return (
    <div className="grid gap-4">
      {paths.map((path) => (
        <Card key={path.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <div className="relative h-48 w-full sm:h-auto sm:w-1/3">
                <Image src={path.image || "/placeholder.svg"} alt={path.title} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-between p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">{path.title}</h3>
                    <Badge variant="outline">{path.level}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{path.description}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{path.duration}</span>
                    <span className="mx-2">•</span>
                    <span>{path.enrolledCount} enrolled</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button asChild size="sm" className="w-full sm:w-auto">
                    <Link href={`/dashboard/learning-paths/${path.id}`}>
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
  )
}
