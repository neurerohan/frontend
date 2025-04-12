import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Clock, CheckCircle2, Users, Trophy } from "lucide-react"
import { useSession } from "next-auth/react"

interface LearningPathSidebarProps {
  path: {
    id: number
    duration: string
    enrolledCount: number
    creator: {
      name: string
      avatar: string
    }
  }
}

export function LearningPathSidebar({ path }: LearningPathSidebarProps) {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const handleEnroll = async () => {
      if (!isAuthenticated) {
         // Redirect to login or show message
         console.log("User not authenticated. Redirecting to login...");
         // router.push('/auth/login?callbackUrl=/learn/' + path.slug);
         return;
      }
      console.log(`Attempting to enroll user ${session?.user?.id} in path ID: ${path.id}`);
       // Placeholder for API call: POST /api/learning-paths/{id}/enroll/
       try {
        // const response = await api.post(`/learning-paths/${path.id}/enroll/`);
         // console.log("Enrollment successful:", response);
         // Update UI state (e.g., change button text)
         alert("Enrollment feature not fully implemented yet.");
       } catch (error) {
         console.error("Enrollment failed:", error);
         alert("Enrollment failed. See console for details.");
       }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enroll for Free</CardTitle>
          <CardDescription>Start learning at your own pace</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col items-center justify-center rounded-lg border p-3">
              <Clock className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="text-xs text-muted-foreground">Duration</span>
              <span className="font-medium">{path.duration}</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border p-3">
              <Users className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="text-xs text-muted-foreground">Enrolled</span>
              <span className="font-medium">{path.enrolledCount.toLocaleString()}</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border p-3">
              <Trophy className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="text-xs text-muted-foreground">Certificate</span>
              <span className="font-medium">Included</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border p-3">
              <CheckCircle2 className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="text-xs text-muted-foreground">Language</span>
              <span className="font-medium">English</span>
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
          </div>
          <Button className="w-full" onClick={handleEnroll} disabled={status === 'loading'}>
             {isAuthenticated ? "Enroll Now - Free" : "Log in to Enroll"} 
             {/* // Add logic here to show "Enrolled" or progress if user is already enrolled */}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nepal Job Market</CardTitle>
          <CardDescription>Demand for these skills in Nepal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Kathmandu Valley</span>
              <span className="font-medium">High</span>
            </div>
            <Progress value={85} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Other Major Cities</span>
              <span className="font-medium">Medium</span>
            </div>
            <Progress value={60} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Remote Work</span>
              <span className="font-medium">Very High</span>
            </div>
            <Progress value={95} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Freelance</span>
              <span className="font-medium">High</span>
            </div>
            <Progress value={80} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
