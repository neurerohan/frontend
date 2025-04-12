import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Bookmark, Star } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"

// Define resource structure based on backend description
interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  resource_type: { name: string }; // Assuming nested object
  provider: { name: string }; // Assuming nested object
  difficulty: string;
  is_free: boolean;
  skills: { name: string }[]; // Assuming list of nested skill objects
  // Add other relevant fields: thumbnail, duration_minutes, view_count, etc.
}

// Make ResourcesPage a client component to use hooks
'use client'

export default function ResourcesPage() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const [resources, setResources] = useState<Resource[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
       setIsLoading(true);
       setError(null);
       let fetchedData: any;
       try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
          });
          
          if (!res.ok) { 
             let errorMsg = `Failed to fetch resources (status: ${res.status})`;
             try {
                const errorData = await res.json();
                errorMsg = errorData?.detail || errorData?.message || errorMsg;
             } catch (parseError) {
                 console.warn("Could not parse error response body.");
             }
             throw new Error(errorMsg); 
          }

          fetchedData = await res.json();

          const resourceList = Array.isArray(fetchedData) 
                                ? fetchedData 
                                : (fetchedData && Array.isArray(fetchedData.results)) 
                                    ? fetchedData.results 
                                    : null;
          
          if (resourceList === null) {
             console.warn("Unexpected API response structure for resources:", fetchedData);
             throw new Error("Received unexpected data structure from API.");
          }

          setResources(resourceList);

       } catch (err: any) {
         console.error("Error fetching resources:", err);
         setError(err.message || "An unknown error occurred while fetching resources.");
         setResources(null);
       } finally {
         setIsLoading(false);
       }
    };

    fetchResources();

  }, []);

  const handleBookmark = (resourceId: number) => {
     if (!isAuthenticated) { alert("Please log in to bookmark resources."); return; }
     console.log(`User ${session?.user?.id} toggling bookmark for resource ${resourceId}`);
     alert("Bookmark functionality not implemented yet.");
  };

  const handleRate = (resourceId: number) => {
     if (!isAuthenticated) { alert("Please log in to rate resources."); return; }
     console.log(`User ${session?.user?.id} rating resource ${resourceId}`);
     alert("Rating functionality not implemented yet.");
  };

  if (isLoading) {
     return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
            <h1 className="text-3xl font-bold mb-6"><Skeleton className="h-8 w-64" /></h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => <ResourceCardSkeleton key={i} />)}
            </div>
            </main>
            <SiteFooter />
        </div>
     );
  }

  if (error) {
     return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 container flex items-center justify-center px-4 py-8 md:px-6 md:py-12">
             <Alert variant="destructive" className="max-w-lg">
                 <AlertTitle>Error Loading Resources</AlertTitle>
                 <AlertDescription>{error}</AlertDescription>
             </Alert>
        </main>
        <SiteFooter />
       </div>
     );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
        <h1 className="text-3xl font-bold mb-6">Educational Resources</h1>
        
        {resources && resources.length === 0 && (
          <p>No resources found.</p>
        )}
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources?.map((resource) => (
            <Card key={resource.id} className="flex flex-col">
               <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                        <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {resource.title}
                        <ExternalLink className="inline-block h-4 w-4 ml-1 align-middle"/>
                        </Link>
                    </CardTitle>
                    <Badge variant={resource.is_free ? "secondary" : "outline"}>
                        {resource.is_free ? "Free" : "Paid"}
                    </Badge>
                    </div>
                 <CardDescription className="line-clamp-2 h-10">{resource.description}</CardDescription>
               </CardHeader>
               <CardContent className="space-y-2 flex-grow">
                  <div className="text-sm text-muted-foreground">
                    <span>Type: {resource.resource_type?.name || 'N/A'}</span> | 
                    <span> Provider: {resource.provider?.name || 'N/A'}</span> | 
                    <span> Difficulty: {resource.difficulty || 'N/A'}</span>
                    </div>
                  {resource.skills && resource.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {resource.skills.map(skill => (
                        <Badge key={skill.name} variant="outline">{skill.name}</Badge>
                        ))}
                    </div>
                    )}
               </CardContent>
              <CardFooter className="border-t pt-4 mt-auto">
                 <div className="flex justify-end space-x-2 w-full">
                     <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleBookmark(resource.id)}
                        title="Bookmark"
                        disabled={status === 'loading'}
                      >
                         <Bookmark className="h-4 w-4" />
                     </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRate(resource.id)}
                        title="Rate"
                        disabled={status === 'loading'}
                       >
                         <Star className="h-4 w-4" />
                     </Button>
                 </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function ResourceCardSkeleton() {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <Skeleton className="h-5 w-3/4"/>
                    <Skeleton className="h-5 w-12"/>
                </div>
                 <Skeleton className="h-4 w-full mt-1"/>
                 <Skeleton className="h-4 w-5/6 mt-1"/>
            </CardHeader>
             <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full"/>
                 <div className="flex flex-wrap gap-1">
                    <Skeleton className="h-5 w-16"/>
                    <Skeleton className="h-5 w-20"/>
                    <Skeleton className="h-5 w-14"/>
                </div>
            </CardContent>
        </Card>
    );
} 