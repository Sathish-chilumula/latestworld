'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

// ── Breaking News Ticker ──────────────────────────────────────────────────────
export function BreakingTicker() {
  const items = [
    '🔴 Crypto prices updating every 6 hours via CoinGecko',
    '📰 Tech news fetched automatically from global sources',
    '🤖 New AI tools from Product Hunt — updated daily',
    '⭐ GitHub trending repositories refreshed every day',
    '💼 Tech job listings updated twice daily from Adzuna',
    '🚀 Startup funding news from India & worldwide',
    '⚡ All data 100% automated — zero manual writing',
    '🌏 Built for India\'s tech community',
  ]
  const doubled = [...items, ...items]
  return (
    <div style={{
      background: 'linear-gradient(90deg, #1a0007 0%, #2d000f 30%, #1a0007 100%)',
      color: 'white',
      height: 36,
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      flexShrink: 0,
      borderBottom: '1px solid rgba(230,57,70,0.3)',
      position: 'relative',
      zIndex: 201,
    }}>
      {/* Label pill */}
      <div style={{
        background: '#e63946',
        padding: '0 16px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 800,
        fontSize: '10px',
        letterSpacing: '0.12em',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        textTransform: 'uppercase',
      }}>
        <span style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'white',
          animation: 'pulseDot 1.5s ease-in-out infinite',
          flexShrink: 0,
        }} />
        BREAKING
      </div>

      {/* Vertical separator */}
      <div style={{ width: 1, height: '100%', background: 'rgba(230,57,70,0.4)', flexShrink: 0 }} />

      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div className="ticker-track" style={{ animationDuration: '55s' }}>
          {doubled.map((item, i) => (
            <span key={i} style={{
              padding: '0 36px',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '11.5px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              color: '#e2e8f0',
              letterSpacing: '0.01em',
            }}>
              {item}
              <span style={{ marginLeft: 36, color: 'rgba(230,57,70,0.6)' }}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Fade edges */}
      <div style={{
        position: 'absolute',
        left: 100,
        top: 0,
        width: 40,
        height: '100%',
        background: 'linear-gradient(90deg, rgba(26,0,7,0.8), transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: 60,
        height: '100%',
        background: 'linear-gradient(270deg, rgba(26,0,7,0.9), transparent)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

// ── Bloomberg-Style Crypto Ticker Strip ───────────────────────────────────────
export function CryptoTicker({ coins }: { coins: any[] }) {
  if (!coins?.length) return null
  const doubled = [...coins, ...coins]
  return (
    <div style={{
      background: 'linear-gradient(180deg, #050d1e 0%, #040a18 100%)',
      padding: '9px 0',
      overflow: 'hidden',
      marginBottom: '2rem',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      position: 'relative',
    }}>
      <div className="ticker-track" style={{ animationDuration: '30s' }}>
        {doubled.map((coin: any, i: number) => {
          const positive = (coin.change_24h || 0) >= 0
          return (
            <Link key={i} href={`/crypto/${coin.slug}`} style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '0 18px',
              borderRight: '1px solid rgba(255,255,255,0.07)',
              flexShrink: 0,
              transition: 'background 0.15s',
            }}>
              {coin.image && (
                <img src={coin.image} alt={coin.name} width={16} height={16} style={{
                  borderRadius: '50%',
                  flexShrink: 0,
                  filter: 'brightness(0.95)',
                }} />
              )}
              <span style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                color: '#94a3b8',
                fontSize: '11px',
                letterSpacing: '0.04em',
              }}>{coin.symbol}</span>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace',
                color: '#e2e8f0',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '-0.02em',
              }}>
                ${coin.price >= 1
                  ? Number(coin.price).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : Number(coin.price).toFixed(4)
                }
              </span>
              <span style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                color: positive ? '#4ade80' : '#f87171',
                background: positive ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)',
                padding: '1px 6px',
                borderRadius: 4,
              }}>
                {positive ? '▲' : '▼'} {Math.abs(coin.change_24h || 0).toFixed(2)}%
              </span>
            </Link>
          )
        })}
      </div>
      {/* Fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 50, height: '100%', background: 'linear-gradient(90deg, #050d1e, transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, width: 80, height: '100%', background: 'linear-gradient(270deg, #050d1e, transparent)', pointerEvents: 'none' }} />
    </div>
  )
}

// ── Ad Slot ───────────────────────────────────────────────────────────────────
export function AdSlot({ width = 728, height = 90, label = '' }: { width?: number; height?: number; label?: string }) {
  return (
    <div className="ad-slot" style={{ width: '100%', maxWidth: width, height, margin: '1rem auto' }}>
      {/* Google AdSense — add script after approval */}
      <span>Ad Space {width}×{height}{label ? ` · ${label}` : ''}</span>
    </div>
  )
}

// ── Skeleton Card ─────────────────────────────────────────────────────────────
export function SkeletonCard({ h = 200 }: { h?: number }) {
  return (
    <div className="card" style={{ padding: '1rem' }}>
      <div className="skeleton" style={{ height: h * 0.5, marginBottom: 12 }} />
      <div className="skeleton" style={{ height: 16, width: '75%', marginBottom: 8 }} />
      <div className="skeleton" style={{ height: 13, width: '55%', marginBottom: 8 }} />
      <div className="skeleton" style={{ height: 11, width: '40%' }} />
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '13px 0', borderBottom: '1px solid var(--border)' }}>
      <div className="skeleton" style={{ width: 34, height: 34, borderRadius: '50%', flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div className="skeleton" style={{ height: 14, width: '60%', marginBottom: 7 }} />
        <div className="skeleton" style={{ height: 11, width: '40%' }} />
      </div>
      <div className="skeleton" style={{ height: 16, width: 80, flexShrink: 0 }} />
    </div>
  )
}

// ── Breadcrumb ────────────────────────────────────────────────────────────────
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumb" aria-label="breadcrumb" style={{ marginBottom: '1.5rem' }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {item.href
            ? <Link href={item.href}>{item.label}</Link>
            : <span style={{ color: 'var(--text)', fontWeight: 600 }}>{item.label}</span>
          }
          {i < items.length - 1 && <span style={{ color: 'var(--light)', fontSize: 14 }}>›</span>}
        </span>
      ))}
    </nav>
  )
}

// ── FAQ Accordion ─────────────────────────────────────────────────────────────
export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div>
      <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text)' }}>
        Frequently Asked Questions
      </h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: items.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } }))
      })}} />
      {items.map((item, i) => (
        <div key={i} className="faq-item">
          <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
            <span>{item.q}</span>
            <span style={{
              color: 'var(--muted)',
              transform: open === i ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.25s ease',
              fontSize: 12,
            }}>▼</span>
          </button>
          {open === i && <div className="faq-a">{item.a}</div>}
        </div>
      ))}
    </div>
  )
}

// ── Section Header ────────────────────────────────────────────────────────────
export function SectionHeader({ title, href, accent, badge }: { title: string; href: string; accent: string; badge?: string }) {
  return (
    <div>
      <div className="section-header">
        <div className="section-title">
          {title}
          {badge && (
            <span className="live-badge" style={{ fontSize: '9px', padding: '3px 10px' }}>
              <span className="live-dot" />{badge}
            </span>
          )}
        </div>
        <Link href={href} className="btn-outline" style={{ fontSize: '12px', padding: '7px 14px' }}>
          View all <span style={{ marginLeft: 2 }}>→</span>
        </Link>
      </div>
      <div className={`section-divider div-${accent}`} />
    </div>
  )
}

// ── Fade-In Section (scroll animation wrapper) ────────────────────────────────
export function FadeInSection({ children, delay = 0, className = '' }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { rootMargin: '0px 0px -50px 0px' })
    
    // Add small delay to ensure layout is complete before observing
    setTimeout(() => {
      if (ref.current) observer.observe(ref.current)
    }, 100)
    
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${className} fade-in-section ${inView ? 'is-visible' : ''}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}

// ── Stagger Grid (reveal children one by one) ─────────────────────────────────
export function StaggerGrid({ children, className = '', style = {} }: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { rootMargin: '0px 0px -30px 0px' })
    
    setTimeout(() => {
      if (ref.current) observer.observe(ref.current)
    }, 100)
    
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className} style={style}>
      {React.Children.map(children, (child, i) => {
        if (!React.isValidElement(child)) return child;
        const element = child as React.ReactElement<any>;
        return React.cloneElement(element, {
          ...element.props,
          className: `${element.props.className || ''} stagger-item ${inView ? 'is-visible' : ''}`.trim(),
          style: { ...element.props.style, transitionDelay: `${i * 0.07}s` }
        })
      })}
    </div>
  )
}

// ── Stagger Item ──────────────────────────────────────────────────────────────
export function StaggerItem({ children, className = '', style = {} }: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}
