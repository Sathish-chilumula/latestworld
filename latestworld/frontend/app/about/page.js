// About Page
// Save as: /app/about/page.js

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 1rem' }}>
      <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, marginBottom: '1rem' }}>About LatestWorld</h1>
      <div style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1.05rem' }}>
        <p>LatestWorld.in is an automated technology intelligence platform that aggregates and displays the latest information from the world of technology — all in one place.</p>
        <p>Our system automatically fetches and updates data from trusted sources including CoinGecko for cryptocurrency prices, GitHub for trending open source projects, GNews for technology and startup news, Product Hunt for newly launched AI tools, and Adzuna for technology job listings in India.</p>
        <p>Data is refreshed multiple times a day — so you always see fresh, relevant information without any manual curation needed.</p>
        <h2>Our Goal</h2>
        <p>To be your daily one-stop destination for everything happening in the world of technology — from crypto markets and AI breakthroughs to startup funding and open source projects.</p>
        <h2>Data Sources</h2>
        <ul style={{ color: '#64748b' }}>
          <li>Cryptocurrency data — CoinGecko API</li>
          <li>GitHub projects — GitHub REST API</li>
          <li>Tech & startup news — GNews API</li>
          <li>AI tools — Product Hunt API</li>
          <li>Tech jobs — Adzuna API</li>
        </ul>
      </div>
    </div>
  )
}
