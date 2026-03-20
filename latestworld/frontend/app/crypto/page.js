'use client'
import { useEffect, useState } from 'react'
import { getCryptoList } from '../../lib/supabase'

export default function CryptoPage() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getCryptoList(100).then(setCoins).finally(() => setLoading(false))
  }, [])

  const filtered = coins.filter(c =>
    c.coin_name.toLowerCase().includes(search.toLowerCase()) ||
    c.symbol.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, marginBottom: '0.5rem' }}>💹 Cryptocurrency Prices</h1>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Live crypto market data — updated every 6 hours</p>

      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search coins..."
        style={{
          width: '100%', maxWidth: 400, padding: '0.6rem 1rem',
          background: '#111118', border: '1px solid #1e1e2e', borderRadius: 8,
          color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '1.5rem', outline: 'none'
        }}
      />

      {loading ? <div style={{ color: '#64748b' }}>Loading...</div> : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1e1e2e', color: '#64748b', fontSize: '0.8rem', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem' }}>#</th>
                <th style={{ padding: '0.75rem' }}>Coin</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Price (USD)</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>24h %</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>7d %</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(coin => {
                const isUp24 = coin.change_24h >= 0
                const isUp7d = coin.change_7d >= 0
                return (
                  <tr key={coin.slug} style={{ borderBottom: '1px solid #1e1e2e', cursor: 'pointer' }}
                    onClick={() => window.location.href = `/crypto/${coin.slug}`}>
                    <td style={{ padding: '0.75rem', color: '#64748b' }}>{coin.market_cap_rank}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {coin.image && <img src={coin.image} alt={coin.coin_name} width={28} height={28} style={{ borderRadius: '50%' }} />}
                        <div>
                          <div style={{ fontWeight: 600 }}>{coin.coin_name}</div>
                          <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{coin.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 600 }}>
                      ${Number(coin.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: isUp24 ? '#22c55e' : '#ef4444', fontWeight: 600 }}>
                      {isUp24 ? '▲' : '▼'} {Math.abs(coin.change_24h || 0).toFixed(2)}%
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: isUp7d ? '#22c55e' : '#ef4444' }}>
                      {isUp7d ? '▲' : '▼'} {Math.abs(coin.change_7d || 0).toFixed(2)}%
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', color: '#94a3b8' }}>
                      ${(coin.market_cap / 1e9).toFixed(2)}B
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
