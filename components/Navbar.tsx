'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const NAV = [
  { href: '/crypto',   label: 'Crypto',   icon: '💹', color: '#f59e0b' },
  { href: '/news',     label: 'News',      icon: '📰', color: '#e63946' },
  { href: '/ai-tools', label: 'AI Tools',  icon: '🤖', color: '#7c3aed' },
  { href: '/github',   label: 'GitHub',    icon: '⭐', color: '#16a34a' },
  { href: '/jobs',     label: 'Jobs',      icon: '💼', color: '#2563eb' },
  { href: '/startups', label: 'Startups',  icon: '🚀', color: '#ea580c' },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [dark, setDark]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  /* Init dark mode from localStorage + scroll listener */
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (saved === 'dark' || (!saved && prefersDark)) {
      setDark(true)
      document.documentElement.classList.add('dark')
    }
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close drawer on route change */
  useEffect(() => { setOpen(false) }, [pathname])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 200,
        height: 60,
        background: scrolled
          ? (dark ? 'rgba(4,13,26,0.92)' : 'rgba(250,251,255,0.92)')
          : (dark ? 'rgba(4,13,26,0.98)' : '#fafbff'),
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 1.25rem',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem'
        }}>

          {/* ── Logo ── */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{
              background: 'linear-gradient(135deg, #e63946 0%, #c1121f 100%)',
              color: 'white',
              width: 36,
              height: 36,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 900,
              fontSize: '0.95rem',
              boxShadow: '0 4px 14px rgba(230,57,70,0.45)',
              flexShrink: 0,
              letterSpacing: '-0.03em',
            }}>LW</div>
            <div className="hide-mobile">
              <div style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 800,
                fontSize: '1rem',
                color: 'var(--text)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}>LatestWorld</div>
              <div style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '9px',
                color: '#e63946',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>LATESTWORLD.IN</div>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav style={{
            display: 'flex',
            gap: '2px',
            alignItems: 'center',
            flex: 1,
            overflowX: 'auto',
          }} className="hide-mobile">
            {NAV.map(n => {
              const active = isActive(n.href)
              return (
                <Link key={n.href} href={n.href} className="nav-item-hover" style={{
                  textDecoration: 'none',
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: '13px',
                  color: active ? n.color : 'var(--muted)',
                  background: active ? `${n.color}12` : 'transparent',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.18s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  position: 'relative',
                  '--nav-color': n.color,
                  '--nav-bg': `${n.color}10`,
                } as React.CSSProperties}
                >
                  <span style={{ fontSize: '14px' }}>{n.icon}</span>
                  {n.label}
                  {active && (
                    <span style={{
                      position: 'absolute',
                      bottom: -1,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 18,
                      height: 2,
                      background: n.color,
                      borderRadius: 999,
                    }} />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* ── Right controls ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', flexShrink: 0 }}>
            {/* Live badge */}
            <div className="live-badge hide-mobile">
              <span className="live-dot" />LIVE
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              title={dark ? 'Switch to light' : 'Switch to dark'}
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                border: '1.5px solid var(--border)',
                background: 'var(--bg-soft)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '15px',
                transition: 'all 0.2s ease',
              }}
            >
              {dark ? '☀️' : '🌙'}
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Open menu"
              style={{
                display: 'none',
                flexDirection: 'column',
                gap: 5,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 6,
              }}
              className="show-mobile-flex"
            >
              <span style={{
                display: 'block',
                width: 22,
                height: 2,
                background: 'var(--text)',
                borderRadius: 2,
                transition: 'all 0.3s',
                transformOrigin: 'center',
                transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }} />
              <span style={{
                display: 'block',
                width: 22,
                height: 2,
                background: 'var(--text)',
                borderRadius: 2,
                transition: 'all 0.3s',
                opacity: open ? 0 : 1,
              }} />
              <span style={{
                display: 'block',
                width: 22,
                height: 2,
                background: 'var(--text)',
                borderRadius: 2,
                transition: 'all 0.3s',
                transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
              }} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 190,
                background: 'rgba(4,13,26,0.5)',
                backdropFilter: 'blur(4px)',
              }}
            />
            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                position: 'fixed',
                top: 60,
                left: 0,
                right: 0,
                zIndex: 195,
                background: 'var(--surface)',
                borderBottom: '1px solid var(--border)',
                boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
                padding: '0.75rem 1.25rem 1.25rem',
              }}
            >
              {NAV.map((n, i) => {
                const active = isActive(n.href)
                return (
                  <motion.div
                    key={n.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                    onClick={() => setOpen(false)}
                  >
                    <Link
                      href={n.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '13px 0',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 600,
                        fontSize: '15px',
                        color: active ? n.color : 'var(--text)',
                        textDecoration: 'none',
                        borderBottom: '1px solid var(--border)',
                        transition: 'color 0.15s',
                      }}
                    >
                      <span style={{ fontSize: '18px' }}>{n.icon}</span>
                      {n.label}
                      {active && (
                        <span style={{
                          marginLeft: 'auto',
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: n.color,
                        }} />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="live-badge"><span className="live-dot" />LIVE</div>
                <button onClick={() => { toggleDark(); setOpen(false) }} style={{
                  background: 'var(--bg-soft)', border: '1.5px solid var(--border)',
                  borderRadius: 8, padding: '8px 16px',
                  fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '13px',
                  color: 'var(--muted)', cursor: 'pointer'
                }}>
                  {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) { .show-mobile-flex { display: flex !important; } }
        @media (min-width: 769px) { .show-mobile-flex { display: none !important; } }
      `}</style>
    </>
  )
}
