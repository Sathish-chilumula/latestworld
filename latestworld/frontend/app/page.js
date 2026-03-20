'use client'
import { useEffect, useState } from 'react'
import { getHomepageData } from '../lib/supabase'

export default function HomePage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getHomepageData()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSkeleton />

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem', background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          LatestWorld
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
          Crypto · Tech News · AI Tools · GitHub · Jobs · Startups — Updated automatically, every few hours
        </p>
      </div>

      {/* Crypto Section */}
      <Section title="💹 Top Cryptocurrencies" href="/crypto" items={data?.crypto} renderItem={CryptoCard} />

      {/* Tech News */}
      <Section title="📰 Latest Tech News" href="/tech-news" items={data?.news} renderItem={NewsCard} />

      {/* AI Tools */}
      <Section title="🤖 Latest AI Tools" href="/ai-tools" items={data?.aiTools} renderItem={AIToolCard} />

      {/* GitHub */}
      <Section title="⭐ Trending GitHub Projects" href="/github-projects" items={data?.github} renderItem={GitHubCard} />

      {/* Jobs */}
      <Section title="💼 Latest Tech Jobs" href="/tech-jobs" items={data?.jobs} renderItem={JobCard} />

      {/* Startups */}
      <Section title="🚀 Startup & Funding News" href="/startup-news" items={data?.startups} renderItem={NewsCard} />

    </div>
  )
}

function Section({ title, href, items, renderItem }) {
  if (!items?.length) return null
  return (
    <div style={{ marginBottom: '3rem' }}>
      <div className="section-title">
        {title}
        <a href={href} className="view-all">View all →</a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {items.map((item, i) => renderItem(item, i))}
      </div>
    </div>
  )
}

function CryptoCard(coin) {
  const isUp = coin.change_24h >= 0
  return (
    <a key={coin.slug} href={`/crypto/${coin.slug}`} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {coin.image && <img src={coin.image} alt={coin.coin_name} width={36} height={36} style={{ borderRadius: '50%' }} />}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, color: '#e2e8f0' }}>{coin.coin_name}</div>
          <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{coin.symbol}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 700, color: '#e2e8f0' }}>${Number(coin.price).toLocaleString()}</div>
          <div className={isUp ? 'price-up' : 'price-down'} style={{ fontSize: '0.8rem', fontWeight: 600 }}>
            {isUp ? '▲' : '▼'} {Math.abs(coin.change_24h).toFixed(2)}%
          </div>
        </div>
      </div>
    </a>
  )
}

function NewsCard(item) {
  const table = item.funding_amount !== undefined ? 'startup-news' : 'tech-news'
  return (
    <a key={item.slug} href={`/${table}/${item.slug}`} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ padding: '1rem', height: '100%' }}>
        {item.image && (
          <img src={item.image} alt={item.title} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, marginBottom: '0.75rem' }} loading="lazy" />
        )}
        <div style={{ fontSize: '0.875rem', color: '#38bdf8', marginBottom: '0.25rem' }}>{item.source}</div>
        <div style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.4 }}>{item.title}</div>
        <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.5rem' }}>
          {item.summary?.substring(0, 100)}...
        </div>
      </div>
    </a>
  )
}

function AIToolCard(tool) {
  return (
    <a key={tool.slug} href={`/ai-tools/${tool.slug}`} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ padding: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
        {tool.image && <img src={tool.image} alt={tool.name} width={44} height={44} style={{ borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />}
        <div>
          <div style={{ fontWeight: 600, color: '#e2e8f0' }}>{tool.name}</div>
          <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.25rem' }}>{tool.tagline?.substring(0, 80)}</div>
          {tool.votes > 0 && <div style={{ color: '#f59e0b', fontSize: '0.75rem', marginTop: '0.5rem' }}>▲ {tool.votes} upvotes</div>}
        </div>
      </div>
    </a>
  )
}

function GitHubCard(repo) {
  return (
    <a key={repo.slug} href={`/github-projects/${repo.slug}`} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          {repo.avatar_url && <img src={repo.avatar_url} alt={repo.owner} width={20} height={20} style={{ borderRadius: '50%' }} />}
          <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{repo.owner}</div>
          {repo.language && <span className="badge badge-blue" style={{ marginLeft: 'auto' }}>{repo.language}</span>}
        </div>
        <div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: '0.25rem' }}>{repo.repo_name?.split('/')[1]}</div>
        <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{repo.description?.substring(0, 80)}</div>
        <div style={{ color: '#f59e0b', fontSize: '0.8rem' }}>⭐ {repo.stars?.toLocaleString()}</div>
      </div>
    </a>
  )
}

function JobCard(job) {
  return (
    <a key={job.slug} href={`/tech-jobs/${job.slug}`} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ padding: '1rem' }}>
        <div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: '0.25rem' }}>{job.title}</div>
        <div style={{ color: '#38bdf8', fontSize: '0.85rem', marginBottom: '0.25rem' }}>{job.company}</div>
        <div style={{ color: '#64748b', fontSize: '0.8rem' }}>📍 {job.location}</div>
        {job.salary_min && (
          <div style={{ color: '#22c55e', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            ₹{Number(job.salary_min).toLocaleString()} — ₹{Number(job.salary_max).toLocaleString()}
          </div>
        )}
      </div>
    </a>
  )
}

function LoadingSkeleton() {
  return (
    <div style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ marginBottom: '2rem' }}>
          <div style={{ height: 24, background: '#1e1e2e', borderRadius: 6, width: 200, marginBottom: '1rem' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[1, 2, 3].map(j => (
              <div key={j} style={{ height: 120, background: '#111118', borderRadius: 12, border: '1px solid #1e1e2e' }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
