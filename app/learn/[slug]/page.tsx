import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { LearningPathHero } from "@/components/learning-paths/learning-path-hero"
import { LearningPathContent } from "@/components/learning-paths/learning-path-content"
import { LearningPathSidebar } from "@/components/learning-paths/learning-path-sidebar"
import { api } from "@/lib/api" // Import the api utility

// Define the expected shape of the learning path data from the API
// Adjust this based on the actual API response structure
interface LearningPath {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string; // Added based on previous component usage
  level: string;
  duration: string; // Assuming duration comes as string like "4 months"
  estimated_duration?: number; // Or maybe hours? Check API response
  enrolledCount: number; // Assuming field name, check API
  image: string; // URL
  skills: string[]; // Assuming skills are strings, check API (might be objects)
  prerequisites: string[]; // Added based on previous component usage
  outcomes: string[]; // Added based on previous component usage
  jobOpportunities: string[]; // Added based on previous component usage
  avgSalary: string; // Added based on previous component usage
  creator: { // Assuming nested creator object
    name: string;
    avatar: string; // URL
  };
  steps: any[]; // Use a more specific Step[] type if available
  // Add other fields returned by the API as needed
}

// Helper function to fetch path data (can be reused by generateMetadata and page)
async function getLearningPath(slug: string): Promise<LearningPath | null> {
  try {
    // Note: fetchAPI automatically adds the base URL
    // It doesn't include auth token here as it's called server-side.
    // If the endpoint requires auth, we'd need to pass the token manually.
    // Assuming /api/learning-paths/{slug}/ is public for now.
    const pathData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/learning-paths/${slug}/`, {
       method: 'GET',
       headers: { 'Content-Type': 'application/json' },
       // Important: Use cache control for Server Components fetching
       cache: 'no-store', // Or 'force-cache', 'revalidate' based on needs
     });

     if (!pathData.ok) {
        if (pathData.status === 404) {
          return null; // Not found
        }
        // Handle other errors if needed
        console.error(`API Error fetching path ${slug}: ${pathData.status}`);
        throw new Error(`Failed to fetch path data`);
     }

     return await pathData.json();

  } catch (error) {
    console.error(`Error fetching learning path ${slug}:`, error);
    // Depending on error handling strategy, you might re-throw or return null
    return null; // Return null on error
  }
}


type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const path = await getLearningPath(params.slug);

  if (!path) {
    return {
      title: "Learning Path Not Found",
      description: "The requested learning path could not be found.",
    }
  }

  // Use fetched data for metadata
  return {
    title: `${path.title} | Course Compass Nepal`,
    description: path.description,
    keywords: [
      `${path.title} Nepal`,
      "learning path Nepal",
      "online course Nepal",
      `${path.title} career`,
      "free resources Nepal",
      ...(path.skills || []), // Add skills as keywords if available
    ],
    openGraph: {
      title: `${path.title} | Course Compass Nepal`,
      description: path.description,
      type: "article",
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://education.nyure.com.np'}/learn/${path.slug}`, // Use an env var for base URL
      images: path.image ? [
        {
          url: path.image, // Use the image URL from the API
          // Provide width/height if known, otherwise omit or fetch them
          // width: 800,
          // height: 300,
          alt: path.title,
        },
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${path.title} | Course Compass Nepal`,
      description: path.description,
      images: path.image ? [path.image] : [], // Use the image URL from the API
    },
  }
}

// The actual page component is now async
export default async function LearningPathPage({ params }: Props) {
  const path = await getLearningPath(params.slug);

  // Handle case where path data couldn't be fetched
  if (!path) {
    notFound(); // Triggers the not-found page
  }

  // Structured data for SEO - Use fetched data
  // Adjust field names based on your API response (e.g., estimated_duration)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: path.title,
    description: path.description,
    provider: {
      "@type": "Organization",
      name: "Course Compass Nepal", // Consider making this dynamic if needed
      sameAs: process.env.NEXT_PUBLIC_BASE_URL || "https://education.nyure.com.np",
    },
    // Add other relevant schema.org properties using 'path' data
    // Example:
    // educationalLevel: path.level,
    // timeRequired: path.estimated_duration ? `PT${path.estimated_duration}H` : undefined, // ISO 8601 duration
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      {/* Add JSON-LD script safely */}
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      <main className="flex-1">
        {/* Pass the fetched path data to child components */}
        <LearningPathHero path={path} />
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
            {/* Ensure LearningPathContent expects the new path structure */}
            <LearningPathContent path={path} />
            {/* Ensure LearningPathSidebar expects the new path structure */}
            <LearningPathSidebar path={path} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
