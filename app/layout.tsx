// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Mukta } from "next/font/google";
import { Providers } from "@/components/providers"; // Assuming this wraps context providers if needed
import "@/styles/globals.css";
import { cn } from "@/lib/utils"; // Assuming you have this utility from Shadcn

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMukta = Mukta({
  subsets: ["latin", "devanagari"], // Include devanagari subset
  weight: ["400", "700"], // Adjust weights as needed
  variable: "--font-mukta",
});

export const metadata: Metadata = {
  title: "Nyure Education",
  description: "Your Learning Journey Starts Here | Nyure Education Nepal",
  // Add more SEO metadata here (icons, open graph, etc.)
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
          "min-h-screen bg-background font-sans antialiased", // Use font-sans by default
          fontSans.variable,
          fontMukta.variable // Make Mukta available via CSS variable if needed elsewhere
        )}
      >
        <Providers>
          {/* <Providers> You might wrap children with other global providers here */}
            {children}
          {/* </Providers> */}
        </Providers>
      </body>
    </html>
  );
} 