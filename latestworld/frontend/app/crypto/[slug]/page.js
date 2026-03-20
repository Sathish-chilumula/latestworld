'use client'
import { useEffect, useState } from 'react'
import { getCryptoByCoin } from '../../../lib/supabase'
import { useParams } from 'next/navigation'

export default function CoinPage() {
  const params = useParams()
  const [coin, setCoin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params?.slug) {
      getCryptoByCoin(params.slug).then(setCoin).finally(() => setLoading(false))
    }
  }, [params])

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading...</div>
  if (!coin) return <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Coin not found</div>

  const isUp = coin.change_24h >= 0

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Schema markup for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": coin.coin_name,
        "description": `${coin.coin_name} (${coin.symbol}) current price, market cap, and 24h change`,
        "url": `https://latestworld.in/crypto/${coin.slug}`
      })}} />

      <a href="/crypto" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>← Back to Crypto</a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
        {coin.image && <img src={coin.image} alt={coin.coin_name} width={56} height={56} style={{ borderRadius: '50%' }} />}
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '2rem', fontWeight: 800, margin: 0 }}>{coin.coin_name}</h1>
          <div style={{ color: '#64748b' }}>{coin.symbol} · Rank #{coin.market_cap_rank}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard label="Current Price" value={`$${Number(coin.price).toLocaleString()}`} />
        <StatCard label="24h Change" value={`${isUp ? '▲' : '▼'} ${Math.abs(coin.change_24h || 0).toFixed(2)}%`} color={isUp ? '#22c55e' : '#ef4444'} />
        <StatCard label="7d Change" value={`${(coin.change_7d || 0).toFixed(2)}%`} color={(coin.change_7d || 0) >= 0 ? '#22c55e' : '#ef4444'} />
        <StatCard label="Market Cap" value={`$${(coin.market_cap / 1e9).toFixed(2)}B`} />
        <StatCard label="24h Volume" value={`$${(coin.volume_24h / 1e6).toFixed(0)}M`} />
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        <h2 style={{ marginTop: 0, fontSize: '1.1rem' }}>About {coin.coin_name}</h2>
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
          {coin.coin_name} ({coin.symbol}) is ranked #{coin.market_cap_rank} by market capitalization.
          The current price is <strong style={{ color: '#38bdf8' }}>${Number(coin.price).toLocaleString()}</strong> USD
          with a 24-hour change of <span style={{ color: isUp ? '#22c55e' : '#ef4444' }}>{coin.change_24h?.toFixed(2)}%</span>.
          The market cap stands at ${(coin.market_cap / 1e9).toFixed(2)} billion USD.
          Data is automatically updated every 6 hours from CoinGecko.
        </p>
      </div>
    </div>
  )
}

function StatCard({ label, value, color }) {
  return (
    <div className="card" style={{ padding: '1rem' }}>
      <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: '1.1rem', color: color || '#e2e8f0' }}>{value}</div>
    </div>
  )
}
