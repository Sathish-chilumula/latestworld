'use client'
import { useState } from 'react'
import Link from 'next/link'

// ── Breaking news ticker ──────────────────────────
export function BreakingTicker() {
  const items = [
    '🔴 Crypto prices updating every 6 hours',
    '📰 Tech news fetched from global sources',
    '🤖 New AI tools from Product Hunt daily',
    '⭐ GitHub trending repos updated daily',
    '💼 Tech jobs updated twice daily',
    '🚀 Startup funding news from India & worldwide',
    '🔴 All data 100% automated — zero manual writing',
  ]
  const doubled = [...items, ...items]
  return (
    <div style={{ background: '#e63946', color: 'white', height: 34, display: 'flex', alignItems: 'center', overflow: 'hidden', flexShrink: 0 }}>
      <div style={{ background: '#8b0000', padding: '0 16px', height: '100%', display: 'flex', alignItems: 'center', fontFamily: 'Poppins', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', whiteSpace: 'nowrap', flexShrink: 0 }}>
        🔴 LIVE
      </div>
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div className="ticker-track">
          {doubled.map((item, i) => (
            <span key={i} style={{ padding: '0 48px', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 500, whiteSpace: 'nowrap' }}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Crypto price ticker strip ─────────────────────
export function CryptoTicker({ coins }: { coins: any[] }) {
  if (!coins?.length) return null
  const doubled = [...coins, ...coins]
  return (
    <div style={{ background: '#070b14', padding: '10px 0', overflow: 'hidden', marginBottom: '2rem' }}>
      <div className="ticker-track" style={{ animationDuration: '25s' }}>
        {doubled.map((coin: any, i: number) => (
          <Link key={i} href={`/crypto/${coin.slug}`} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7, padding: '0 20px', borderRight: '1px solid #1e293b', flexShrink: 0 }}>
            {coin.image && <img src={coin.image} alt={coin.name} width={18} height={18} style={{ borderRadius: '50%', flexShrink: 0 }} />}
            <span style={{ fontFamily: 'Poppins', fontWeight: 700, color: 'white', fontSize: '13px' }}>{coin.symbol}</span>
            <span style={{ fontFamily: '"JetBrains Mono"', color: '#e2e8f0', fontSize: '13px' }}>
              ${coin.price >= 1 ? Number(coin.price).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : Number(coin.price).toFixed(4)}
            </span>
            <span style={{ fontFamily: 'Poppins', fontSize: '11px', fontWeight: 700, color: (coin.change_24h || 0) >= 0 ? '#22c55e' : '#ef4444' }}>
              {(coin.change_24h || 0) >= 0 ? '▲' : '▼'}{Math.abs(coin.change_24h || 0).toFixed(2)}%
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ── Ad Slot ───────────────────────────────────────
export function AdSlot({ width = 728, height = 90, label = '' }: { width?: number; height?: number; label?: string }) {
  return (
    <div className="ad-slot" style={{ width: '100%', maxWidth: width, height, margin: '1rem auto' }}>
      {/* Google AdSense — add script after approval */}
      <span>Ad Space {width}×{height}{label ? ` · ${label}` : ''}</span>
    </div>
  )
}

// ── Skeleton card ─────────────────────────────────
export function SkeletonCard({ h = 200 }: { h?: number }) {
  return (
    <div className="card" style={{ padding: '1rem' }}>
      <div className="skeleton" style={{ height: h * 0.5, marginBottom: 12 }} />
      <div className="skeleton" style={{ height: 16, width: '80%', marginBottom: 8 }} />
      <div className="skeleton" style={{ height: 14, width: '60%', marginBottom: 8 }} />
      <div className="skeleton" style={{ height: 12, width: '40%' }} />
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
      <div className="skeleton" style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div className="skeleton" style={{ height: 14, width: '60%', marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 12, width: '40%' }} />
      </div>
      <div className="skeleton" style={{ height: 16, width: 80 }} />
    </div>
  )
}

// ── Breadcrumb ────────────────────────────────────
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumb" aria-label="breadcrumb" style={{ marginBottom: '1.5rem' }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span style={{ color: 'var(--text)', fontWeight: 600 }}>{item.label}</span>}
          {i < items.length - 1 && <span>/</span>}
        </span>
      ))}
    </nav>
  )
}

// ── FAQ Accordion ─────────────────────────────────
export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div>
      <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text)' }}>Frequently Asked Questions</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: items.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } }))
      })}} />
      {items.map((item, i) => (
        <div key={i} className="faq-item">
          <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
            <span>{item.q}</span>
            <span style={{ color: 'var(--muted)', transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
          </button>
          {open === i && <div className="faq-a">{item.a}</div>}
        </div>
      ))}
    </div>
  )
}

// ── Section Header ────────────────────────────────
export function SectionHeader({ title, href, accent, badge }: { title: string; href: string; accent: string; badge?: string }) {
  return (
    <div>
      <div className="section-header">
        <div className="section-title">
          {title}
          {badge && <span className="live-badge" style={{ fontSize: '10px', marginLeft: 8 }}><span className="live-dot" />{badge}</span>}
        </div>
        <Link href={href} className="btn-outline" style={{ fontSize: '12px', padding: '6px 14px' }}>View all →</Link>
      </div>
      <div className={`section-divider div-${accent}`} />
    </div>
  )
}
