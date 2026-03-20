// scripts/githubUpdate.ts
import { createClient } from '@supabase/supabase-js'
const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
const sb = createClient(url!, key!)
const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim().slice(0, 80)

async function run() {
  console.log('🐙 Fetching trending GitHub projects...')
  const res = await fetch('https://api.github.com/search/repositories?q=created:>2024-01-01&sort=stars&order=desc&per_page=20', {
    headers: { 'Authorization': `token ${process.env.GH_TOKEN}` }
  })
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${await res.text()}`)
  const { items = [] } = (await res.json()) as any
  const rows = items.map((i: any) => ({
    repo_name: i.full_name, slug: slugify(i.name), description: i.description,
    stars: i.stargazers_count, forks: i.forks_count, language: i.language,
    repo_url: i.html_url, owner: i.owner?.login, avatar_url: i.owner?.avatar_url,
    topics: i.topics || [], updated_at: i.updated_at
  }))
  if (rows.length) {
    const { error } = await sb.from('github_projects').upsert(rows, { onConflict: 'slug' })
    if (error) throw error
  }
  console.log(`✅ ${rows.length} projects upserted`)
}
run().catch(e => { console.error('❌', e); process.exit(1) })
