'use client'
import { useEffect, useState } from 'react'
import type { Metadata } from 'next'
import { getCryptoCoins, type CryptoCoin } from '@/lib/supabase'
import { formatPrice, formatLargeNum } from '@/utils/helpers'
import { AdSlot, SkeletonRow } from '@/components/UI'
import Link from 'next/link'

export default function CryptoPage() {
  const [coins, setCoins] = useState<CryptoCoin[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => { getCryptoCoins(200).then(setCoins).finally(() => setLoading(false)) }, [])

  const filtered = coins.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.symbol.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.25rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'WebPage',
        name: 'Live Cryptocurrency Prices in India — LatestWorld',
        description: 'Live cryptocurrency market data. Top 200 coins by market cap with prices, 24h change, 7d change, market cap and volume.',
        url: 'https://latestworld.in/crypto'
      })}} />

      {/* Page header */}
      <div style={{ background: 'linear-gradient(135deg,#fef3c7,#fffbeb)', border: '2px solid #f59e0b30', borderRadius: 16, padding: '2rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.5rem' }}>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: 'clamp(1.5rem,4vw,2rem)', margin: 0 }}>💹 Live Cryptocurrency Prices</h1>
          <span className="live-badge"><span className="live-dot" />LIVE</span>
        </div>
        <p style={{ color: 'var(--muted)', fontFamily: 'Poppins', fontSize: '14px', margin: 0 }}>Top 200 coins ranked by market cap — updated every 6 hours via CoinGecko</p>
      </div>

      <AdSlot width={728} height={90} label="Leaderboard" />

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: 440, margin: '1.25rem 0' }}>
        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or symbol…" className="search-input" />
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="crypto-table">
          <thead><tr>
            <th>#</th><th>Coin</th>
            <th style={{ textAlign: 'right' }}>Price (USD)</th>
            <th style={{ textAlign: 'right' }}>24h %</th>
            <th style={{ textAlign: 'right' }} className="hide-mobile">7d %</th>
            <th style={{ textAlign: 'right' }} className="hide-mobile">Market Cap</th>
            <th style={{ textAlign: 'right' }} className="hide-mobile">Volume 24h</th>
          </tr></thead>
          <tbody>
            {loading
              ? Array.from({ length: 12 }).map((_, i) => <tr key={i}><td colSpan={7}><SkeletonRow /></td></tr>)
              : filtered.map(c => (
                <tr key={c.slug} onClick={() => window.location.href = `/crypto/${c.slug}`}>
                  <td style={{ color: 'var(--muted)', fontWeight: 700, fontSize: '13px' }}>{c.market_cap_rank}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {c.image && <img src={c.image} alt={c.name} width={32} height={32} style={{ borderRadius: '50%' }} />}
                      <div>
                        <div style={{ fontWeight: 700 }}>{c.name}</div>
                        <div style={{ color: 'var(--muted)', fontSize: '11px', fontWeight: 600 }}>{c.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: '"JetBrains Mono"', fontWeight: 700 }}>${formatPrice(c.price)}</td>
                  <td style={{ textAlign: 'right' }}><span className={(c.change_24h || 0) >= 0 ? 'price-up' : 'price-down'}>{(c.change_24h || 0) >= 0 ? '▲' : '▼'} {Math.abs(c.change_24h || 0).toFixed(2)}%</span></td>
                  <td style={{ textAlign: 'right' }} className="hide-mobile"><span className={(c.change_7d || 0) >= 0 ? 'price-up' : 'price-down'}>{(c.change_7d || 0) >= 0 ? '▲' : '▼'} {Math.abs(c.change_7d || 0).toFixed(2)}%</span></td>
                  <td style={{ textAlign: 'right', color: 'var(--muted)', fontSize: '13px' }} className="hide-mobile">{formatLargeNum(c.market_cap)}</td>
                  <td style={{ textAlign: 'right', color: 'var(--muted)', fontSize: '13px' }} className="hide-mobile">{formatLargeNum(c.volume_24h)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <p style={{ color: 'var(--light)', fontSize: '12px', fontFamily: 'Poppins', marginTop: '0.75rem', textAlign: 'right' }}>
        Data by <a href="https://www.coingecko.com?utm_source=latestworld&utm_medium=referral" target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a', fontWeight: 700 }}>CoinGecko</a>
      </p>
    </div>
  )
}
