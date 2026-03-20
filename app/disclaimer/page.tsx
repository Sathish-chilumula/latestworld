import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Disclaimer — LatestWorld', description: 'Disclaimer for LatestWorld.in regarding financial data, news accuracy, and automated content.' }

export default function DisclaimerPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 1.25rem' }}>
      <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2rem', marginBottom: '0.4rem' }}>Disclaimer</h1>
      <p style={{ color: 'var(--muted)', fontFamily: 'Poppins', fontSize: '13px', marginBottom: '2rem' }}>Last updated: March 2025</p>
      {[
        { h: 'Automated Content', p: 'All content on LatestWorld.in is automatically fetched from third-party APIs. We do not manually write, verify, or edit any of this content. Accuracy depends on the reliability of our data sources.' },
        { h: 'Financial Data Disclaimer', p: 'Cryptocurrency prices, market data, and any financial information displayed on this site are for informational purposes only. This is NOT financial advice. Cryptocurrency investments are highly speculative and volatile. Past performance is not indicative of future results. Always conduct your own research and consult a certified financial advisor before investing.' },
        { h: 'News Disclaimer', p: 'News articles displayed on LatestWorld.in are aggregated from third-party sources. We do not endorse, verify, or take responsibility for the accuracy of news content. Always verify news from original sources.' },
        { h: 'Job Listings Disclaimer', p: 'Job listings are fetched from Adzuna and may not always be current or accurate. LatestWorld.in is not responsible for the accuracy of job listings or the hiring practices of any employer listed on the site.' },
        { h: 'CoinGecko Data Attribution', p: 'Cryptocurrency data is powered by CoinGecko. LatestWorld.in is not affiliated with CoinGecko. Data is provided "as is" under CoinGecko\'s free API terms.' },
        { h: 'External Links', p: 'Links to external websites are provided for convenience. LatestWorld.in does not control, endorse, or take responsibility for the content of external sites.' },
      ].map(s => (
        <div key={s.h} style={{ marginBottom: '1.75rem' }}>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text)' }}>{s.h}</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.9, fontFamily: 'Merriweather', fontSize: '14px' }}>{s.p}</p>
        </div>
      ))}
    </div>
  )
}
