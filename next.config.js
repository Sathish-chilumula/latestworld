/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: '**' }]
  },
  experimental: { 
    typedRoutes: false,
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core*',
        'node_modules/esbuild*',
        'node_modules/webpack*',
        'node_modules/terser*',
      ]
    }
  }
}
module.exports = nextConfig
