/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ed.nyure.com.np", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.nyure.com.np",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://ed.nyure.com.np/api",
  },
  // Enable SWC minification for faster builds
  swcMinify: true,
  // Configure output compression
  compress: true,
  // Configure output directory
  distDir: "build",
  // Configure trailing slash behavior
  trailingSlash: false,
  // Configure powered by header
  poweredByHeader: false,
  // Add i18n configuration for future Nepali language support
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    // Uncomment when ready to add Nepali language support
    // locales: ['en', 'ne'],
  },
}

module.exports = nextConfig
