'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { getHomepageData } from '@/lib/supabase'
import type { CryptoCoin, TechNews, AITool, GithubProject, Job, StartupNews } from '@/lib/supabase'
import { CryptoTicker, AdSlot, SectionHeader, SkeletonCard, SkeletonRow } from '@/components/UI'
import { formatPrice, formatLargeNum, formatSalary, timeAgo, truncate } from '@/utils/helpers'

export default function HomePage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getHomepageData().then(setData).catch(console.error).finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <Hero />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.25rem' }}>
        <CryptoTicker coins={data?.crypto || []} />
        <AdSlot width={728} height={90} label="Leaderboard" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', marginTop: '1.5rem' }} className="main-grid">
          <div>
            <CryptoSection coins={data?.crypto || []} loading={loading} />
            <NewsSection articles={data?.news || []} loading={loading} />
            <GitHubSection repos={data?.github || []} loading={loading} />
          </div>
          <aside>
            <AdSlot width={300} height={250} label="Sidebar" />
            <AIToolsSidebar tools={data?.aiTools || []} loading={loading} />
            <JobsSidebar jobs={data?.jobs || []} loading={loading} />
            <StartupsSidebar startups={data?.startups || []} loading={loading} />
            <AdSlot width={300} height={250} label="Sidebar 2" />
          </aside>
        </div>
        <AdSlot width={970} height={90} label="Large Leaderboard" />
      </div>
      <style>{`@media(max-width:900px){.main-grid{grid-template-columns:1fr !important}}`}</style>
    </div>
  )
}

function Hero() {
  const stats = [{ n: '200+', l: 'Coins Tracked' }, { n: '50+', l: 'Jobs/Day' }, { n: '30+', l: 'News/Day' }, { n: '10+', l: 'AI Tools/Day' }]
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '3.5rem 1.25rem 2.5rem' }}>
      {/* Aurora background */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#fce4e6,#ede9fe,#dbeafe,#dcfce7)', backgroundSize: '300% 300%', animation: 'aurora 10s ease infinite alternate', zIndex: 0, opacity: 0.6 }} />
      {/* Animated blobs */}
      <div style={{ position: 'absolute', top: '-5rem', right: '10%', width: 400, height: 400, background: 'rgba(230,57,70,0.15)', borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%', animation: 'blob 9s ease-in-out infinite', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-3rem', left: '5%', width: 300, height: 300, background: 'rgba(124,58,237,0.12)', borderRadius: '40% 60% 70% 30%/40% 50% 60% 50%', animation: 'blob 12s ease-in-out 2s infinite', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>
        <div className="live-badge" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
          <span className="live-dot" /> AUTO-UPDATED EVERY FEW HOURS
        </div>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.15, color: 'var(--text)', marginBottom: '1rem', maxWidth: 700 }}>
          India's #1 Tech<br />
          <span style={{ color: '#e63946' }}>Intelligence Hub</span>
        </h1>
        <p style={{ fontFamily: 'Poppins', fontSize: '1rem', color: 'var(--muted)', maxWidth: 520, marginBottom: '2rem', lineHeight: 1.7 }}>
          Crypto · News · AI Tools · GitHub · Jobs · Startups — all fetched automatically from global APIs. Zero manual writing.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {stats.map(s => (
            <div key={s.l} style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: 10, padding: '10px 18px' }}>
              <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.2rem', color: '#e63946' }}>{s.n}</div>
              <div style={{ fontFamily: 'Poppins', fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href="/crypto" className="btn-glow">Live Crypto Prices →</Link>
          <Link href="/news" style={{ background: 'rgba(255,255,255,0.85)', color: '#0f172a', padding: '12px 24px', borderRadius: 10, fontFamily: 'Poppins', fontWeight: 700, fontSize: '14px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)' }}>Latest News</Link>
        </div>
      </div>
    </section>
  )
}

function CryptoSection({ coins, loading }: { coins: CryptoCoin[]; loading: boolean }) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <SectionHeader title="💹 Crypto Market" href="/crypto" accent="crypto" badge="Live" />
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}
        </div>
      ) : (
        <div className="card" style={{ overflow: 'hidden' }}>
          <table className="crypto-table">
            <thead><tr>
              <th>#</th><th>Coin</th>
              <th style={{ textAlign: 'right' }}>Price</th>
              <th style={{ textAlign: 'right' }}>24h %</th>
              <th style={{ textAlign: 'right' }} className="hide-mobile">Market Cap</th>
            </tr></thead>
            <tbody>
              {coins.map(c => (
                <tr key={c.slug} onClick={() => window.location.href = `/crypto/${c.slug}`}>
                  <td style={{ color: 'var(--muted)', fontWeight: 700 }}>{c.market_cap_rank}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {c.image && <img src={c.image} alt={c.name} width={30} height={30} style={{ borderRadius: '50%', flexShrink: 0 }} />}
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '14px' }}>{c.name}</div>
                        <div style={{ color: 'var(--muted)', fontSize: '11px', fontWeight: 600 }}>{c.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: '"JetBrains Mono"', fontWeight: 700, fontSize: '14px' }}>${formatPrice(c.price)}</td>
                  <td style={{ textAlign: 'right' }}>
                    <span className={(c.change_24h || 0) >= 0 ? 'price-up' : 'price-down'}>
                      {(c.change_24h || 0) >= 0 ? '▲' : '▼'} {Math.abs(c.change_24h || 0).toFixed(2)}%
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--muted)', fontSize: '13px' }} className="hide-mobile">{formatLargeNum(c.market_cap)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

function NewsSection({ articles, loading }: { articles: TechNews[]; loading: boolean }) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <SectionHeader title="📰 Latest Tech News" href="/news" accent="news" />
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1rem' }}>
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1rem' }}>
          {articles.map((item, i) => (
            <Link key={item.slug} href={`/news/${item.slug}`} style={{ textDecoration: 'none' }}>
              <article className="card card-news accent-news" style={{ animationDelay: `${i * 0.08}s`, height: '100%' }}>
                <div className="img-zoom" style={{ height: 160 }}>
                  {item.image
                    ? <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#fee2e2,#fecaca)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>📰</div>
                  }
                </div>
                <div style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
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
      )}
    </section>
  )
}

function GitHubSection({ repos, loading }: { repos: GithubProject[]; loading: boolean }) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <SectionHeader title="⭐ Trending GitHub Projects" href="/github" accent="github" />
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1rem' }}>
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1rem' }}>
          {repos.map(repo => (
            <Link key={repo.slug} href={`/github/${repo.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card card-github accent-github" style={{ padding: '1.25rem', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem' }}>
                  {repo.avatar_url && <img src={repo.avatar_url} alt={repo.owner} width={22} height={22} style={{ borderRadius: '50%' }} />}
                  <span style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'Poppins' }}>{repo.owner}</span>
                  {repo.language && <span className="badge badge-github" style={{ marginLeft: 'auto' }}>{repo.language}</span>}
                </div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '14px', marginBottom: '0.4rem', color: 'var(--text)' }}>{repo.repo_name?.split('/')[1]}</div>
                <p style={{ color: 'var(--muted)', fontSize: '12px', lineHeight: 1.6, marginBottom: '0.75rem' }}>{truncate(repo.description, 80)}</p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '13px', fontFamily: 'Poppins', fontWeight: 700 }}>
                  <span style={{ color: '#f59e0b' }}>⭐ {repo.stars?.toLocaleString()}</span>
                  <span style={{ color: 'var(--muted)' }}>🍴 {repo.forks?.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

function AIToolsSidebar({ tools, loading }: { tools: AITool[]; loading: boolean }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <SectionHeader title="🤖 AI Tools" href="/ai-tools" accent="aitools" />
      {loading ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />) : tools.map(tool => (
        <Link key={tool.slug} href={`/ai-tools/${tool.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '0.75rem' }}>
          <div className="card card-aitools" style={{ padding: '0.875rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            {tool.image
              ? <img src={tool.image} alt={tool.name} width={40} height={40} style={{ borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
              : <div style={{ width: 40, height: 40, background: '#ede9fe', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>🤖</div>
            }
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '13px', marginBottom: '0.2rem', color: 'var(--text)' }}>{tool.name}</div>
              <div style={{ color: 'var(--muted)', fontSize: '11px', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tool.tagline}</div>
              {tool.votes > 0 && <div style={{ color: '#7c3aed', fontSize: '11px', fontWeight: 700, fontFamily: 'Poppins', marginTop: '0.2rem' }}>▲ {tool.votes}</div>}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

function JobsSidebar({ jobs, loading }: { jobs: Job[]; loading: boolean }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <SectionHeader title="💼 Tech Jobs" href="/jobs" accent="jobs" />
      {loading ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />) : jobs.map(job => (
        <Link key={job.slug} href={`/jobs/${job.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '0.75rem' }}>
          <div className="card card-jobs accent-jobs" style={{ padding: '0.875rem' }}>
            <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '13px', marginBottom: '0.25rem', color: 'var(--text)' }}>{job.title}</div>
            <div style={{ color: '#2563eb', fontSize: '12px', fontWeight: 600, fontFamily: 'Poppins', marginBottom: '0.2rem' }}>{job.company}</div>
            <div style={{ color: 'var(--muted)', fontSize: '11px', fontFamily: 'Poppins' }}>📍 {job.location}</div>
            {(job.salary_min || job.salary) && <div style={{ color: '#16a34a', fontSize: '11px', fontWeight: 700, fontFamily: 'Poppins', marginTop: '0.2rem' }}>{formatSalary(job.salary_min, job.salary_max, job.salary)}</div>}
          </div>
        </Link>
      ))}
    </div>
  )
}

function StartupsSidebar({ startups, loading }: { startups: StartupNews[]; loading: boolean }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <SectionHeader title="🚀 Startup News" href="/startups" accent="startups" />
      {loading ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />) : startups.map(item => (
        <Link key={item.slug} href={`/startups/${item.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '0.75rem' }}>
          <div className="card card-startups accent-startups" style={{ padding: '0.875rem' }}>
            <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '13px', marginBottom: '0.35rem', lineHeight: 1.4, color: 'var(--text)' }}>{truncate(item.title, 70)}</div>
            {item.funding_amount && <span style={{ background: '#ffedd5', color: '#ea580c', padding: '2px 8px', borderRadius: 999, fontSize: '11px', fontWeight: 700, fontFamily: 'Poppins' }}>💰 {item.funding_amount}</span>}
            <div style={{ color: 'var(--light)', fontSize: '11px', fontFamily: 'Poppins', marginTop: '0.35rem' }}>{timeAgo(item.published_at)}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
