export default function PrivacyPolicyPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 1rem' }}>
      <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, marginBottom: '0.5rem' }}>Privacy Policy</h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div style={{ color: '#94a3b8', lineHeight: 1.8 }}>
        <h2>1. Information We Collect</h2>
        <p>LatestWorld.in does not collect any personally identifiable information from visitors. We do not require registration or login. Our site is purely informational.</p>

        <h2>2. Cookies and Advertising</h2>
        <p>We use Google AdSense to display advertisements on our website. Google AdSense may use cookies to show personalized ads based on your browsing activity. You can opt out of personalized advertising by visiting Google's Ads Settings.</p>

        <h2>3. Third-Party Data Sources</h2>
        <p>All data displayed on LatestWorld.in is sourced from third-party APIs including CoinGecko, GitHub, GNews, Product Hunt, and Adzuna. Please refer to their respective privacy policies for information about how they handle data.</p>

        <h2>4. Analytics</h2>
        <p>We may use analytics services to understand how visitors use our site. This data is aggregated and anonymous.</p>

        <h2>5. External Links</h2>
        <p>Our website contains links to external websites. We are not responsible for the privacy practices of those sites.</p>

        <h2>6. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We encourage you to review this page periodically.</p>

        <h2>7. Contact</h2>
        <p>For any questions about this Privacy Policy, please contact us via our <a href="/contact" style={{ color: '#38bdf8' }}>Contact page</a>.</p>
      </div>
    </div>
  )
}
