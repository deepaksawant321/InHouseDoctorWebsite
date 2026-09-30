import type { NextConfig } from "next";

// Private / transactional areas must never be indexed (robots.txt alone doesn't prevent indexing).
const noIndexSources = ['/admin/:path*', '/dashboard/:path*', '/login', '/book/:path*', '/booking-success'];

const nextConfig: NextConfig = {
  // Allows an isolated build/dev output directory (e.g. NEXT_DIST_DIR=.next-qa) so parallel runs do not clash
  distDir: process.env.NEXT_DIST_DIR || '.next',
  async headers() {
    return noIndexSources.map((source) => ({
      source,
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
    }));
  },
};

export default nextConfig;
