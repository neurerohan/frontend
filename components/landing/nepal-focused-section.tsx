import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function NepalFocusedSection() {
  const audienceCards = [
    {
      title: "SEE Students",
      description:
        "Prepare for your SEE exams and explore career options after Grade 10 with our specialized learning paths.",
      icon: "/placeholder.svg?height=80&width=80",
      link: "/career-map/see-students",
    },
    {
      title: "+2 Students",
      description:
        "Discover the best career paths based on your +2 stream and prepare for entrance exams with our resources.",
      icon: "/placeholder.svg?height=80&width=80",
      link: "/career-map/plus-two-students",
    },
    {
      title: "Bachelor Students",
      description:
        "Enhance your degree with in-demand skills and prepare for the job market with our industry-aligned courses.",
      icon: "/placeholder.svg?height=80&width=80",
      link: "/career-map/bachelor-students",
    },
    {
      title: "IT Professionals",
      description: "Upskill with the latest technologies and advance your career in Nepal's growing IT industry.",
      icon: "/placeholder.svg?height=80&width=80",
      link: "/career-map/it-professionals",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Designed for Nepali Learners</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Tailored learning paths and resources specifically for students and professionals in Nepal
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {audienceCards.map((card) => (
            <Card key={card.title} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                    <Image
                      src={card.icon || "/placeholder.svg"}
                      alt={card.title}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{card.title}</h3>
                  <p className="text-muted-foreground">{card.description}</p>
                  <Button asChild variant="outline" className="mt-2">
                    <Link href={card.link}>Explore Paths</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Why Course Compass Nepal?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Curated resources specifically for Nepali education system</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Free access to quality learning materials and courses</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Career guidance aligned with Nepal's job market</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Connect with Nepali mentors and industry professionals</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Discover internship and job opportunities in Nepal</span>
                </li>
              </ul>
            </div>
            <div className="relative h-64 md:h-full min-h-[250px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Nepali students using Course Compass"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
