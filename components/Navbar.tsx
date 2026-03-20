'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV = [
  { href: '/crypto', label: '💹 Crypto', color: '#f59e0b' },
  { href: '/news', label: '📰 News', color: '#e63946' },
  { href: '/ai-tools', label: '🤖 AI Tools', color: '#7c3aed' },
  { href: '/github', label: '⭐ GitHub', color: '#16a34a' },
  { href: '/jobs', label: '💼 Jobs', color: '#2563eb' },
  { href: '/startups', label: '🚀 Startups', color: '#ea580c' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') { setDark(true); document.documentElement.classList.add('dark') }
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.92)' : '#fff',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: '3px solid #e63946',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.3s'
      }} className="dark:bg-gray-900/90">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.25rem', display: 'flex', alignItems: 'center', height: 62, gap: '1.5rem' }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ background: 'linear-gradient(135deg,#e63946,#c1121f)', color: 'white', width: 38, height: 38, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.15rem', boxShadow: '0 4px 12px rgba(230,57,70,0.4)' }}>L</div>
            <div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text)', lineHeight: 1 }}>LatestWorld</div>
              <div style={{ fontFamily: 'Poppins', fontSize: '9px', color: '#e63946', fontWeight: 700, letterSpacing: '0.1em' }}>LATESTWORLD.IN</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: '2px', alignItems: 'center', flex: 1, overflowX: 'auto' }} className="hide-mobile">
            {NAV.map(n => (
              <Link key={n.href} href={n.href} style={{ textDecoration: 'none', padding: '7px 12px', borderRadius: 8, fontFamily: 'Poppins', fontWeight: 600, fontSize: '13px', color: 'var(--muted)', whiteSpace: 'nowrap', transition: 'all 0.15s' }}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = '#f8fafc'; (e.currentTarget as HTMLElement).style.color = n.color }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}>
                {n.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
            <div className="live-badge"><span className="live-dot" />LIVE</div>

            {/* Dark mode toggle */}
            <button onClick={toggleDark} style={{ background: 'var(--bg-soft)', border: '1.5px solid var(--border)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: '16px', lineHeight: 1 }} title="Toggle dark mode">
              {dark ? '☀️' : '🌙'}
            </button>

            {/* Hamburger */}
            <button onClick={() => setOpen(!open)} className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'none' }} aria-label="Menu">
              <div style={{ width: 22, height: 2, background: 'var(--text)', marginBottom: 5, transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
              <div style={{ width: 22, height: 2, background: 'var(--text)', marginBottom: 5, opacity: open ? 0 : 1, transition: 'all 0.3s' }} />
              <div style={{ width: 22, height: 2, background: 'var(--text)', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
            </button>
          </div>

          {/* Mobile hamburger visible */}
          <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', flexDirection: 'column', gap: 5 }} className="md:hidden">
            <div style={{ width: 22, height: 2, background: 'var(--text)', transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <div style={{ width: 22, height: 2, background: 'var(--text)', opacity: open ? 0 : 1, transition: 'all 0.3s' }} />
            <div style={{ width: 22, height: 2, background: 'var(--text)', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Mobile slide-in drawer */}
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setOpen(false)}>
          <div style={{ position: 'absolute', top: 65, left: 0, right: 0, background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '1rem 1.25rem', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>
            {NAV.map(n => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} style={{ display: 'block', padding: '12px 0', fontFamily: 'Poppins', fontWeight: 600, fontSize: '15px', color: n.color, textDecoration: 'none', borderBottom: '1px solid var(--border)' }}>
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
