import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#070b14', color: '#94a3b8', marginTop: '5rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3rem 1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
            <div style={{ background: 'linear-gradient(135deg,#e63946,#c1121f)', color: 'white', width: 34, height: 34, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins', fontWeight: 900 }}>L</div>
            <span style={{ fontFamily: 'Poppins', fontWeight: 800, color: 'white', fontSize: '1rem' }}>LatestWorld</span>
          </div>
          <p style={{ fontSize: '13px', lineHeight: 1.7 }}>India's automated tech intelligence hub. Crypto, News, AI Tools, GitHub, Jobs and Startups — all updated automatically.</p>
        </div>

        <div>
          <div style={{ fontFamily: 'Poppins', fontWeight: 700, color: 'white', marginBottom: '0.75rem', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Sections</div>
          {[['💹 Crypto', '/crypto'], ['📰 Tech News', '/news'], ['🤖 AI Tools', '/ai-tools'], ['⭐ GitHub', '/github'], ['💼 Jobs', '/jobs'], ['🚀 Startups', '/startups']].map(([l, h]) => (
            <Link key={h} href={h} style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', fontSize: '13px', marginBottom: '0.3rem', fontFamily: 'Poppins' }}>{l}</Link>
          ))}
        </div>

        <div>
          <div style={{ fontFamily: 'Poppins', fontWeight: 700, color: 'white', marginBottom: '0.75rem', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Company</div>
          {[['About Us', '/about'], ['Contact', '/contact'], ['Privacy Policy', '/privacy-policy'], ['Terms of Service', '/terms'], ['Disclaimer', '/disclaimer'], ['Sitemap', '/sitemap-page']].map(([l, h]) => (
            <Link key={h} href={h} style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', fontSize: '13px', marginBottom: '0.3rem', fontFamily: 'Poppins' }}>{l}</Link>
          ))}
        </div>

        <div>
          <div style={{ fontFamily: 'Poppins', fontWeight: 700, color: 'white', marginBottom: '0.75rem', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Data Sources</div>
          <div style={{ fontSize: '12px', lineHeight: 2 }}>
            <div>Crypto: <a href="https://www.coingecko.com?utm_source=latestworld&utm_medium=referral" target="_blank" rel="noopener noreferrer" style={{ color: '#f59e0b' }}>CoinGecko</a></div>
            <div>News: <a href="https://gnews.io" target="_blank" rel="noopener noreferrer" style={{ color: '#e63946' }}>GNews API</a></div>
            <div>AI Tools: <a href="https://producthunt.com" target="_blank" rel="noopener noreferrer" style={{ color: '#7c3aed' }}>Product Hunt</a></div>
            <div>Jobs: <a href="https://adzuna.com" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }}>Adzuna</a></div>
            <div>Projects: <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a' }}>GitHub API</a></div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #1e293b', padding: '1.25rem', textAlign: 'center', fontSize: '12px', fontFamily: 'Poppins', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <span>© {new Date().getFullYear()} LatestWorld.in — All data auto-updated</span>
        <Link href="/privacy-policy" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy</Link>
        <Link href="/terms" style={{ color: '#64748b', textDecoration: 'none' }}>Terms</Link>
        <Link href="/disclaimer" style={{ color: '#64748b', textDecoration: 'none' }}>Disclaimer</Link>
      </div>
    </footer>
  )
}
