import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bookmark, ExternalLink, Clock, Play } from "lucide-react"

interface PathResourcesProps {
  pathId: string
}

export function PathResources({ pathId }: PathResourcesProps) {
  // This would be fetched from the API in a real application
  const resources = [
    {
      id: 1,
      title: "HTML & CSS Crash Course",
      description: "A comprehensive introduction to HTML and CSS for beginners",
      type: "video",
      provider: "YouTube",
      duration: 45,
      url: "#",
      thumbnail: "/placeholder.svg?height=100&width=200",
      isFree: true,
      isBookmarked: true,
    },
    {
      id: 2,
      title: "Modern JavaScript for Beginners",
      description: "Learn JavaScript from scratch with practical examples",
      type: "course",
      provider: "Udemy",
      duration: 360,
      url: "#",
      thumbnail: "/placeholder.svg?height=100&width=200",
      isFree: false,
      isBookmarked: false,
    },
    {
      id: 3,
      title: "Responsive Web Design Principles",
      description: "Master the art of building websites that work on any device",
      type: "article",
      provider: "MDN Web Docs",
      duration: 20,
      url: "#",
      thumbnail: "/placeholder.svg?height=100&width=200",
      isFree: true,
      isBookmarked: false,
    },
    {
      id: 4,
      title: "CSS Grid and Flexbox for Beginners",
      description: "A complete guide to modern CSS layout techniques",
      type: "video",
      provider: "YouTube",
      duration: 60,
      url: "#",
      thumbnail: "/placeholder.svg?height=100&width=200",
      isFree: true,
      isBookmarked: true,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Recommended Resources</h3>
        <Button variant="outline" size="sm">
          Add Resource
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {resources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full px-2 py-0 text-xs">
                      {resource.type}
                    </Badge>
                    <Badge variant="outline" className="rounded-full px-2 py-0 text-xs">
                      {resource.provider}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{resource.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bookmark className={`h-4 w-4 ${resource.isBookmarked ? "fill-current" : ""}`} />
                  <span className="sr-only">Bookmark</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="relative aspect-video w-full overflow-hidden rounded-md">
                <Image
                  src={resource.thumbnail || "/placeholder.svg"}
                  alt={resource.title}
                  fill
                  className="object-cover"
                />
                {resource.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground">
                      <Play className="h-6 w-6" />
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    {resource.duration >= 60
                      ? `${Math.floor(resource.duration / 60)}h ${resource.duration % 60}m`
                      : `${resource.duration}m`}
                  </span>
                </div>
                <div>
                  {resource.isFree ? (
                    <Badge variant="secondary" className="px-2 py-0 text-xs">
                      Free
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="px-2 py-0 text-xs">
                      Premium
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                  View Resource <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
