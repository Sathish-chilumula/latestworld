// scripts/aiToolsUpdate.ts
import { createClient } from '@supabase/supabase-js'
const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim().slice(0, 80)

async function run() {
  console.log('🤖 Fetching Product Hunt AI tools...')
  const query = `query { posts(topic: "artificial-intelligence", order: VOTES, first: 20) { edges { node { id name tagline description url votesCount thumbnail { url } topics { edges { node { name } } } createdAt } } } }`
  const res = await fetch('https://api.producthunt.com/v2/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.PRODUCTHUNT_TOKEN}` },
    body: JSON.stringify({ query })
  })
  if (!res.ok) throw new Error(`Product Hunt ${res.status}: ${await res.text()}`)
  const { data } = await res.json()
  const posts = data?.posts?.edges || []
  const rows = posts.map(({ node: p }: any) => ({
    name: p.name, slug: slugify(p.name), tagline: p.tagline,
    description: p.description || p.tagline, website: p.url,
    image: p.thumbnail?.url, votes: p.votesCount,
    category: p.topics?.edges?.[0]?.node?.name || 'AI',
    pricing: 'Check website', launch_date: p.createdAt
  }))
  if (rows.length) {
    const { error } = await sb.from('ai_tools').upsert(rows, { onConflict: 'slug' })
    if (error) throw error
  }
  console.log(`✅ ${rows.length} AI tools saved`)
}
run().catch(e => { console.error('❌', e); process.exit(1) })
