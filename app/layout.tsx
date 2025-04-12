// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Mukta } from "next/font/google";
import { AuthProvider } from "@/components/auth/auth-provider";
import { SessionErrorHandler } from "@/components/auth/session-error-handler";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMukta = Mukta({
  subsets: ["latin", "devanagari"],
  weight: ["400", "700"],
  variable: "--font-mukta",
});

export const metadata: Metadata = {
  title: "Course Compass Nepal - Your Learning Journey",
  description: "Your Learning Journey Starts Here | Course Compass Nepal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMukta.variable
        )}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SessionErrorHandler />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 