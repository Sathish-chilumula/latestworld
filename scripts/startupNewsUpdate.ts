// scripts/startupNewsUpdate.ts
import { createClient } from '@supabase/supabase-js'
const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim().slice(0, 80) + '-' + Date.now().toString(36)

async function run() {
  const queries = ['startup funding India 2025', 'startup raises series funding', 'Indian startup investment']
  let total = 0
  for (const q of queries) {
    const res = await fetch(`https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=en&max=10&apikey=${process.env.GNEWS_API_KEY}`)
    if (!res.ok) continue
    const { articles = [] } = await res.json()
    const rows = articles.map((a: any) => ({
      title: a.title, slug: slugify(a.title),
      summary: a.description || a.title,
      source: a.source?.name || 'Unknown', source_url: a.url,
      image: a.image, published_at: a.publishedAt
    }))
    if (rows.length) {
      const { error } = await sb.from('startup_news').upsert(rows, { onConflict: 'slug', ignoreDuplicates: true })
      if (!error) total += rows.length
    }
    await new Promise(r => setTimeout(r, 1200))
  }
  console.log(`✅ ${total} startup news saved`)
}
run().catch(e => { console.error('❌', e); process.exit(1) })
