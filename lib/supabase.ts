import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
export const supabase = url && key ? createClient(url, key) : null as any

// ── Types ──────────────────────────────────────────
export interface CryptoCoin {
  id: string; coin_id: string; name: string; symbol: string; slug: string
  price: number; market_cap: number; change_24h: number; change_7d: number
  volume_24h: number; image: string; market_cap_rank: number
  description: string; updated_at: string
}
export interface TechNews {
  id: string; title: string; slug: string; summary: string; content: string
  source: string; source_url: string; image: string; category: string
  published_at: string; created_at: string
}
export interface StartupNews {
  id: string; title: string; slug: string; summary: string
  source: string; source_url: string; image: string
  funding_amount: string; company_name: string; published_at: string
}
export interface AITool {
  id: string; name: string; slug: string; tagline: string; description: string
  category: string; website: string; pricing: string; image: string
  votes: number; launch_date: string
}
export interface GithubProject {
  id: string; repo_name: string; slug: string; owner: string
  description: string; stars: number; forks: number; language: string
  repo_url: string; avatar_url: string; topics: string[]; updated_at: string
}
export interface Job {
  id: string; title: string; slug: string; company: string; location: string
  salary: string; salary_min: number; salary_max: number; description: string
  apply_url: string; job_type: string; category: string; created_at: string
}

// ── Fetchers ───────────────────────────────────────
export async function getCryptoCoins(limit = 50) {
  const { data, error } = await supabase.from('crypto').select('*').order('market_cap_rank', { ascending: true }).limit(limit)
  if (error) { console.error(error); return [] }
  return (data || []) as CryptoCoin[]
}
export async function getCryptoCoin(slug: string) {
  const { data, error } = await supabase.from('crypto').select('*').eq('slug', slug).single()
  if (error) return null
  return data as CryptoCoin
}
export async function getTechNews(limit = 30) {
  const { data, error } = await supabase.from('tech_news').select('*').order('published_at', { ascending: false }).limit(limit)
  if (error) { console.error(error); return [] }
  return (data || []) as TechNews[]
}
export async function getNewsItem(slug: string) {
  const { data, error } = await supabase.from('tech_news').select('*').eq('slug', slug).single()
  if (error) return null
  return data as TechNews
}
export async function getStartupNews(limit = 30) {
  const { data, error } = await supabase.from('startup_news').select('*').order('published_at', { ascending: false }).limit(limit)
  if (error) { console.error(error); return [] }
  return (data || []) as StartupNews[]
}
export async function getStartupItem(slug: string) {
  const { data, error } = await supabase.from('startup_news').select('*').eq('slug', slug).single()
  if (error) return null
  return data as StartupNews
}
export async function getAITools(limit = 30) {
  const { data, error } = await supabase.from('ai_tools').select('*').order('votes', { ascending: false }).limit(limit)
  if (error) { console.error(error); return [] }
  return (data || []) as AITool[]
}
export async function getAITool(slug: string) {
  const { data, error } = await supabase.from('ai_tools').select('*').eq('slug', slug).single()
  if (error) return null
  return data as AITool
}
export async function getGithubProjects(limit = 30) {
  const { data, error } = await supabase.from('github_projects').select('*').order('stars', { ascending: false }).limit(limit)
  if (error) { console.error(error); return [] }
  return (data || []) as GithubProject[]
}
export async function getGithubProject(slug: string) {
  const { data, error } = await supabase.from('github_projects').select('*').eq('slug', slug).single()
  if (error) return null
  return data as GithubProject
}
export async function getJobs(limit = 30) {
  const { data, error } = await supabase.from('tech_jobs').select('*').order('created_at', { ascending: false }).limit(limit)
  if (error) { console.error(error); return [] }
  return (data || []) as Job[]
}
export async function getJob(slug: string) {
  const { data, error } = await supabase.from('tech_jobs').select('*').eq('slug', slug).single()
  if (error) return null
  return data as Job
}
export async function getHomepageData() {
  const [crypto, news, github, aiTools, jobs, startups] = await Promise.all([
    getCryptoCoins(8), getTechNews(6), getGithubProjects(6),
    getAITools(6), getJobs(6), getStartupNews(6)
  ])
  return { crypto, news, github, aiTools, jobs, startups }
}
// Slugs for sitemap
export async function getAllSlugs() {
  const [crypto, news, github, aitools, jobs, startups] = await Promise.all([
    supabase.from('crypto').select('slug,updated_at'),
    supabase.from('tech_news').select('slug,published_at'),
    supabase.from('github_projects').select('slug,updated_at'),
    supabase.from('ai_tools').select('slug,created_at'),
    supabase.from('tech_jobs').select('slug,created_at'),
    supabase.from('startup_news').select('slug,published_at'),
  ])
  return { crypto: crypto.data || [], news: news.data || [], github: github.data || [], aitools: aitools.data || [], jobs: jobs.data || [], startups: startups.data || [] }
}
