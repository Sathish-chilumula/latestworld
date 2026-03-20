// scripts/techNewsUpdate.ts
import { createClient } from '@supabase/supabase-js'
const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim().slice(0, 80) + '-' + Date.now().toString(36)

async function run() {
  const queries = ['technology', 'artificial intelligence', 'software developer India']
  let total = 0
  for (const q of queries) {
    console.log(`📰 Fetching news: "${q}"`)
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=en&max=10&apikey=${process.env.GNEWS_API_KEY}`
    const res = await fetch(url)
    if (!res.ok) { console.warn(`GNews error for "${q}": ${res.status}`); continue }
    const { articles = [] } = await res.json()
    const rows = articles.map((a: any) => ({
      title: a.title, slug: slugify(a.title),
      summary: a.description || a.title, content: a.content || a.description,
      source: a.source?.name || 'Unknown', source_url: a.url,
      image: a.image, category: q, published_at: a.publishedAt
    }))
    if (rows.length) {
      const { error } = await sb.from('tech_news').upsert(rows, { onConflict: 'slug', ignoreDuplicates: true })
      if (error) console.error(error)
      else total += rows.length
    }
    await new Promise(r => setTimeout(r, 1200))
  }
  console.log(`✅ ${total} news items saved`)
}
run().catch(e => { console.error('❌', e); process.exit(1) })
