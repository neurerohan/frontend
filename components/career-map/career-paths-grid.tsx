import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CareerPathsGrid() {
  const careerPaths = [
    {
      id: 1,
      title: "Software Development",
      description:
        "Learn programming, web development, and software engineering skills in high demand across Nepal's IT sector.",
      level: "Multiple Levels",
      duration: "6-24 months",
      jobProspects: "Excellent",
      avgSalary: "NPR 30,000 - 150,000/month",
      image: "/placeholder.svg?height=100&width=200",
      slug: "software-development",
      educationLevel: ["plus-two", "bachelor", "professional"],
    },
    {
      id: 2,
      title: "Digital Marketing",
      description:
        "Master social media marketing, SEO, content creation, and digital advertising for Nepal's growing digital landscape.",
      level: "Beginner to Intermediate",
      duration: "3-6 months",
      jobProspects: "Good",
      avgSalary: "NPR 25,000 - 80,000/month",
      image: "/placeholder.svg?height=100&width=200",
      slug: "digital-marketing",
      educationLevel: ["plus-two", "bachelor", "professional"],
    },
    {
      id: 3,
      title: "Graphic Design",
      description:
        "Learn design principles, tools, and techniques to create visual content for Nepali businesses and organizations.",
      level: "Beginner to Intermediate",
      duration: "4-8 months",
      jobProspects: "Good",
      avgSalary: "NPR 20,000 - 60,000/month",
      image: "/placeholder.svg?height=100&width=200",
      slug: "graphic-design",
      educationLevel: ["see", "plus-two", "bachelor"],
    },
    {
      id: 4,
      title: "SEE to Science Stream",
      description:
        "Prepare for +2 science stream with foundational courses in Physics, Chemistry, Biology, and Mathematics.",
      level: "Beginner",
      duration: "12 months",
      jobProspects: "N/A",
      avgSalary: "N/A",
      image: "/placeholder.svg?height=100&width=200",
      slug: "see-to-science",
      educationLevel: ["see"],
    },
    {
      id: 5,
      title: "BIT/BCA Preparation",
      description:
        "Prepare for Bachelor of Information Technology or Computer Applications entrance exams and coursework.",
      level: "Intermediate",
      duration: "3-6 months",
      jobProspects: "N/A",
      avgSalary: "N/A",
      image: "/placeholder.svg?height=100&width=200",
      slug: "bit-bca-preparation",
      educationLevel: ["plus-two"],
    },
    {
      id: 6,
      title: "Data Analysis",
      description:
        "Learn data analysis, visualization, and basic machine learning for Nepal's emerging data-driven industries.",
      level: "Intermediate",
      duration: "6-12 months",
      jobProspects: "Growing",
      avgSalary: "NPR 35,000 - 100,000/month",
      image: "/placeholder.svg?height=100&width=200",
      slug: "data-analysis",
      educationLevel: ["bachelor", "professional"],
    },
  ]

  return (
    <div className="grid gap-6">
      {careerPaths.map((path) => (
        <Card key={path.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <div className="relative h-48 w-full sm:h-auto sm:w-1/3">
                <Image src={path.image || "/placeholder.svg"} alt={path.title} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-bold text-xl">{path.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {path.educationLevel.includes("see") && <Badge variant="secondary">SEE</Badge>}
                      {path.educationLevel.includes("plus-two") && <Badge variant="secondary">+2</Badge>}
                      {path.educationLevel.includes("bachelor") && <Badge variant="secondary">Bachelor</Badge>}
                      {path.educationLevel.includes("professional") && <Badge variant="secondary">Professional</Badge>}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{path.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Duration:</span> {path.duration}
                    </div>
                    <div>
                      <span className="font-medium">Level:</span> {path.level}
                    </div>
                    <div>
                      <span className="font-medium">Job Prospects:</span> {path.jobProspects}
                    </div>
                    <div>
                      <span className="font-medium">Avg. Salary:</span> {path.avgSalary}
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button asChild size="sm" className="w-full sm:w-auto">
                    <Link href={`/learn/${path.slug}`}>
                      View Career Path <ArrowRight className="ml-2 h-4 w-4" />
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
