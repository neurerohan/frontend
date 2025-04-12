import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { LearningPathHero } from "@/components/learning-paths/learning-path-hero"
import { LearningPathContent } from "@/components/learning-paths/learning-path-content"
import { LearningPathSidebar } from "@/components/learning-paths/learning-path-sidebar"

// This would come from your API in production
const paths = [
  {
    slug: "web-development-nepal",
    title: "Web Development for Nepali Market",
    description:
      "Learn to build websites and web applications with a focus on Nepal's business needs and local market.",
    longDescription:
      "This comprehensive learning path will teach you how to build websites and web applications specifically tailored for Nepali businesses and organizations. You'll learn HTML, CSS, JavaScript, and modern frameworks while focusing on local market needs, payment gateways used in Nepal, and localization considerations.",
    level: "Beginner to Intermediate",
    duration: "4 months",
    enrolledCount: 1250,
    image: "/placeholder.svg?height=300&width=800",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB", "Nepali Language Support"],
    prerequisites: ["Basic computer knowledge", "Internet access", "Dedication to practice"],
    outcomes: [
      "Build responsive websites for Nepali businesses",
      "Implement local payment gateways like eSewa and Khalti",
      "Create multilingual sites supporting Nepali language",
      "Deploy websites to hosting providers popular in Nepal",
    ],
    jobOpportunities: [
      "Web Developer in Kathmandu IT companies",
      "Freelance Web Developer for local businesses",
      "Frontend Developer in startups",
      "Full-stack Developer in established companies",
    ],
    avgSalary: "NPR 30,000 - 80,000/month for junior developers",
    creator: {
      name: "Course Compass Nepal Team",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    steps: [
      {
        id: 1,
        title: "Introduction to HTML",
        description: "Learn the basics of HTML structure.",
        type: "lesson",
        duration: 30,
        status: "not_started",
      },
      {
        id: 2,
        title: "Basic CSS Styling",
        description: "Understand how to style HTML elements.",
        type: "lesson",
        duration: 45,
        status: "not_started",
      },
       {
        id: 3,
        title: "First Project: Simple Web Page",
        description: "Build a basic web page using HTML and CSS.",
        type: "project",
        duration: 120,
        status: "not_started",
      },
    ],
  },
  // More paths would be defined here
]

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = paths.find((p) => p.slug === params.slug)

  if (!path) {
    return {
      title: "Learning Path Not Found",
      description: "The requested learning path could not be found.",
    }
  }

  return {
    title: `${path.title} | Course Compass Nepal`,
    description: path.description,
    keywords: [
      `${path.title} Nepal`,
      "learning path Nepal",
      "online course Nepal",
      `${path.title} career`,
      "free resources Nepal",
    ],
    openGraph: {
      title: `${path.title} | Course Compass Nepal`,
      description: path.description,
      type: "article",
      url: `https://education.nyure.com.np/learn/${path.slug}`,
      images: [
        {
          url: path.image,
          width: 800,
          height: 300,
          alt: path.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${path.title} | Course Compass Nepal`,
      description: path.description,
      images: [path.image],
    },
  }
}

export default function LearningPathPage({ params }: Props) {
  const path = paths.find((p) => p.slug === params.slug)

  if (!path) {
    notFound()
  }

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: path.title,
    description: path.description,
    provider: {
      "@type": "Organization",
      name: "Course Compass Nepal",
      sameAs: "https://education.nyure.com.np",
    },
    audience: {
      "@type": "Audience",
      audienceType: "Nepali students and professionals",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      duration: `P${path.duration.split(" ")[0]}M`,
      inLanguage: "en",
    },
    occupationalCredentialAwarded: "Certificate of Completion",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "NPR",
      availability: "https://schema.org/InStock",
    },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main className="flex-1">
        <LearningPathHero path={path} />
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
            <LearningPathContent path={path} />
            <LearningPathSidebar path={path} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
