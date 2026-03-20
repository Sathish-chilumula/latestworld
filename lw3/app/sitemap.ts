import { getAllSlugs } from '@/lib/supabase'

export default async function sitemap() {
  const base = 'https://latestworld.in'

  const statics = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${base}/crypto`, changeFrequency: 'hourly' as const, priority: 0.95 },
    { url: `${base}/news`, changeFrequency: 'hourly' as const, priority: 0.95 },
    { url: `${base}/jobs`, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${base}/ai-tools`, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${base}/github`, changeFrequency: 'daily' as const, priority: 0.85 },
    { url: `${base}/startups`, changeFrequency: 'hourly' as const, priority: 0.9 },
    { url: `${base}/about`, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: 'monthly' as const, priority: 0.4 },
    { url: `${base}/privacy-policy`, changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${base}/disclaimer`, changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${base}/sitemap-page`, changeFrequency: 'weekly' as const, priority: 0.4 },
  ]

  let dynamics: any[] = []
  try {
    const { crypto, news, github, aitools, jobs, startups } = await getAllSlugs()
    // Every slug from every table is automatically included here
    // When cron jobs add new rows, they appear in sitemap after next build
    crypto.forEach((r: any) => dynamics.push({ url: `${base}/crypto/${r.slug}`, lastModified: new Date(r.updated_at), changeFrequency: 'hourly' as const, priority: 0.8 }))
    news.forEach((r: any) => dynamics.push({ url: `${base}/news/${r.slug}`, lastModified: new Date(r.published_at), changeFrequency: 'daily' as const, priority: 0.75 }))
    jobs.forEach((r: any) => dynamics.push({ url: `${base}/jobs/${r.slug}`, lastModified: new Date(r.created_at), changeFrequency: 'daily' as const, priority: 0.75 }))
    github.forEach((r: any) => dynamics.push({ url: `${base}/github/${r.slug}`, lastModified: new Date(r.updated_at), changeFrequency: 'daily' as const, priority: 0.7 }))
    aitools.forEach((r: any) => dynamics.push({ url: `${base}/ai-tools/${r.slug}`, lastModified: new Date(r.created_at), changeFrequency: 'daily' as const, priority: 0.7 }))
    startups.forEach((r: any) => dynamics.push({ url: `${base}/startups/${r.slug}`, lastModified: new Date(r.published_at), changeFrequency: 'daily' as const, priority: 0.75 }))
  } catch (e) { console.error('Sitemap error:', e) }

  return [...statics, ...dynamics]
}
