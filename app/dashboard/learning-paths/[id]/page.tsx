import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, BookOpen, CheckCircle2, Clock, Users, Trophy } from "lucide-react"
import { PathSteps } from "@/components/learning-paths/path-steps"
import { PathResources } from "@/components/learning-paths/path-resources"
import { PathDiscussion } from "@/components/learning-paths/path-discussion"

export default function LearningPathPage({ params }: { params: { id: string } }) {
  // This would be fetched from the API in a real application
  const path = {
    id: 1,
    title: "Web Development Fundamentals",
    description:
      "Learn HTML, CSS, JavaScript, and responsive design principles to build modern websites. This comprehensive path covers everything from basic markup to advanced interactive features.",
    level: "Beginner",
    duration: "3 months",
    enrolledCount: 2500,
    completionCount: 1200,
    image: "/placeholder.svg?height=300&width=800",
    status: "in_progress",
    progress: 65,
    creator: {
      name: "Course Compass Team",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Web Accessibility"],
    steps: [
      {
        id: 1,
        title: "Introduction to HTML",
        description: "Learn the basics of HTML markup and document structure",
        type: "lesson",
        duration: 60,
        status: "completed",
      },
      {
        id: 2,
        title: "CSS Fundamentals",
        description: "Master the basics of styling web pages with CSS",
        type: "lesson",
        duration: 90,
        status: "completed",
      },
      {
        id: 3,
        title: "CSS Layout Techniques",
        description: "Learn flexbox, grid, and responsive design principles",
        type: "lesson",
        duration: 120,
        status: "in_progress",
      },
      {
        id: 4,
        title: "Introduction to JavaScript",
        description: "Learn the basics of JavaScript programming",
        type: "lesson",
        duration: 150,
        status: "not_started",
      },
      {
        id: 5,
        title: "DOM Manipulation",
        description: "Learn how to interact with the Document Object Model",
        type: "lesson",
        duration: 120,
        status: "not_started",
      },
      {
        id: 6,
        title: "Building a Responsive Website",
        description: "Apply your knowledge to build a complete responsive website",
        type: "project",
        duration: 240,
        status: "not_started",
      },
    ],
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/learning-paths">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">{path.title}</h2>
      </div>

      <div className="relative w-full h-[200px] md:h-[300px] rounded-lg overflow-hidden">
        <Image src={path.image || "/placeholder.svg"} alt={path.title} fill className="object-cover" />
      </div>

      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>About this Learning Path</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{path.description}</p>
              <div className="flex flex-wrap gap-2">
                {path.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="steps" className="space-y-4">
            <TabsList>
              <TabsTrigger value="steps">Steps</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            <TabsContent value="steps" className="space-y-4">
              <PathSteps steps={path.steps} />
            </TabsContent>
            <TabsContent value="resources" className="space-y-4">
              <PathResources pathId={params.id} />
            </TabsContent>
            <TabsContent value="discussion" className="space-y-4">
              <PathDiscussion pathId={params.id} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{path.progress}%</span>
                </div>
                <Progress value={path.progress} />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <Clock className="h-5 w-5 text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground">Estimated</span>
                  <span className="font-medium">{path.duration}</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground">Completed</span>
                  <span className="font-medium">2/6 Steps</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <BookOpen className="h-5 w-5 text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground">Resources</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                  <Trophy className="h-5 w-5 text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground">XP Reward</span>
                  <span className="font-medium">500 XP</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden">
                      <Image
                        src={path.creator.avatar || "/placeholder.svg"}
                        alt={path.creator.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{path.creator.name}</p>
                      <p className="text-xs text-muted-foreground">Creator</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{path.enrolledCount} enrolled</span>
                  <span className="mx-1">•</span>
                  <span>{path.completionCount} completed</span>
                </div>
              </div>
              <Button className="w-full">Continue Learning</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Study Group</CardTitle>
              <CardDescription>Join others learning this path</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Join Study Group
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
