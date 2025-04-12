import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock, FileText, Play, Code } from "lucide-react"
import { useSession } from "next-auth/react"

interface Step {
  id: number
  title: string
  description: string
  type: string
  duration: number
  status: string
}

interface PathStepsProps {
  steps: Step[]
}

export function PathSteps({ steps }: PathStepsProps) {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const handleStepAction = (stepId: number, currentStatus: string) => {
     if (!isAuthenticated) {
         console.log("User not authenticated. Redirecting to login...");
         // router.push('/auth/login');
         return;
     }
     
     const action = currentStatus === "completed" ? "Review" : currentStatus === "in_progress" ? "Continue" : "Start";
     console.log(`${action} step ID: ${stepId} for user ${session?.user?.id}`);

     if (action === "Start" || action === "Continue") {
         // Placeholder for API call to mark step complete/in-progress
         // This needs coordination with backend API design
         // e.g., POST /api/user-learning-paths/steps/complete/ or similar
         console.log(`Placeholder: API call to update step ${stepId} status...`);
         alert("Step completion/tracking not fully implemented yet.");
         // Potentially navigate to the step content page:
         // router.push(`/dashboard/learning-paths/${pathId}/steps/${stepId}`)
     } else { // Review action
         // Potentially navigate to the step content page for review:
         // router.push(`/dashboard/learning-paths/${pathId}/steps/${stepId}`)
         alert("Step review navigation not fully implemented yet.");
     }

  };

  // Add check for empty steps array
  if (!steps || steps.length === 0) {
      return <p className="text-muted-foreground">No steps defined for this path yet.</p>;
  }

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <Card key={step.id} className={step.status === "completed" ? "border-primary/20 bg-primary/5" : ""}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full px-2 py-0 text-xs">
                    Step {index + 1}
                  </Badge>
                  <Badge variant="secondary" className="rounded-full px-2 py-0 text-xs">
                    {step.type === "lesson" && "Lesson"}
                    {step.type === "quiz" && "Quiz"}
                    {step.type === "project" && "Project"}
                    {step.type === "resource" && "Resource"}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border">
                {step.status === "completed" && <CheckCircle className="h-5 w-5 text-primary" />}
                {step.status === "in_progress" && <Play className="h-5 w-5 text-primary" />}
                {step.status === "not_started" && <Circle className="h-5 w-5 text-muted-foreground" />}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{step.duration} min</span>
              </div>
              {step.type === "lesson" && (
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>Reading</span>
                </div>
              )}
              {step.type === "project" && (
                <div className="flex items-center gap-1">
                  <Code className="h-4 w-4" />
                  <span>Coding</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant={step.status === "completed" ? "outline" : "default"}
              size="sm"
              className="w-full sm:w-auto"
              onClick={() => handleStepAction(step.id, step.status)}
              disabled={status === 'loading'}
            >
              {step.status === "completed" && "Review"}
              {step.status === "in_progress" && "Continue"}
              {step.status === "not_started" && "Start"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
