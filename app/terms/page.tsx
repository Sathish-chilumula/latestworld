import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Terms of Service — LatestWorld', description: 'Terms of Service for LatestWorld.in' }

export default function TermsPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 1.25rem' }}>
      <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2rem', marginBottom: '0.4rem' }}>Terms of Service</h1>
      <p style={{ color: 'var(--muted)', fontFamily: 'Poppins', fontSize: '13px', marginBottom: '2rem' }}>Last updated: March 2025</p>
      {[
        { h: 'Acceptance of Terms', p: 'By accessing and using LatestWorld.in, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use this website.' },
        { h: 'Use of Content', p: 'All content on LatestWorld.in is automatically aggregated from third-party APIs and provided for informational purposes only. You may not reproduce, distribute, or commercially exploit the content without permission.' },
        { h: 'No Financial Advice', p: 'Cryptocurrency data and startup funding information on this site is for informational purposes only and does not constitute financial, investment, or trading advice. Always consult a qualified financial advisor before making investment decisions.' },
        { h: 'No Warranty', p: 'LatestWorld.in is provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or timeliness of any data displayed on the site.' },
        { h: 'Third-Party Links', p: 'Our site links to external websites including news sources, job boards, GitHub repositories, and product pages. We are not responsible for the content or practices of those third-party sites.' },
        { h: 'Limitation of Liability', p: 'LatestWorld.in shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this site or any data displayed herein.' },
        { h: 'Advertising', p: 'LatestWorld.in displays advertisements via Google AdSense. These ads are controlled by Google and are subject to Google\'s advertising policies.' },
        { h: 'Changes', p: 'We reserve the right to modify these Terms of Service at any time. Continued use of the site after modifications constitutes acceptance.' },
        { h: 'Contact', p: 'Questions about these Terms? Email admin@latestworld.in.' },
      ].map(s => (
        <div key={s.h} style={{ marginBottom: '1.75rem' }}>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text)' }}>{s.h}</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.9, fontFamily: 'Merriweather', fontSize: '14px' }}>{s.p}</p>
        </div>
      ))}
    </div>
  )
}
