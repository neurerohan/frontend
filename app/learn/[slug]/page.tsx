import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { LearningPathHero } from "@/components/learning-paths/learning-path-hero"
import { LearningPathContent } from "@/components/learning-paths/learning-path-content"
import { LearningPathSidebar } from "@/components/learning-paths/learning-path-sidebar"
import { api } from "@/lib/api" // Import the api utility
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

// Updated function to return data/error
async function getLearningPath(slug: string): Promise<{ data: LearningPath | null; error: string | null }> {
  try {
    const pathDataRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/learning-paths/${slug}/`, {
       method: 'GET',
       headers: { 'Content-Type': 'application/json' },
       cache: 'no-store',
     });

     if (!pathDataRes.ok) {
        if (pathDataRes.status === 404) {
          // Specific handling for 404 is done via notFound() in the component
          return { data: null, error: 'Not Found' }; 
        }
        console.error(`API Error fetching path ${slug}: ${pathDataRes.status}`);
        return { data: null, error: `Failed to fetch learning path (status: ${pathDataRes.status})` };
     }

     const pathData = await pathDataRes.json();
     return { data: pathData, error: null };

  } catch (error: any) {
    console.error(`Error fetching learning path ${slug}:`, error);
    return { data: null, error: error.message || "An unknown error occurred while fetching the learning path." }; 
  }
}

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { data: path, error } = await getLearningPath(params.slug);

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
  const { data: path, error } = await getLearningPath(params.slug);

  // Handle Not Found specifically
  if (error === 'Not Found') {
    notFound();
  }

  // Handle other errors
  if (error) {
      return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 container flex items-center justify-center px-4 py-8 md:px-6 md:py-12">
                <Alert variant="destructive" className="max-w-lg">
                    <AlertTitle>Error Loading Learning Path</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </main>
            <SiteFooter />
        </div>
        );
  }
  
   // Handle loading state (although unlikely to be seen in RSC unless fetch is slow)
  if (!path) {
       // Render a skeleton or loading indicator if path is null but no error (e.g., fetch in progress)
       // This state might be brief in RSC, but good practice for potential future changes.
       return <LearningPathPageSkeleton />; 
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

// Skeleton for the entire page
function LearningPathPageSkeleton() {
    return (
         <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
                {/* Hero Skeleton */}
                 <section className="w-full bg-gray-100 dark:bg-gray-800">
                     <div className="container px-4 py-8 md:px-6 md:py-12 space-y-4">
                        <div className="flex items-center gap-2 flex-wrap">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-20" />
                        </div>
                         <Skeleton className="h-10 w-3/4" />
                         <Skeleton className="h-5 w-full" />
                         <Skeleton className="h-5 w-5/6" />
                         <div className="flex flex-wrap gap-2">
                             <Skeleton className="h-6 w-16" />
                             <Skeleton className="h-6 w-20" />
                             <Skeleton className="h-6 w-24" />
                         </div>
                     </div>
                     <Skeleton className="relative w-full h-[200px] md:h-[300px] bg-gray-200 dark:bg-gray-700" />
                </section>
                {/* Content Skeleton */}
                 <div className="container px-4 py-8 md:px-6 md:py-12">
                     <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
                        {/* Left Column Skeleton */}
                         <div className="space-y-8">
                            <Card>
                                <CardHeader><Skeleton className="h-6 w-48" /></CardHeader>
                                <CardContent className="space-y-4">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                     <div className="space-y-4 mt-6">
                                         {[...Array(3)].map((_, i) => (
                                            <div key={i}>
                                                <Skeleton className="h-5 w-32 mb-2" />
                                                <Skeleton className="h-4 w-full mb-1" />
                                                <Skeleton className="h-4 w-5/6 mb-1" />
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                            {/* Tabs Skeleton */}
                             <Skeleton className="h-10 w-full rounded-md" />
                             <Skeleton className="h-40 w-full rounded-md" />
                         </div>
                         {/* Right Column (Sidebar) Skeleton */}
                        <div className="space-y-6">
                             <Card>
                                 <CardHeader><Skeleton className="h-6 w-36" /></CardHeader>
                                 <CardContent className="space-y-4">
                                     <div className="grid grid-cols-2 gap-4">
                                         {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 w-full"/>)}
                                     </div>
                                     <Skeleton className="h-px w-full"/>
                                     <div className="flex items-center gap-2">
                                         <Skeleton className="h-8 w-8 rounded-full" />
                                         <div className="space-y-1"><Skeleton className="h-4 w-24"/><Skeleton className="h-3 w-16"/></div>
                                     </div>
                                     <Skeleton className="h-10 w-full"/>
                                 </CardContent>
                             </Card>
                              <Card>
                                  <CardHeader><Skeleton className="h-6 w-40" /></CardHeader>
                                  <CardContent className="space-y-4">
                                     {[...Array(4)].map((_, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between"><Skeleton className="h-4 w-20"/><Skeleton className="h-4 w-12"/></div>
                                            <Skeleton className="h-2 w-full"/>
                                        </div>
                                    ))}
                                  </CardContent>
                              </Card>
                         </div>
                     </div>
                 </div>
             </main>
             <SiteFooter />
         </div>
     );
}
