import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PathSteps } from "@/components/learning-paths/path-steps"
import { PathResources } from "@/components/learning-paths/path-resources"
import { PathDiscussion } from "@/components/learning-paths/path-discussion"

interface LearningPathContentProps {
  path: {
    title: string
    longDescription: string
    prerequisites: string[]
    outcomes: string[]
    jobOpportunities: string[]
    avgSalary: string
    steps: any[]
  }
}

export function LearningPathContent({ path }: LearningPathContentProps) {
  if (!path) {
    return <div>Loading path details...</div>;
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>About this Learning Path</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{path.longDescription}</p>

          <div className="space-y-4 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Prerequisites</h3>
              <ul className="list-disc pl-5 space-y-1">
                {path.prerequisites.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What You'll Learn</h3>
              <ul className="list-disc pl-5 space-y-1">
                {path.outcomes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Job Opportunities in Nepal</h3>
              <ul className="list-disc pl-5 space-y-1">
                {path.jobOpportunities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-muted-foreground">Average Salary: {path.avgSalary}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="steps" className="space-y-4">
        <TabsList>
          <TabsTrigger value="steps">Learning Steps</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
        </TabsList>
        <TabsContent value="steps" className="space-y-4">
          <PathSteps steps={path.steps} />
        </TabsContent>
        <TabsContent value="resources" className="space-y-4">
          <PathResources pathId={path.title} />
        </TabsContent>
        <TabsContent value="discussion" className="space-y-4">
          <PathDiscussion pathId={path.title} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
