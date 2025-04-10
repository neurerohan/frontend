import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Course Compass helped me structure my learning after SEE. I got into my dream +2 college and now I'm preparing for engineering entrance exams!",
      name: "Aarav Sharma",
      title: "Science Student, Kathmandu",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "As a BIT student in Pokhara, I was confused about which skills to focus on. The IT career paths here guided me to learn the right technologies for Nepal's job market.",
      name: "Srijana Thapa",
      title: "BIT Student, Pokhara",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "I was struggling to find quality learning resources that didn't cost a fortune. Course Compass connected me with free courses that helped me land a web development job in Kathmandu.",
      name: "Rohan Karki",
      title: "Web Developer, Kathmandu",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "The mentorship feature connected me with experienced Nepali professionals who guided me through my career transition from teaching to digital marketing.",
      name: "Priya Poudel",
      title: "Digital Marketer, Butwal",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Success Stories from Nepal</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from Nepali students who transformed their learning journey with Course Compass.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2 text-center">
                    <p className="text-muted-foreground">"{testimonial.quote}"</p>
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
