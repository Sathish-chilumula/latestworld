'use client'
import { useEffect, useState } from 'react'
import { getAITools } from '../../lib/supabase'

export default function AIToolsPage() {
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAITools(60).then(setTools).finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, marginBottom: '0.5rem' }}>🤖 Latest AI Tools</h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>Newly launched AI tools from Product Hunt — updated daily</p>

      {loading ? <div style={{ color: '#64748b' }}>Loading...</div> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {tools.map(tool => (
            <a key={tool.slug} href={`/ai-tools/${tool.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                {tool.image
                  ? <img src={tool.image} alt={tool.name} width={52} height={52} style={{ borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                  : <div style={{ width: 52, height: 52, background: '#1e1e2e', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🤖</div>
                }
                <div>
                  <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: '0.25rem' }}>{tool.name}</div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.5, marginBottom: '0.5rem' }}>{tool.tagline?.substring(0, 100)}</div>
                  {tool.votes > 0 && <div style={{ color: '#f59e0b', fontSize: '0.75rem' }}>▲ {tool.votes}</div>}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
