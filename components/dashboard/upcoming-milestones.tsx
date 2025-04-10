import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function UpcomingMilestones() {
  const milestones = [
    {
      id: 1,
      title: "Complete 'JavaScript Fundamentals' quiz",
      dueDate: "Today",
      path: "Web Development Fundamentals",
      completed: false,
    },
    {
      id: 2,
      title: "Submit 'CSS Layout' project",
      dueDate: "Tomorrow",
      path: "Web Development Fundamentals",
      completed: false,
    },
    {
      id: 3,
      title: "Attend 'React Hooks' live session",
      dueDate: "May 15, 2023",
      path: "Advanced React",
      completed: false,
    },
    {
      id: 4,
      title: "Complete 'API Integration' module",
      dueDate: "May 20, 2023",
      path: "Web Development Fundamentals",
      completed: true,
    },
    {
      id: 5,
      title: "Schedule mentorship session",
      dueDate: "May 25, 2023",
      path: null,
      completed: false,
    },
  ]

  return (
    <div className="space-y-4">
      {milestones.map((milestone) => (
        <div key={milestone.id} className={cn("flex items-start gap-4", milestone.completed && "opacity-60")}>
          <CheckCircle2
            className={cn("h-5 w-5 mt-0.5", milestone.completed ? "text-primary" : "text-muted-foreground")}
          />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{milestone.title}</p>
            <p className="text-xs text-muted-foreground">
              Due: {milestone.dueDate}
              {milestone.path && ` • ${milestone.path}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
