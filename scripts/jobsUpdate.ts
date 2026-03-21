import { createClient } from '@supabase/supabase-js'
const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim().slice(0, 80) + '-' + Date.now().toString(36)

async function run() {
  console.log('💼 Fetching Adzuna jobs...')

  const searches = [
    'react developer',
    'python developer',
    'node developer',
    'software engineer',
    'data scientist'
  ]

  let total = 0

  for (const what of searches) {
    const url = `https://api.adzuna.com/v1/api/jobs/in/search/1` +
      `?app_id=${process.env.ADZUNA_APP_ID}` +
      `&app_key=${process.env.ADZUNA_APP_KEY}` +
      `&results_per_page=10` +
      `&what=${encodeURIComponent(what)}` +
      `&where=india` +
      `&content-type=application/json`

    console.log(`Fetching: ${what}`)

    const res = await fetch(url)

    if (!res.ok) {
      console.warn(`Adzuna error for "${what}": ${res.status}`)
      const text = await res.text()
      console.warn('Response:', text)
      continue
    }

    const data = await res.json() as { results?: any[] }
    const results = data.results || []
    console.log(`Found ${results.length} jobs for "${what}"`)

    const rows = results.map((j: any) => ({
      title: j.title,
      slug: slugify(`${j.title}-${j.company?.display_name || ''}`),
      company: j.company?.display_name || 'Unknown',
      location: j.location?.display_name || 'India',
      salary_min: j.salary_min,
      salary_max: j.salary_max,
      salary: j.salary_min
        ? `₹${Math.round(j.salary_min / 100000)}L - ₹${Math.round(j.salary_max / 100000)}L`
        : 'Competitive',
      description: j.description,
      apply_url: j.redirect_url,
      job_type: j.contract_time || 'full_time',
      category: 'tech'
    }))

    if (rows.length > 0) {
      const { error } = await sb
        .from('jobs')
        .upsert(rows, { onConflict: 'slug', ignoreDuplicates: true })
      if (error) console.error('Supabase error:', error)
      else total += rows.length
    }

    await new Promise(r => setTimeout(r, 1000))
  }

  console.log(`✅ ${total} jobs saved`)
}

run().catch(e => { console.error('❌', e); process.exit(1) })
