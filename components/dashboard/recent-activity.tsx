import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "completed",
      title: "Completed 'Introduction to React' lesson",
      timestamp: "2 hours ago",
      path: "Web Development Fundamentals",
    },
    {
      id: 2,
      type: "started",
      title: "Started 'CSS Grid Layout' tutorial",
      timestamp: "Yesterday",
      path: "Web Development Fundamentals",
    },
    {
      id: 3,
      type: "earned",
      title: "Earned 'JavaScript Basics' badge",
      timestamp: "2 days ago",
      path: "Web Development Fundamentals",
    },
    {
      id: 4,
      type: "joined",
      title: "Joined 'Frontend Developers' study group",
      timestamp: "3 days ago",
      path: null,
    },
    {
      id: 5,
      type: "bookmarked",
      title: "Bookmarked 'React Hooks Tutorial' resource",
      timestamp: "4 days ago",
      path: "Advanced React",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src="" alt="" />
            <AvatarFallback>
              {activity.type === "completed" && "✓"}
              {activity.type === "started" && "▶"}
              {activity.type === "earned" && "🏆"}
              {activity.type === "joined" && "👥"}
              {activity.type === "bookmarked" && "🔖"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{activity.title}</p>
            <p className="text-xs text-muted-foreground">
              {activity.timestamp}
              {activity.path && ` • ${activity.path}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
