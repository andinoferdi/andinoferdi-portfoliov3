/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Turbopack for both dev and build
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lottie.host",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "pzifcyixpavjgjrwdveb.supabase.co",
      },
    ],
    unoptimized: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Optimize for React 19
  experimental: {
    reactCompiler: false, // Can be enabled later when stable
    ppr: false, // Partial Prerendering - can be enabled for better performance
  },
  // Enhanced performance settings
  poweredByHeader: false,
  compress: true,
  // Ensure compatibility with React 19
  reactStrictMode: true,
};

export default nextConfig;
