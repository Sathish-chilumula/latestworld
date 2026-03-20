'use client'
import { useEffect, useState } from 'react'
import { getTechNews, getNewsItem, type TechNews } from '@/lib/supabase'
import { timeAgo, truncate, fmtDate } from '@/utils/helpers'
import { Breadcrumb, FAQ, AdSlot, SkeletonCard } from '@/components/UI'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ── Listing ────────────────────────────────────────
export default function NewsPage() {
  const [articles, setArticles] = useState<TechNews[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { getTechNews(60).then(setArticles).finally(() => setLoading(false)) }, [])

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.25rem' }}>
      <div style={{ background: 'linear-gradient(135deg,#fee2e2,#fff5f5)', border: '2px solid #e6394620', borderRadius: 16, padding: '2rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: 'clamp(1.5rem,4vw,2rem)', marginBottom: '0.4rem' }}>📰 Latest Tech News</h1>
        <p style={{ color: 'var(--muted)', fontFamily: 'Poppins', fontSize: '14px', margin: 0 }}>Global technology & India tech news — auto-updated every 6 hours via GNews</p>
      </div>
      <AdSlot width={728} height={90} />
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.25rem', marginTop: '1.5rem' }}>
          {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <>
          {/* Featured */}
          {articles[0] && (
            <Link href={`/news/${articles[0].slug}`} style={{ textDecoration: 'none', display: 'block', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
              <div className="card card-news" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 260, overflow: 'hidden' }}>
                <div className="img-zoom" style={{ minHeight: 260 }}>
                  {articles[0].image
                    ? <img src={articles[0].image} alt={articles[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#e63946,#c1121f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>📰</div>
                  }
                </div>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span className="badge badge-news" style={{ marginBottom: '0.75rem', alignSelf: 'flex-start' }}>FEATURED</span>
                  <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.4rem', lineHeight: 1.3, marginBottom: '0.75rem', color: 'var(--text)' }}>{articles[0].title}</h2>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.7, marginBottom: '1rem' }}>{truncate(articles[0].summary, 160)}</p>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '13px', color: '#e63946' }}>{articles[0].source}</span>
                    <span style={{ color: 'var(--light)', fontSize: '12px', fontFamily: 'Poppins' }}>{timeAgo(articles[0].published_at)}</span>
                  </div>
                </div>
              </div>
            </Link>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.25rem' }}>
            {articles.slice(1).map(item => (
              <Link key={item.slug} href={`/news/${item.slug}`} style={{ textDecoration: 'none' }}>
                <article className="card card-news accent-news" style={{ height: '100%' }}>
                  <div className="img-zoom" style={{ height: 180 }}>
                    {item.image
                      ? <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                      : <div style={{ width: '100%', height: '100%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>📰</div>
                    }
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span className="badge badge-news">{item.source}</span>
                      <span style={{ color: 'var(--light)', fontSize: '11px', fontFamily: 'Poppins' }}>{timeAgo(item.published_at)}</span>
                    </div>
                    <h3 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '14px', lineHeight: 1.4, color: 'var(--text)', marginBottom: '0.4rem' }}>{item.title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '12px', lineHeight: 1.6 }}>{truncate(item.summary, 90)}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
