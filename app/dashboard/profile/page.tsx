'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { api } from "@/lib/api" // Use the client-side fetcher

// Define profile structure based on backend description
interface UserProfile {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  avatar?: string | null; // URL
  bio?: string | null;
  xp_points?: number;
  level?: number;
  level_progress?: number;
  is_mentor?: boolean;
  is_mentee?: boolean;
  linkedin_profile?: string | null;
  github_profile?: string | null;
  personal_website?: string | null;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchProfile = async () => {
        setIsLoading(true);
        setError(null);
        try {
          // fetchAPI includes the auth header automatically
          const profileData = await api.get('/users/me/');
          setProfile(profileData);
        } catch (err: any) {
          console.error("Failed to fetch profile:", err);
          setError(err.message || "Failed to load profile data.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchProfile();
    } else if (status === 'unauthenticated') {
      // Handle case where user is not logged in (optional: redirect?)
      setIsLoading(false);
       setError("You must be logged in to view your profile.");
    } 
    // 'loading' status is handled by the main isLoading state

  }, [status]);

  // Handle session loading state
  if (status === 'loading' || isLoading) {
    return <ProfileSkeleton />;
  }

  // Handle errors
  if (error) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <Alert variant="destructive" className="max-w-md">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        </div>
    );
  }

  // Handle no profile data (shouldn't happen if authenticated and fetch succeeds)
  if (!profile) {
     return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <p>Could not load profile data.</p>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative h-20 w-20 rounded-full overflow-hidden border">
             <Image 
                src={profile.avatar || '/placeholder-avatar.svg'} // Provide a default avatar
                alt={profile.username} 
                fill 
                className="object-cover"
             />
          </div>
          <div className="flex-1">
            <CardTitle className="text-2xl">{profile.full_name || profile.username}</CardTitle>
            <CardDescription>@{profile.username} | {profile.email}</CardDescription>
            {/* Add Level/XP display if available */}
            {profile.level !== undefined && profile.xp_points !== undefined && (
                <div className="text-sm text-muted-foreground mt-1">
                    Level {profile.level} ({profile.xp_points} XP)
                    {/* Add progress bar if needed: <Progress value={profile.level_progress} className="mt-1 h-1" /> */}
                </div>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={() => signOut()}>Sign Out</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-1">Bio</h3>
            <p className="text-sm text-muted-foreground">{profile.bio || "No bio provided."}</p>
          </div>
          {/* Add sections for social links, etc. */}
          {(profile.linkedin_profile || profile.github_profile || profile.personal_website) && (
             <div>
                <h3 className="font-semibold mb-1">Links</h3>
                 <div className="flex flex-wrap gap-4 text-sm">
                    {profile.linkedin_profile && <a href={profile.linkedin_profile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>}
                    {profile.github_profile && <a href={profile.github_profile} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:underline">GitHub</a>}
                    {profile.personal_website && <a href={profile.personal_website} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Website</a>}
                 </div>
             </div>
          )}
          {/* Add Edit Profile Button */} 
          {/* <Button variant="secondary" className="mt-4">Edit Profile</Button> */} 
        </CardContent>
      </Card>
    </div>
  );
}

// Skeleton component for loading state
function ProfileSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-32 mt-1" />
          </div>
          <Skeleton className="h-8 w-20" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Skeleton className="h-5 w-16 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-3/4" />
          </div>
           <div>
            <Skeleton className="h-5 w-12 mb-2" />
             <div className="flex flex-wrap gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 