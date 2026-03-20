'use client'
import { useEffect, useState } from 'react'
import { getStartupNews } from '../../lib/supabase'

export default function StartupNewsPage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStartupNews(50).then(setArticles).finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, marginBottom: '0.5rem' }}>🚀 Startup & Funding News</h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>Latest startup funding, launches & investment news — updated every 6 hours</p>

      {loading ? <div style={{ color: '#64748b' }}>Loading...</div> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {articles.map(article => (
            <a key={article.slug} href={`/startup-news/${article.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                {article.image && (
                  <img src={article.image} alt={article.title}
                    style={{ width: '100%', height: 180, objectFit: 'cover' }} loading="lazy" />
                )}
                <div style={{ padding: '1rem' }}>
                  <div style={{ color: '#22c55e', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.4rem' }}>🚀 {article.source}</div>
                  <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#e2e8f0', margin: '0 0 0.5rem', lineHeight: 1.4 }}>{article.title}</h2>
                  <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>{article.summary?.substring(0, 120)}...</p>
                  {article.funding_amount && (
                    <div style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', padding: '0.25rem 0.75rem', borderRadius: 999, display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, marginTop: '0.5rem' }}>
                      💰 {article.funding_amount}
                    </div>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
