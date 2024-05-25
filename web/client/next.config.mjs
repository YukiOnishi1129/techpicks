/** @type {import('next').NextConfig} */
const nextConfig = {
  // MEMO: when building for production, we want to use the same source maps as in development
  // productionBrowserSourceMaps: true,
  experimental: {
    typedRoutes: true,
  },
  output: "standalone",
};

export default nextConfig;
