/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: '**' }]
  },
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core*',
      'node_modules/esbuild*',
      'node_modules/webpack*',
      'node_modules/terser*',
      'node_modules/source-map*',
      'node_modules/source-map-js*',
      'node_modules/source-map-support*',
    ]
  },
  experimental: {
    typedRoutes: false,
  }
}
module.exports = nextConfig
