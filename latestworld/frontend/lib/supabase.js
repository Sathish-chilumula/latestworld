import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// =====================
// CRYPTO
// =====================
export async function getCryptoList(limit = 50) {
  const { data, error } = await supabase
    .from('crypto')
    .select('*')
    .order('market_cap_rank', { ascending: true })
    .limit(limit)
  if (error) throw error
  return data || []
}

export async function getCryptoByCoin(slug) {
  const { data, error } = await supabase
    .from('crypto')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return data
}

// =====================
// TECH NEWS
// =====================
export async function getTechNews(limit = 20) {
  const { data, error } = await supabase
    .from('tech_news')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data || []
}

export async function getNewsBySlug(slug) {
  const { data, error } = await supabase
    .from('tech_news')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return data
}

// =====================
// GITHUB PROJECTS
// =====================
export async function getGitHubProjects(limit = 20) {
  const { data, error } = await supabase
    .from('github_projects')
    .select('*')
    .order('stars', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data || []
}

export async function getGitHubProjectBySlug(slug) {
  const { data, error } = await supabase
    .from('github_projects')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return data
}

// =====================
// AI TOOLS
// =====================
export async function getAITools(limit = 20) {
  const { data, error } = await supabase
    .from('ai_tools')
    .select('*')
    .order('votes', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data || []
}

export async function getAIToolBySlug(slug) {
  const { data, error } = await supabase
    .from('ai_tools')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return data
}

// =====================
// TECH JOBS
// =====================
export async function getTechJobs(limit = 20) {
  const { data, error } = await supabase
    .from('tech_jobs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data || []
}

export async function getJobBySlug(slug) {
  const { data, error } = await supabase
    .from('tech_jobs')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return data
}

// =====================
// STARTUP NEWS
// =====================
export async function getStartupNews(limit = 20) {
  const { data, error } = await supabase
    .from('startup_news')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data || []
}

export async function getStartupNewsBySlug(slug) {
  const { data, error } = await supabase
    .from('startup_news')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return data
}

// =====================
// HOMEPAGE - All sections
// =====================
export async function getHomepageData() {
  const [crypto, news, github, aiTools, jobs, startups] = await Promise.all([
    getCryptoList(6),
    getTechNews(6),
    getGitHubProjects(6),
    getAITools(6),
    getTechJobs(6),
    getStartupNews(6)
  ])

  return { crypto, news, github, aiTools, jobs, startups }
}
