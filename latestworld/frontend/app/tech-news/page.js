'use client'
import { useEffect, useState } from 'react'
import { getTechNews } from '../../lib/supabase'

export default function TechNewsPage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTechNews(50).then(setArticles).finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, marginBottom: '0.5rem' }}>📰 Latest Tech News</h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>Latest technology news — auto-updated every 6 hours</p>

      {loading ? <div style={{ color: '#64748b' }}>Loading...</div> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {articles.map(article => (
            <a key={article.slug} href={`/tech-news/${article.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: 0, overflow: 'hidden', height: '100%' }}>
                {article.image && (
                  <img src={article.image} alt={article.title}
                    style={{ width: '100%', height: 180, objectFit: 'cover' }} loading="lazy" />
                )}
                <div style={{ padding: '1rem' }}>
                  <div style={{ color: '#38bdf8', fontSize: '0.75rem', marginBottom: '0.4rem', fontWeight: 600 }}>{article.source}</div>
                  <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#e2e8f0', margin: '0 0 0.5rem', lineHeight: 1.4 }}>{article.title}</h2>
                  <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>{article.summary?.substring(0, 120)}...</p>
                  <div style={{ color: '#475569', fontSize: '0.75rem', marginTop: '0.75rem' }}>
                    {article.published_at ? new Date(article.published_at).toLocaleDateString('en-IN') : ''}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
