// scripts/cryptoUpdate.ts
import { createClient } from '@supabase/supabase-js'
const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
const sb = createClient(url!, key!)

async function run() {
  console.log('💹 Fetching CoinGecko top 200...')
  const headers: Record<string, string> = { Accept: 'application/json' }
  if (process.env.COINGECKO_API_KEY) headers['x-cg-demo-api-key'] = process.env.COINGECKO_API_KEY

  const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false&price_change_percentage=24h,7d', { headers })
  if (!res.ok) throw new Error(`CoinGecko ${res.status}: ${await res.text()}`)
  const coins = (await res.json()) as any[]

  const rows = coins.map((c: any) => ({
    coin_id: c.id, name: c.name, symbol: c.symbol.toUpperCase(), slug: c.id,
    price: c.current_price, market_cap: c.market_cap,
    change_24h: c.price_change_percentage_24h,
    change_7d: c.price_change_percentage_7d_in_currency,
    volume_24h: c.total_volume, image: c.image,
    market_cap_rank: c.market_cap_rank,
    updated_at: new Date().toISOString()
  }))

  const { error } = await sb.from('crypto').upsert(rows, { onConflict: 'coin_id' })
  if (error) { console.error('Supabase Error:', error); throw error }
  console.log(`✅ ${rows.length} coins upserted`)
}
run().catch(e => { console.error('❌', e); process.exit(1) })
