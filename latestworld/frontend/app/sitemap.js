import { supabase } from '../lib/supabase'

export default async function sitemap() {
  const baseUrl = 'https://latestworld.in'

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/crypto`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/tech-news`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/ai-tools`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/github-projects`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/tech-jobs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/startup-news`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]

  // Dynamic pages from database
  const dynamicPages = []

  try {
    const [crypto, news, github, aitools, jobs, startups] = await Promise.all([
      supabase.from('crypto').select('slug, updated_at').limit(200),
      supabase.from('tech_news').select('slug, published_at').limit(500),
      supabase.from('github_projects').select('slug, updated_at').limit(200),
      supabase.from('ai_tools').select('slug, updated_at').limit(200),
      supabase.from('tech_jobs').select('slug, updated_at').limit(500),
      supabase.from('startup_news').select('slug, published_at').limit(500),
    ])

    crypto.data?.forEach(c => dynamicPages.push({ url: `${baseUrl}/crypto/${c.slug}`, lastModified: new Date(c.updated_at), changeFrequency: 'hourly', priority: 0.7 }))
    news.data?.forEach(n => dynamicPages.push({ url: `${baseUrl}/tech-news/${n.slug}`, lastModified: new Date(n.published_at), changeFrequency: 'daily', priority: 0.7 }))
    github.data?.forEach(g => dynamicPages.push({ url: `${baseUrl}/github-projects/${g.slug}`, lastModified: new Date(g.updated_at), changeFrequency: 'daily', priority: 0.6 }))
    aitools.data?.forEach(a => dynamicPages.push({ url: `${baseUrl}/ai-tools/${a.slug}`, lastModified: new Date(a.updated_at), changeFrequency: 'daily', priority: 0.6 }))
    jobs.data?.forEach(j => dynamicPages.push({ url: `${baseUrl}/tech-jobs/${j.slug}`, lastModified: new Date(j.updated_at), changeFrequency: 'daily', priority: 0.7 }))
    startups.data?.forEach(s => dynamicPages.push({ url: `${baseUrl}/startup-news/${s.slug}`, lastModified: new Date(s.published_at), changeFrequency: 'daily', priority: 0.7 }))
  } catch (e) {
    console.error('Sitemap error:', e)
  }

  return [...staticPages, ...dynamicPages]
}
