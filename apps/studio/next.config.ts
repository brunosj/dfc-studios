import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.dfc.studio',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',

        port: '3001',
        pathname: '/**',
      },
    ],
    qualities: [25, 50, 75],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Force the build to use fresh data
  onDemandEntries: {
    // Keep fresh entries for 5 seconds
    maxInactiveAge: 5 * 1000,
  },
  // Use environment variables to control caching behavior
  env: {
    // Set to 'true' during builds to force fresh data
    NEXT_BUILD_FORCE_FRESH: process.env.NEXT_BUILD_FORCE_FRESH || 'false',
  },
};
export default nextConfig;
