import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Search, Filter } from "lucide-react"

export default function LearningPathsPage() {
  const paths = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      description: "Learn HTML, CSS, JavaScript, and responsive design principles",
      level: "Beginner",
      duration: "3 months",
      enrolledCount: 2500,
      image: "/placeholder.svg?height=100&width=200",
      status: "in_progress",
      progress: 65,
    },
    {
      id: 2,
      title: "Full-Stack Web Development",
      description: "Learn frontend and backend technologies to build complete web applications",
      level: "Intermediate",
      duration: "6 months",
      enrolledCount: 1250,
      image: "/placeholder.svg?height=100&width=200",
      status: "enrolled",
      progress: 0,
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      description: "Master the basics of data analysis, visualization, and machine learning",
      level: "Beginner",
      duration: "4 months",
      enrolledCount: 980,
      image: "/placeholder.svg?height=100&width=200",
      status: "not_enrolled",
      progress: 0,
    },
    {
      id: 4,
      title: "Mobile App Development",
      description: "Build cross-platform mobile applications using React Native",
      level: "Intermediate",
      duration: "5 months",
      enrolledCount: 750,
      image: "/placeholder.svg?height=100&width=200",
      status: "not_enrolled",
      progress: 0,
    },
    {
      id: 5,
      title: "UI/UX Design Principles",
      description: "Learn user interface and experience design fundamentals",
      level: "Beginner",
      duration: "3 months",
      enrolledCount: 1100,
      image: "/placeholder.svg?height=100&width=200",
      status: "completed",
      progress: 100,
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Learning Paths</h2>
        <Button>Create Custom Path</Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search learning paths..." className="w-full pl-8" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Paths</TabsTrigger>
          <TabsTrigger value="my_paths">My Paths</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
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
                        {path.status === "in_progress" && (
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${path.progress}%` }}></div>
                          </div>
                        )}
                      </div>
                      <div className="mt-4">
                        {path.status === "not_enrolled" ? (
                          <Button asChild size="sm" className="w-full sm:w-auto">
                            <Link href={`/dashboard/learning-paths/${path.id}`}>Enroll Now</Link>
                          </Button>
                        ) : (
                          <Button asChild size="sm" variant="outline" className="w-full sm:w-auto">
                            <Link href={`/dashboard/learning-paths/${path.id}`}>
                              {path.status === "completed" ? "View Path" : "Continue Learning"}{" "}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="my_paths" className="space-y-4">
          <div className="grid gap-4">
            {paths
              .filter((path) => ["enrolled", "in_progress", "completed"].includes(path.status))
              .map((path) => (
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
                          {path.status === "in_progress" && (
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div
                                className="bg-primary h-2.5 rounded-full"
                                style={{ width: `${path.progress}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                        <div className="mt-4">
                          <Button asChild size="sm" variant="outline" className="w-full sm:w-auto">
                            <Link href={`/dashboard/learning-paths/${path.id}`}>
                              {path.status === "completed" ? "View Path" : "Continue Learning"}{" "}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="in_progress" className="space-y-4">
          <div className="grid gap-4">
            {paths
              .filter((path) => path.status === "in_progress")
              .map((path) => (
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
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${path.progress}%` }}></div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button asChild size="sm" variant="outline" className="w-full sm:w-auto">
                            <Link href={`/dashboard/learning-paths/${path.id}`}>
                              Continue Learning <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {paths
              .filter((path) => path.status === "completed")
              .map((path) => (
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
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `100%` }}></div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button asChild size="sm" variant="outline" className="w-full sm:w-auto">
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
