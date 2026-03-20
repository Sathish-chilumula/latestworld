'use client'
import { useEffect, useState } from 'react'
import { getAITools, type AITool } from '@/lib/supabase'
import { truncate } from '@/utils/helpers'
import { AdSlot, SkeletonCard } from '@/components/UI'
import Link from 'next/link'

export default function AIToolsPage() {
  const [tools, setTools] = useState<AITool[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => { getAITools(80).then(setTools).finally(() => setLoading(false)) }, [])

  const cats = ['All', ...Array.from(new Set(tools.map(t => t.category).filter(Boolean))).slice(0, 8)]
  const filtered = filter === 'All' ? tools : tools.filter(t => t.category === filter)

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.25rem' }}>
      <div style={{ background: 'linear-gradient(135deg,#ede9fe,#f5f3ff)', border: '2px solid #7c3aed20', borderRadius: 16, padding: '2rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: 'clamp(1.5rem,4vw,2rem)', marginBottom: '0.4rem' }}>🤖 Latest AI Tools</h1>
        <p style={{ color: 'var(--muted)', fontFamily: 'Poppins', fontSize: '14px', margin: 0 }}>Newly launched AI tools from Product Hunt — updated daily</p>
      </div>
      <AdSlot width={728} height={90} />
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1.25rem 0' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{ padding: '7px 14px', borderRadius: 999, border: '1.5px solid', borderColor: filter === c ? '#7c3aed' : 'var(--border)', background: filter === c ? '#ede9fe' : 'var(--surface)', color: filter === c ? '#7c3aed' : 'var(--muted)', fontFamily: 'Poppins', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>{c}</button>
        ))}
      </div>
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.25rem' }}>
          {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.25rem' }}>
          {filtered.map(tool => (
            <Link key={tool.slug} href={`/ai-tools/${tool.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card card-aitools" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', height: '100%' }}>
                {tool.image
                  ? <img src={tool.image} alt={tool.name} width={52} height={52} style={{ borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
                  : <div style={{ width: 52, height: 52, background: '#ede9fe', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🤖</div>
                }
                <div>
                  <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '15px', marginBottom: '0.3rem', color: 'var(--text)' }}>{tool.name}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '12px', lineHeight: 1.5, marginBottom: '0.5rem' }}>{truncate(tool.tagline || tool.description, 70)}</div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className="badge badge-aitools">{tool.category || 'AI'}</span>
                    {tool.pricing && <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700, fontFamily: 'Poppins' }}>{tool.pricing}</span>}
                    {tool.votes > 0 && <span style={{ color: '#7c3aed', fontSize: '12px', fontWeight: 700, fontFamily: 'Poppins', marginLeft: 'auto' }}>▲ {tool.votes}</span>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
