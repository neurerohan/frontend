"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, MessageSquare, Flag } from "lucide-react"

interface PathDiscussionProps {
  pathId: string
}

export function PathDiscussion({ pathId }: PathDiscussionProps) {
  const [comment, setComment] = useState("")

  // This would be fetched from the API in a real application
  const discussions = [
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AJ",
      },
      content:
        "I'm having trouble with the CSS Grid layout in step 3. Can someone help me understand how to create a responsive grid that changes columns based on screen size?",
      timestamp: "2 days ago",
      likes: 5,
      replies: 2,
    },
    {
      id: 2,
      user: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SC",
      },
      content:
        "The JavaScript section was really helpful! I finally understand how to manipulate the DOM properly. The examples were clear and easy to follow.",
      timestamp: "1 week ago",
      likes: 12,
      replies: 3,
    },
    {
      id: 3,
      user: {
        name: "Miguel Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MR",
      },
      content:
        "Does anyone have additional resources for learning about web accessibility? I want to make sure my projects are accessible to everyone.",
      timestamp: "2 weeks ago",
      likes: 8,
      replies: 4,
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This would send the comment to the API in a real application
    console.log("Submitting comment:", comment)
    setComment("")
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Join the Discussion</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Textarea
              placeholder="Share your thoughts, questions, or insights..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={!comment.trim()}>
              Post Comment
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="space-y-4">
        {discussions.map((discussion) => (
          <Card key={discussion.id}>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={discussion.user.avatar} alt={discussion.user.name} />
                  <AvatarFallback>{discussion.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{discussion.user.name}</p>
                      <p className="text-xs text-muted-foreground">{discussion.timestamp}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Flag className="h-4 w-4" />
                      <span className="sr-only">Report</span>
                    </Button>
                  </div>
                  <p className="text-sm">{discussion.content}</p>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{discussion.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>{discussion.replies}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
