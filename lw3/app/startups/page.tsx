'use client'
import { useEffect, useState } from 'react'
import { getStartupNews, getStartupItem, type StartupNews } from '@/lib/supabase'
import { timeAgo, truncate, fmtDate } from '@/utils/helpers'
import { Breadcrumb, FAQ, AdSlot, SkeletonCard } from '@/components/UI'
import Link from 'next/link'

export default function StartupsPage() {
  const [articles, setArticles] = useState<StartupNews[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { getStartupNews(60).then(setArticles).finally(() => setLoading(false)) }, [])

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.25rem' }}>
      <div style={{ background: 'linear-gradient(135deg,#ffedd5,#fff7ed)', border: '2px solid #ea580c20', borderRadius: 16, padding: '2rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: 'clamp(1.5rem,4vw,2rem)', marginBottom: '0.4rem' }}>🚀 Startup & Funding News</h1>
        <p style={{ color: 'var(--muted)', fontFamily: 'Poppins', fontSize: '14px', margin: 0 }}>Latest startup funding, Series A/B/C, launches — updated every 6 hours</p>
      </div>
      <AdSlot width={728} height={90} />
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.25rem', marginTop: '1.5rem' }}>
          {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.25rem', marginTop: '1.5rem' }}>
          {articles.map(item => (
            <Link key={item.slug} href={`/startups/${item.slug}`} style={{ textDecoration: 'none' }}>
              <article className="card card-startups accent-startups" style={{ height: '100%' }}>
                <div className="img-zoom" style={{ height: 180 }}>
                  {item.image
                    ? <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#ffedd5,#fed7aa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🚀</div>
                  }
                </div>
                <div style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
                    <span className="badge badge-startups">{item.source}</span>
                    <span style={{ color: 'var(--light)', fontSize: '11px', fontFamily: 'Poppins' }}>{timeAgo(item.published_at)}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '14px', lineHeight: 1.4, color: 'var(--text)', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '12px', lineHeight: 1.6, marginBottom: '0.75rem' }}>{truncate(item.summary, 90)}</p>
                  {item.funding_amount && <span style={{ background: '#ffedd5', color: '#ea580c', padding: '3px 10px', borderRadius: 999, fontSize: '12px', fontWeight: 700, fontFamily: 'Poppins' }}>💰 {item.funding_amount}</span>}
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
