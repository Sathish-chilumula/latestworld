import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Privacy Policy — LatestWorld', description: 'Privacy Policy for LatestWorld.in — how we collect, use and protect your data.' }

export default function PrivacyPage() {
  const updated = 'March 2025'
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 1.25rem' }}>
      <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2rem', marginBottom: '0.4rem' }}>Privacy Policy</h1>
      <p style={{ color: 'var(--muted)', fontFamily: 'Poppins', fontSize: '13px', marginBottom: '2rem' }}>Last updated: {updated}</p>

      {[
        { h: 'Information We Collect', p: 'LatestWorld.in does not require user registration or login. We do not collect personally identifiable information. Anonymous analytics data (page views, traffic sources) may be collected to help us improve the site.' },
        { h: 'Google AdSense & Cookies', p: 'We use Google AdSense to display advertisements. Google AdSense uses cookies to show relevant ads based on your browsing history. You can opt out via Google\'s Ads Settings at adssettings.google.com. Third-party vendors, including Google, use cookies to serve ads based on prior site visits.' },
        { h: 'Third-Party Data', p: 'All content on LatestWorld.in is automatically fetched from third-party APIs including CoinGecko, GNews, GitHub, Product Hunt, and Adzuna. We display this data for informational purposes. Please refer to each provider\'s privacy policy for details about their data practices.' },
        { h: 'Analytics', p: 'We may use anonymous analytics services such as Google Analytics to understand how visitors use our site. This data is aggregated and does not identify individual users.' },
        { h: 'External Links', p: 'Our site contains links to external websites (news sources, job listings, GitHub repositories, AI tool websites, etc.). We are not responsible for the privacy practices or content of those external sites.' },
        { h: 'Data Security', p: 'We take reasonable precautions to protect site infrastructure. However, no method of transmission over the internet is 100% secure.' },
        { h: 'Changes to This Policy', p: 'We may update this Privacy Policy from time to time. Changes are effective when posted on this page. Continued use of LatestWorld.in after changes constitutes acceptance of the new policy.' },
        { h: 'Contact', p: 'If you have questions about this Privacy Policy, email us at admin@latestworld.in.' },
      ].map(s => (
        <div key={s.h} style={{ marginBottom: '1.75rem' }}>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text)' }}>{s.h}</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.9, fontFamily: 'Merriweather', fontSize: '14px' }}>{s.p}</p>
        </div>
      ))}
    </div>
  )
}
