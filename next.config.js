/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: '**' }]
  },
  optimizeFonts: false,
  experimental: { typedRoutes: false }
}
module.exports = nextConfig
