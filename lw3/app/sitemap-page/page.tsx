import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Sitemap — LatestWorld', description: 'Full HTML sitemap of LatestWorld.in — all sections and pages.' }

export default function SitemapPage() {
  const sections = [
    { title: '💹 Cryptocurrency', links: [['Crypto Market Overview', '/crypto'], ['Bitcoin Price', '/crypto/bitcoin'], ['Ethereum Price', '/crypto/ethereum']] },
    { title: '📰 Tech News', links: [['Latest Tech News', '/news'], ['AI News', '/news'], ['India Tech News', '/news']] },
    { title: '🤖 AI Tools', links: [['All AI Tools', '/ai-tools'], ['Free AI Tools', '/ai-tools'], ['New AI Launches', '/ai-tools']] },
    { title: '⭐ GitHub Projects', links: [['Trending Repositories', '/github'], ['JavaScript Projects', '/github'], ['Python Projects', '/github']] },
    { title: '💼 Tech Jobs', links: [['All Tech Jobs', '/jobs'], ['React Developer Jobs', '/jobs'], ['Python Developer Jobs', '/jobs']] },
    { title: '🚀 Startups', links: [['Startup Funding News', '/startups'], ['India Startups', '/startups'], ['Series A Funding', '/startups']] },
    { title: '📄 Company', links: [['About LatestWorld', '/about'], ['Contact Us', '/contact'], ['Privacy Policy', '/privacy-policy'], ['Terms of Service', '/terms'], ['Disclaimer', '/disclaimer']] },
  ]
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '3rem 1.25rem' }}>
      <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2rem', marginBottom: '0.4rem' }}>Site Map</h1>
      <p style={{ color: 'var(--muted)', fontFamily: 'Poppins', marginBottom: '2rem' }}>Complete directory of all pages on LatestWorld.in</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1.25rem' }}>
        {sections.map(s => (
          <div key={s.title} className="card" style={{ padding: '1.25rem' }}>
            <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '14px', marginBottom: '0.75rem', color: 'var(--text)' }}>{s.title}</div>
            {s.links.map(([label, href]) => (
              <Link key={href + label} href={href} style={{ display: 'block', color: '#e63946', textDecoration: 'none', fontFamily: 'Poppins', fontSize: '13px', marginBottom: '0.35rem', fontWeight: 500 }}>→ {label}</Link>
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-soft)', borderRadius: 10, fontFamily: 'Poppins', fontSize: '13px', color: 'var(--muted)' }}>
        🤖 XML Sitemap for search engines: <a href="/sitemap.xml" style={{ color: '#e63946', fontWeight: 600 }}>sitemap.xml</a> — auto-updated with every new page added by our cron jobs.
      </div>
    </div>
  )
}
