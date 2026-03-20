// scripts/startupNewsUpdate.ts
import { createClient } from '@supabase/supabase-js'
const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
const sb = createClient(url!, key!)
const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim().slice(0, 80) + '-' + Date.now().toString(36)

async function run() {
  console.log('🚀 Fetching Startup News...')
  const res = await fetch(`https://gnews.io/api/v4/search?q=startup+funding+india&lang=en&country=in&max=10&token=${process.env.GNEWS_API_KEY}`)
  if (!res.ok) throw new Error(`GNews ${res.status}: ${await res.text()}`)
  const { articles = [] } = (await res.json()) as any
  const rows = articles.map((a: any) => ({
    title: a.title, slug: slugify(a.title), summary: a.description,
    source: a.source?.name, source_url: a.url,
    image: a.image, published_at: a.publishedAt,
    company_name: a.title.split(' ')[0],
    funding_amount: a.description?.match(/[\$|₹][0-9\.]+[M|B|K]/)?.[0]
  }))
  if (rows.length) {
    const { error } = await sb.from('startup_news').upsert(rows, { onConflict: 'slug' })
    if (error) throw error
  }
  console.log(`✅ ${rows.length} startup items saved`)
}
run().catch(e => { console.error('❌', e); process.exit(1) })
