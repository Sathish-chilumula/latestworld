'use client'
import { useEffect, useState } from 'react'
import { getStartupNewsBySlug } from '../../../lib/supabase'
import { useParams } from 'next/navigation'

export default function StartupNewsDetail() {
  const params = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params?.slug) {
      getStartupNewsBySlug(params.slug).then(setArticle).finally(() => setLoading(false))
    }
  }, [params])

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading...</div>
  if (!article) return <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Article not found</div>

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <a href="/startup-news" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>← Back to Startup News</a>
      {article.image && (
        <img src={article.image} alt={article.title}
          style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 12, margin: '1.5rem 0' }} />
      )}
      <div style={{ color: '#22c55e', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.75rem' }}>🚀 {article.source}</div>
      <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '1rem' }}>{article.title}</h1>
      <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, borderLeft: '3px solid #22c55e', paddingLeft: '1rem', marginBottom: '2rem' }}>
        {article.summary}
      </p>
      <a href={article.source_url} target="_blank" rel="noopener noreferrer"
        style={{ background: '#22c55e', color: '#0a0a0f', padding: '0.75rem 1.5rem', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>
        Read Full Story →
      </a>
    </div>
  )
}
