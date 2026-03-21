export const dynamic = 'force-static'

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://latestworld.in/sitemap.xml',
    host: 'https://latestworld.in',
  }
}
