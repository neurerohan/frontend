import { BookOpen, Trophy, Users, Briefcase, MessageSquare, BarChart, Compass, Lightbulb } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <Compass className="h-10 w-10 text-primary" />,
      title: "Nepal-Focused Learning Paths",
      description: "Custom learning tracks based on Nepal's education system and job market requirements.",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Free Learning Resources",
      description: "Access quality learning materials from global platforms, curated specifically for Nepali students.",
    },
    {
      icon: <Trophy className="h-10 w-10 text-primary" />,
      title: "Progress Tracking",
      description: "Track your learning journey with XP points, badges, and leaderboards to stay motivated.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Nepali Mentors Network",
      description: "Connect with experienced Nepali professionals who can guide your career journey.",
    },
    {
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      title: "Nepal Job Board",
      description: "Discover internships and job opportunities from Nepali companies and startups.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Community Forums",
      description: "Join a community of Nepali learners to ask questions and form study groups.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: "Skill Analytics",
      description: "Visualize your progress and identify skills in demand in the Nepali job market.",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      title: "Career Recommendations",
      description: "Receive personalized career path recommendations based on Nepal's growing industries.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features for Nepali Learners</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to accelerate your learning journey and achieve your career goals in Nepal.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-4 text-center"
            >
              {feature.icon}
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
