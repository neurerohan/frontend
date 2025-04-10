import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface LearningPathHeroProps {
  path: {
    title: string
    description: string
    level: string
    duration: string
    image: string
    skills: string[]
  }
}

export function LearningPathHero({ path }: LearningPathHeroProps) {
  return (
    <section className="w-full bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline">{path.level}</Badge>
              <Badge variant="outline">{path.duration}</Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{path.title}</h1>
            <p className="text-muted-foreground md:text-xl">{path.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {path.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="relative w-full h-[200px] md:h-[300px]">
        <Image src={path.image || "/placeholder.svg"} alt={path.title} fill className="object-cover" priority />
      </div>
    </section>
  )
}
