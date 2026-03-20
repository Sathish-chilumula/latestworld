import './globals.css'

export const metadata = {
  metadataBase: new URL('https://latestworld.in'),
  title: {
    default: 'LatestWorld - Tech News, Crypto, AI Tools & GitHub Trending',
    template: '%s | LatestWorld'
  },
  description: 'Stay updated with the latest technology news, cryptocurrency prices, trending GitHub projects, AI tools, startup funding, and tech jobs in India.',
  keywords: ['tech news', 'crypto prices', 'AI tools', 'GitHub trending', 'startup news', 'tech jobs India'],
  authors: [{ name: 'LatestWorld' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://latestworld.in',
    siteName: 'LatestWorld',
    title: 'LatestWorld - Your Daily Tech Intelligence',
    description: 'Crypto prices, AI tools, GitHub trending, tech news, startup funding and jobs — all in one place.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LatestWorld',
    description: 'Your daily tech intelligence hub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://latestworld.in" />
        {/* Google AdSense - Add your publisher ID here after approval */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body>
        <Header />
        <main style={{ minHeight: '80vh' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

function Header() {
  return (
    <header style={{
      background: '#0d0d14',
      borderBottom: '1px solid #1e1e2e',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1rem', display: 'flex', alignItems: 'center', height: 60, gap: '2rem' }}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.4rem' }}>🌐</span>
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.2rem', color: '#38bdf8' }}>LatestWorld</span>
        </a>
        <nav style={{ display: 'flex', gap: '1.25rem', fontSize: '0.875rem' }}>
          <a href="/crypto" style={{ color: '#94a3b8', textDecoration: 'none' }}>💹 Crypto</a>
          <a href="/tech-news" style={{ color: '#94a3b8', textDecoration: 'none' }}>📰 News</a>
          <a href="/ai-tools" style={{ color: '#94a3b8', textDecoration: 'none' }}>🤖 AI Tools</a>
          <a href="/github-projects" style={{ color: '#94a3b8', textDecoration: 'none' }}>⭐ GitHub</a>
          <a href="/tech-jobs" style={{ color: '#94a3b8', textDecoration: 'none' }}>💼 Jobs</a>
          <a href="/startup-news" style={{ color: '#94a3b8', textDecoration: 'none' }}>🚀 Startups</a>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer style={{
      background: '#0d0d14',
      borderTop: '1px solid #1e1e2e',
      marginTop: '4rem',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#38bdf8', marginBottom: '0.5rem' }}>🌐 LatestWorld</div>
            <div style={{ color: '#64748b', fontSize: '0.875rem' }}>Your daily technology intelligence hub</div>
          </div>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem' }}>
            <div>
              <div style={{ color: '#94a3b8', fontWeight: 600, marginBottom: '0.5rem' }}>Sections</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <a href="/crypto" style={{ color: '#64748b', textDecoration: 'none' }}>Crypto</a>
                <a href="/tech-news" style={{ color: '#64748b', textDecoration: 'none' }}>Tech News</a>
                <a href="/ai-tools" style={{ color: '#64748b', textDecoration: 'none' }}>AI Tools</a>
                <a href="/github-projects" style={{ color: '#64748b', textDecoration: 'none' }}>GitHub</a>
              </div>
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontWeight: 600, marginBottom: '0.5rem' }}>More</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <a href="/tech-jobs" style={{ color: '#64748b', textDecoration: 'none' }}>Tech Jobs</a>
                <a href="/startup-news" style={{ color: '#64748b', textDecoration: 'none' }}>Startups</a>
                <a href="/about" style={{ color: '#64748b', textDecoration: 'none' }}>About</a>
                <a href="/privacy-policy" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy</a>
                <a href="/contact" style={{ color: '#64748b', textDecoration: 'none' }}>Contact</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #1e1e2e', paddingTop: '1rem', color: '#475569', fontSize: '0.8rem', textAlign: 'center' }}>
          © {new Date().getFullYear()} LatestWorld.in — Automated technology intelligence. Data updates every few hours.
        </div>
      </div>
    </footer>
  )
}
