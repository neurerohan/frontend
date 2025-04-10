import { SiteHeader } from "@/components/layout/site-header"; // Assuming this component exists
import { SiteFooter } from "@/components/layout/site-footer"; // Assuming this component exists
import { Button } from "@/components/ui/button"; // Import Button
import Link from "next/link"; // Import Link
import { motion } from "framer-motion"; // Import motion
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Import Card components
import { GraduationCap, Library, Users, Briefcase, Map, Award } from "lucide-react"; // Import feature icons

// Animation variants for staggering
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger animation of children
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  },
};

// Feature data
const features = [
  {
    icon: GraduationCap,
    title: "Personalized Learning Paths",
    description: "Custom tracks tailored to your goals and level.",
  },
  {
    icon: Library,
    title: "Resource Library",
    description: "Access curated videos, articles, and courses.",
  },
  {
    icon: Users,
    title: "Mentorship System",
    description: "Connect with experienced Nepali professionals.",
  },
  {
    icon: Briefcase,
    title: "Job Board",
    description: "Discover internships and job opportunities.",
  },
  {
    icon: Map,
    title: "Career Mapping",
    description: "Get guidance on career paths based on your skills.",
  },
  {
    icon: Award,
    title: "Skills Assessment",
    description: "Track and validate your acquired skills.",
  },
];

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
       <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container flex flex-col items-center justify-center gap-6 py-12 text-center md:py-20"
        >
          <h1 className="text-4xl font-extrabold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-mukta">
            Welcome to Nyure Education!
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Your Learning Journey Starts Here. Explore learning paths, connect with mentors, and find your career path in Nepal.
          </p>
          <div className="flex gap-4 mt-4"> {/* Added button wrapper */}
            <Link href="/auth/register">
              <Button size="lg">Get Started Now</Button>
            </Link>
            {/* Optional: Add a secondary button like "Explore Features" */}
            {/* <Button variant="outline" size="lg">Learn More</Button> */}
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Animate when section scrolls into view
          viewport={{ once: true, amount: 0.2 }} // Trigger animation once, when 20% is visible
          className="container py-12 md:py-20"
        >
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight sm:text-4xl font-mukta">
            Everything You Need to Succeed
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="h-full overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-4 pb-4">
                    <feature.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                    <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardDescription className="px-6 pb-6 text-base">
                    {feature.description}
                  </CardDescription>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </main>
      <SiteFooter />
    </div>
  );
} 