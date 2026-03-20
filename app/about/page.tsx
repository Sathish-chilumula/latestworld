import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'About LatestWorld — India\'s Automated Tech Hub', description: 'Learn about LatestWorld.in, India\'s automated technology intelligence platform covering crypto, news, AI tools, GitHub, jobs and startups.' }

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '3rem 1.25rem' }}>
      <div style={{ background: 'linear-gradient(135deg,#fee2e2,#fff5f5)', borderLeft: '6px solid #e63946', borderRadius: 16, padding: '2rem', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2rem', marginBottom: '0.5rem' }}>About LatestWorld</h1>
        <p style={{ color: 'var(--muted)', fontFamily: 'Poppins', fontSize: '15px', margin: 0 }}>India's #1 Automated Technology Intelligence Hub</p>
      </div>

      {[
        { title: 'What is LatestWorld?', body: 'LatestWorld.in is a fully automated technology content platform built for India\'s growing digital audience. We aggregate real-time data from the world\'s most trusted technology data sources and present it in a clean, readable format — updated automatically multiple times every day, with zero manual content writing.' },
        { title: 'Our Mission', body: 'To democratise access to technology intelligence for Indian professionals. Whether you\'re a developer tracking GitHub trends, an investor watching crypto markets, a founder following startup funding rounds, or a job seeker looking for IT opportunities — LatestWorld has you covered in one place.' },
        { title: 'How It Works', body: 'Our automated system runs data collection scripts every few hours using GitHub Actions cron jobs. These scripts call APIs from CoinGecko, GNews, GitHub, Product Hunt, and Adzuna, then store the latest data in our Supabase database. The website rebuilds automatically to include all new content, which is immediately indexed in our sitemap for Google crawling.' },
      ].map(s => (
        <div key={s.title} style={{ marginBottom: '1.75rem' }}>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.6rem', color: 'var(--text)' }}>{s.title}</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.9, fontFamily: 'Merriweather', fontSize: '14px' }}>{s.body}</p>
        </div>
      ))}

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text)' }}>Data Sources</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '0.875rem' }}>
          {[
            { icon: '💹', name: 'CoinGecko', desc: 'Cryptocurrency prices, market cap and 24h/7d changes. Top 200 coins updated every 6 hours.', link: 'https://coingecko.com', color: '#f59e0b' },
            { icon: '📰', name: 'GNews API', desc: 'Global technology news and Indian startup funding news. Updated every 6 hours.', link: 'https://gnews.io', color: '#e63946' },
            { icon: '🤖', name: 'Product Hunt', desc: 'Newly launched AI tools ranked by community upvotes. Updated daily.', link: 'https://producthunt.com', color: '#7c3aed' },
            { icon: '💼', name: 'Adzuna', desc: 'Technology and engineering job listings across India. Updated every 12 hours.', link: 'https://adzuna.com', color: '#2563eb' },
            { icon: '⭐', name: 'GitHub API', desc: 'Trending open-source repositories across 8 programming languages. Updated daily.', link: 'https://github.com', color: '#16a34a' },
          ].map(s => (
            <a key={s.name} href={s.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: '1.25rem', borderLeft: `4px solid ${s.color}` }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '14px', marginBottom: '0.35rem', color: 'var(--text)' }}>{s.name}</div>
                <div style={{ color: 'var(--muted)', fontSize: '12px', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>Contact Us</h2>
        <p style={{ color: 'var(--muted)', fontFamily: 'Merriweather', fontSize: '14px', lineHeight: 1.8 }}>
          For inquiries, advertising, or partnership opportunities, email us at{' '}
          <a href="mailto:admin@latestworld.in" style={{ color: '#e63946', fontWeight: 700 }}>admin@latestworld.in</a>
          {' '}or visit our <a href="/contact" style={{ color: '#e63946', fontWeight: 700 }}>Contact page</a>.
        </p>
      </div>
    </div>
  )
}
