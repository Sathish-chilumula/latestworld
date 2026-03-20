'use client'
import Link from 'next/link'

const SECTIONS = [
  ['💹 Crypto', '/crypto'],
  ['📰 Tech News', '/news'],
  ['🤖 AI Tools', '/ai-tools'],
  ['⭐ GitHub', '/github'],
  ['💼 Jobs', '/jobs'],
  ['🚀 Startups', '/startups'],
] as const

const COMPANY = [
  ['About Us', '/about'],
  ['Contact', '/contact'],
  ['Privacy Policy', '/privacy-policy'],
  ['Terms of Service', '/terms'],
  ['Disclaimer', '/disclaimer'],
  ['Sitemap', '/sitemap-page'],
] as const

const SOURCES = [
  { label: 'Crypto', name: 'CoinGecko', href: 'https://www.coingecko.com?utm_source=latestworld&utm_medium=referral', color: '#f59e0b' },
  { label: 'News', name: 'GNews API', href: 'https://gnews.io', color: '#e63946' },
  { label: 'AI Tools', name: 'Product Hunt', href: 'https://producthunt.com', color: '#7c3aed' },
  { label: 'Jobs', name: 'Adzuna', href: 'https://adzuna.com', color: '#2563eb' },
  { label: 'Projects', name: 'GitHub API', href: 'https://github.com', color: '#16a34a' },
] as const

export default function Footer() {
  return (
    <footer style={{
      background: '#040d1a',
      color: '#7a9ab8',
      marginTop: '5rem',
      borderTop: '2px solid rgba(230,57,70,0.4)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle grid background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* Main grid */}
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '3.5rem 1.25rem 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
        gap: '2.5rem',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Brand column */}
        <div>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #e63946, #c1121f)',
              color: 'white',
              width: 36,
              height: 36,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 900,
              fontSize: '0.9rem',
              boxShadow: '0 4px 14px rgba(230,57,70,0.4)',
              flexShrink: 0,
            }}>LW</div>
            <span style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              color: 'white',
              fontSize: '1.05rem',
              letterSpacing: '-0.02em',
            }}>LatestWorld</span>
          </Link>
          <p style={{ fontSize: '13px', lineHeight: 1.75, marginBottom: '1.25rem' }}>
            India&apos;s automated tech intelligence hub. Crypto, News, AI Tools, GitHub, Jobs and Startups — all updated automatically every few hours.
          </p>
          {/* Social placeholders */}
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { icon: '𝕏', label: 'X / Twitter', color: '#e2e8f0' },
              { icon: '✈️', label: 'Telegram', color: '#2ca5e0' },
              { icon: '📨', label: 'Newsletter', color: '#e63946' },
            ].map(s => (
              <div key={s.label} title={s.label} style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                cursor: 'default',
                transition: 'all 0.2s',
              }}>
                {s.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div>
          <div style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            color: 'white',
            marginBottom: '1rem',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>Sections</div>
          {SECTIONS.map(([l, h]) => (
            <Link key={h} href={h} style={{
              display: 'block',
              color: '#7a9ab8',
              textDecoration: 'none',
              fontSize: '13px',
              marginBottom: '0.45rem',
              fontFamily: 'Poppins, sans-serif',
              transition: 'color 0.15s',
              fontWeight: 500,
            }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.color = '#e8f0fe' }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.color = '#7a9ab8' }}
            >{l}</Link>
          ))}
        </div>

        {/* Company */}
        <div>
          <div style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            color: 'white',
            marginBottom: '1rem',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>Company</div>
          {COMPANY.map(([l, h]) => (
            <Link key={h} href={h} style={{
              display: 'block',
              color: '#7a9ab8',
              textDecoration: 'none',
              fontSize: '13px',
              marginBottom: '0.45rem',
              fontFamily: 'Poppins, sans-serif',
              transition: 'color 0.15s',
              fontWeight: 500,
            }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.color = '#e8f0fe' }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.color = '#7a9ab8' }}
            >{l}</Link>
          ))}
        </div>

        {/* Data Sources */}
        <div>
          <div style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            color: 'white',
            marginBottom: '1rem',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>Data Sources</div>
          {SOURCES.map(s => (
            <div key={s.label} style={{ marginBottom: '0.5rem', fontSize: '12px', fontFamily: 'Poppins, sans-serif', display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ color: '#4a6a8a' }}>{s.label}:</span>
              <a href={s.href} target="_blank" rel="noopener noreferrer" style={{
                color: s.color,
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'opacity 0.15s'
              }}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.opacity = '0.75' }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              >{s.name}</a>
            </div>
          ))}

          {/* Auto-update badge */}
          <div style={{
            marginTop: '1.25rem',
            padding: '10px 14px',
            borderRadius: 10,
            background: 'rgba(22,163,74,0.08)',
            border: '1px solid rgba(22,163,74,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{ color: '#4ade80', fontSize: '16px' }}>⚡</span>
            <div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '11px', color: '#4ade80' }}>100% Automated</div>
              <div style={{ fontSize: '10px', color: '#4a6a8a' }}>Zero manual writing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '1.25rem',
        textAlign: 'center',
        fontSize: '12px',
        fontFamily: 'Poppins, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        flexWrap: 'wrap',
        color: '#4a6a8a',
      }}>
        <span>© {new Date().getFullYear()} LatestWorld.in — All data auto-updated</span>
        {[['Privacy', '/privacy-policy'], ['Terms', '/terms'], ['Disclaimer', '/disclaimer']].map(([l, h]) => (
          <Link key={h} href={h} style={{ color: '#4a6a8a', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.color = '#7a9ab8' }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.color = '#4a6a8a' }}
          >{l}</Link>
        ))}
      </div>
    </footer>
  )
}
