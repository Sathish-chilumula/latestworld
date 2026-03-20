// scripts/githubUpdate.ts
import { createClient } from '@supabase/supabase-js'
const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim().slice(0, 80)

async function run() {
  const date = new Date(); date.setDate(date.getDate() - 7)
  const dateStr = date.toISOString().split('T')[0]
  const langs = ['javascript', 'python', 'typescript', 'go', 'rust', 'java', 'kotlin', 'swift']
  const headers: Record<string, string> = { Accept: 'application/vnd.github.v3+json', 'User-Agent': 'LatestWorld-Bot' }
  if (process.env.GH_TOKEN) headers['Authorization'] = `token ${process.env.GH_TOKEN}`

  const all: any[] = []; const seen = new Set()
  for (const lang of langs) {
    const res = await fetch(`https://api.github.com/search/repositories?q=language:${lang}+created:>${dateStr}&sort=stars&order=desc&per_page=12`, { headers })
    if (!res.ok) { console.warn(`GitHub error for ${lang}: ${res.status}`); continue }
    const { items = [] } = await res.json()
    for (const r of items) { if (!seen.has(r.id)) { seen.add(r.id); all.push(r) } }
    await new Promise(r => setTimeout(r, 500))
  }

  const rows = all.slice(0, 80).map((r: any) => ({
    repo_name: r.full_name, slug: slugify(r.full_name),
    owner: r.owner?.login, description: r.description || 'No description provided',
    stars: r.stargazers_count, forks: r.forks_count,
    language: r.language || 'Unknown', repo_url: r.html_url,
    avatar_url: r.owner?.avatar_url, topics: r.topics || [],
    updated_at: new Date().toISOString()
  }))

  if (rows.length) {
    const { error } = await sb.from('github_projects').upsert(rows, { onConflict: 'repo_name' })
    if (error) throw error
  }
  console.log(`✅ ${rows.length} GitHub repos saved`)
}
run().catch(e => { console.error('❌', e); process.exit(1) })
