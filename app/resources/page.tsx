import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

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

async function getResources(): Promise<Resource[]> {
  try {
    // Assuming /api/resources/ is public or handled by fetchAPI if client-side
    // For server-side, direct fetch is okay if public
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store', // Adjust caching as needed
    });

    if (!res.ok) {
      console.error(`API Error fetching resources: ${res.status}`);
      throw new Error('Failed to fetch resources');
    }
    const data = await res.json();
    // The actual list might be nested, e.g., data.results
    return Array.isArray(data) ? data : data.results || []; 
  } catch (error) {
    console.error("Error fetching resources:", error);
    return []; // Return empty array on error
  }
}

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
        <h1 className="text-3xl font-bold mb-6">Educational Resources</h1>
        
        {resources.length === 0 && (
          <p>No resources found or failed to load resources.</p>
        )}
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Card key={resource.id}>
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
                <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
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
              {/* Add footer for actions like bookmark, rate, etc. later */}
            </Card>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
} 