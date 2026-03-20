// scripts/jobsUpdate.ts
import { createClient } from '@supabase/supabase-js'
const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
const sb = createClient(url!, key!)
const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim().slice(0, 80) + '-' + Date.now().toString(36)

async function run() {
  console.log('💼 Fetching Adzuna jobs...')
  const cats = ['it-jobs', 'engineering-jobs']
  let total = 0
  for (const cat of cats) {
    const url = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${process.env.ADZUNA_APP_ID}&app_key=${process.env.ADZUNA_APP_KEY}&results_per_page=20&category=${cat}&content_type=application/json`
    const res = await fetch(url)
    if (!res.ok) { console.warn(`Adzuna error for ${cat}: ${res.status}`); continue }
    const { results = [] } = (await res.json()) as any
    const rows = results.map((j: any) => ({
      title: j.title, slug: slugify(`${j.title}-${j.company?.display_name || ''}`),
      company: j.company?.display_name, location: j.location?.display_name,
      salary_min: j.salary_min, salary_max: j.salary_max,
      salary: j.salary_min ? undefined : 'Competitive',
      description: j.description, apply_url: j.redirect_url,
      job_type: j.contract_time || 'full_time', category: cat
    }))
    if (rows.length) {
      const { error } = await sb.from('tech_jobs').upsert(rows, { onConflict: 'slug', ignoreDuplicates: true })
      if (!error) total += rows.length
      else console.error('Supabase Error:', error)
    }
    await new Promise(r => setTimeout(r, 600))
  }
  console.log(`✅ ${total} jobs saved`)
}
run().catch(e => { console.error('❌', e); process.exit(1) })
