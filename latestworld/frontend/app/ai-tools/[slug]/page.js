'use client'
import { useEffect, useState } from 'react'
import { getAIToolBySlug } from '../../../lib/supabase'
import { useParams } from 'next/navigation'

export default function AIToolPage() {
  const params = useParams()
  const [tool, setTool] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params?.slug) {
      getAIToolBySlug(params.slug).then(setTool).finally(() => setLoading(false))
    }
  }, [params])

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading...</div>
  if (!tool) return <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Tool not found</div>

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <a href="/ai-tools" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>← Back to AI Tools</a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', margin: '1.5rem 0' }}>
        {tool.image
          ? <img src={tool.image} alt={tool.name} width={80} height={80} style={{ borderRadius: 16, objectFit: 'cover' }} />
          : <div style={{ width: 80, height: 80, background: '#1e1e2e', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>🤖</div>
        }
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '2rem', fontWeight: 800, margin: '0 0 0.25rem' }}>{tool.name}</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>{tool.tagline}</p>
          {tool.votes > 0 && <div style={{ color: '#f59e0b', marginTop: '0.25rem', fontSize: '0.875rem' }}>▲ {tool.votes} upvotes on Product Hunt</div>}
        </div>
      </div>

      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ marginTop: 0 }}>About {tool.name}</h2>
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>{tool.description || tool.tagline}</p>
        {tool.category && <span className="badge badge-blue">{tool.category}</span>}
      </div>

      {tool.website_url && (
        <a href={tool.website_url} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#38bdf8', color: '#0a0a0f', padding: '0.75rem 1.5rem', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>
          Visit {tool.name} →
        </a>
      )}
    </div>
  )
}
