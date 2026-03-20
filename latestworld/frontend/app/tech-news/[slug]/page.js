'use client'
import { useEffect, useState } from 'react'
import { getNewsBySlug } from '../../../lib/supabase'
import { useParams } from 'next/navigation'

export default function NewsDetailPage() {
  const params = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params?.slug) {
      getNewsBySlug(params.slug).then(setArticle).finally(() => setLoading(false))
    }
  }, [params])

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading...</div>
  if (!article) return <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Article not found</div>

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": article.title,
        "description": article.summary,
        "image": article.image,
        "datePublished": article.published_at,
        "publisher": { "@type": "Organization", "name": article.source }
      })}} />

      <a href="/tech-news" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>← Back to News</a>

      {article.image && (
        <img src={article.image} alt={article.title}
          style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 12, margin: '1.5rem 0' }} />
      )}

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ color: '#38bdf8', fontWeight: 600, fontSize: '0.875rem' }}>{article.source}</span>
        <span style={{ color: '#475569', fontSize: '0.8rem' }}>
          {article.published_at ? new Date(article.published_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
        </span>
      </div>

      <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '1rem' }}>{article.title}</h1>

      <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, borderLeft: '3px solid #38bdf8', paddingLeft: '1rem', marginBottom: '2rem' }}>
        {article.summary}
      </p>

      <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: 10, padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Read full article at {article.source}</span>
        <a href={article.source_url} target="_blank" rel="noopener noreferrer"
          style={{ background: '#38bdf8', color: '#0a0a0f', padding: '0.5rem 1rem', borderRadius: 6, textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem' }}>
          Read Full Story →
        </a>
      </div>
    </div>
  )
}
