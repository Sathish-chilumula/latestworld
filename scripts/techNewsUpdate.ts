// scripts/techNewsUpdate.ts
import { createClient } from '@supabase/supabase-js'
const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
const sb = createClient(url!, key!)
const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim().slice(0, 80) + '-' + Date.now().toString(36)

async function run() {
  console.log('📰 Fetching Tech News...')
  const res = await fetch(`https://gnews.io/api/v4/search?q=technology&lang=en&country=in&max=10&token=${process.env.GNEWS_API_KEY}`)
  if (!res.ok) throw new Error(`GNews ${res.status}: ${await res.text()}`)
  const { articles = [] } = (await res.json()) as any
  const rows = articles.map((a: any) => ({
    title: a.title, slug: slugify(a.title), summary: a.description,
    content: a.content, source: a.source?.name, source_url: a.url,
    image: a.image, published_at: a.publishedAt
  }))
  if (rows.length) {
    const { error } = await sb.from('tech_news').upsert(rows, { onConflict: 'slug' })
    if (error) throw error
  }
  console.log(`✅ ${rows.length} news items saved`)
}
run().catch(e => { console.error('❌', e); process.exit(1) })
