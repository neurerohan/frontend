"use client"

import Head from "next/head"
import { useRouter } from "next/router"

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  ogType?: "website" | "article" | "profile" | "course"
  canonicalUrl?: string
  locale?: string
  structuredData?: Record<string, any>
}

export function MetaTags({
  title = "Course Compass Nepal - Career Guidance & Learning Paths",
  description = "Nepal's leading platform for personalized learning paths, career guidance, and free resources for SEE, +2, Bachelor students and IT professionals in Nepal.",
  keywords = [
    "learning paths Nepal",
    "career guidance Nepal",
    "IT courses Nepal",
    "free online courses Nepal",
    "SEE preparation Nepal",
    "Bachelor IT courses Nepal",
    "programming courses Nepal",
    "digital skills Nepal",
  ],
  ogImage = "/images/course-compass-nepal-og.jpg",
  ogType = "website",
  canonicalUrl,
  locale = "en_NP",
  structuredData,
}: MetaTagsProps) {
  const router = useRouter()
  const currentUrl = canonicalUrl || `https://education.nyure.com.np${router.asPath}`

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={ogImage.startsWith("http") ? ogImage : `https://education.nyure.com.np${ogImage}`}
      />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="Course Compass Nepal" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta
        property="twitter:image"
        content={ogImage.startsWith("http") ? ogImage : `https://education.nyure.com.np${ogImage}`}
      />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      )}

      {/* Font support for Nepali */}
      <link
        href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
    </Head>
  )
}
