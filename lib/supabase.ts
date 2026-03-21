const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

async function fetchSupabase(table: string, query: string = '', single = false) {
  if (!url || !key) return { data: null, error: 'Missing env vars' };
  
  const endpoint = `${url}/rest/v1/${table}?${query}`;
  const headers: HeadersInit = { apikey: key, Authorization: `Bearer ${key}` };
  if (single) headers['Accept'] = 'application/vnd.pgrst.object+json';

  try {
    const res = await fetch(endpoint, { headers });
    if (!res.ok) return { data: null, error: await res.text() };
    return { data: await res.json(), error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

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
  const { data, error } = await fetchSupabase('crypto', `select=*&order=market_cap_rank.asc&limit=${limit}`);
  if (error) { console.error(error); return [] as CryptoCoin[]; }
  return (data || []) as CryptoCoin[];
}
export async function getCryptoCoin(slug: string) {
  const { data, error } = await fetchSupabase('crypto', `select=*&slug=eq.${slug}`, true);
  if (error) return null;
  return data as CryptoCoin;
}
export async function getTechNews(limit = 30) {
  const { data, error } = await fetchSupabase('tech_news', `select=*&order=published_at.desc&limit=${limit}`);
  if (error) { console.error(error); return [] as TechNews[]; }
  return (data || []) as TechNews[];
}
export async function getNewsItem(slug: string) {
  const { data, error } = await fetchSupabase('tech_news', `select=*&slug=eq.${slug}`, true);
  if (error) return null;
  return data as TechNews;
}
export async function getStartupNews(limit = 30) {
  const { data, error } = await fetchSupabase('startup_news', `select=*&order=published_at.desc&limit=${limit}`);
  if (error) { console.error(error); return [] as StartupNews[]; }
  return (data || []) as StartupNews[];
}
export async function getStartupItem(slug: string) {
  const { data, error } = await fetchSupabase('startup_news', `select=*&slug=eq.${slug}`, true);
  if (error) return null;
  return data as StartupNews;
}
export async function getAITools(limit = 30) {
  const { data, error } = await fetchSupabase('ai_tools', `select=*&order=votes.desc&limit=${limit}`);
  if (error) { console.error(error); return [] as AITool[]; }
  return (data || []) as AITool[];
}
export async function getAITool(slug: string) {
  const { data, error } = await fetchSupabase('ai_tools', `select=*&slug=eq.${slug}`, true);
  if (error) return null;
  return data as AITool;
}
export async function getGithubProjects(limit = 30) {
  const { data, error } = await fetchSupabase('github_projects', `select=*&order=stars.desc&limit=${limit}`);
  if (error) { console.error(error); return [] as GithubProject[]; }
  return (data || []) as GithubProject[];
}
export async function getGithubProject(slug: string) {
  const { data, error } = await fetchSupabase('github_projects', `select=*&slug=eq.${slug}`, true);
  if (error) return null;
  return data as GithubProject;
}
export async function getJobs(limit = 30) {
  const { data, error } = await fetchSupabase('tech_jobs', `select=*&order=created_at.desc&limit=${limit}`);
  if (error) { console.error(error); return [] as Job[]; }
  return (data || []) as Job[];
}
export async function getJob(slug: string) {
  const { data, error } = await fetchSupabase('tech_jobs', `select=*&slug=eq.${slug}`, true);
  if (error) return null;
  return data as Job;
}
export async function getHomepageData() {
  const [crypto, news, github, aiTools, jobs, startups] = await Promise.all([
    getCryptoCoins(8), getTechNews(6), getGithubProjects(6),
    getAITools(6), getJobs(6), getStartupNews(6)
  ]);
  return { crypto, news, github, aiTools, jobs, startups };
}
export async function getAllSlugs() {
  const empty = { crypto: [], news: [], github: [], aitools: [], jobs: [], startups: [] };
  if (!url || !key) {
    console.warn('[getAllSlugs] Supabase credentials missing.');
    return empty;
  }
  try {
    const [crypto, news, github, aitools, jobs, startups] = await Promise.all([
      fetchSupabase('crypto', 'select=slug,updated_at'),
      fetchSupabase('tech_news', 'select=slug,published_at'),
      fetchSupabase('github_projects', 'select=slug,updated_at'),
      fetchSupabase('ai_tools', 'select=slug,created_at'),
      fetchSupabase('tech_jobs', 'select=slug,created_at'),
      fetchSupabase('startup_news', 'select=slug,published_at')
    ]);
    return {
      crypto: crypto.data || [], news: news.data || [],
      github: github.data || [], aitools: aitools.data || [],
      jobs: jobs.data || [], startups: startups.data || []
    };
  } catch (e) {
    console.warn('[getAllSlugs] Failed to fetch slugs:', e);
    return empty;
  }
}
