import { getCryptoCoin, getCryptoCoins, getAllSlugs, type CryptoCoin } from '@/lib/supabase'
import { formatPrice, formatLargeNum } from '@/utils/helpers'
import { Breadcrumb, FAQ, AdSlot } from '@/components/UI'
import Link from 'next/link'

export async function generateStaticParams() {
  try {
    const { crypto } = await getAllSlugs()
    return (crypto || []).map((item: any) => ({ slug: item.slug }))
  } catch (error) {
    console.warn('[Crypto generateStaticParams] Failed to fetch slugs for static generation:', error)
    return []
  }
}

export default async function CoinPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) console.warn('[Crypto] Missing NEXT_PUBLIC_SUPABASE_URL')
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) console.warn('[Crypto] Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')

  let coin: CryptoCoin | null = null
  let related: CryptoCoin[] = []

  try {
    const [fetchedCoin, allCoins] = await Promise.all([
      getCryptoCoin(slug),
      getCryptoCoins(10)
    ])
    coin = fetchedCoin
    related = (allCoins || []).filter(x => x.slug !== slug).slice(0, 4)
  } catch (error) {
    console.error(`[Crypto] Error fetching data for slug "${slug}":`, error)
  }

  if (!coin) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'Poppins', color: 'var(--muted)' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Coin not found</h1>
        <p>This coin may not exist or there was an error fetching the data.</p>
        <Link href="/" style={{ color: '#7c3aed', textDecoration: 'underline', marginTop: '1rem', display: 'inline-block' }}>Back to Home</Link>
      </div>
    )
  }

  const up = (coin.change_24h || 0) >= 0
  const faqItems = [
    { q: `What is ${coin.name} (${coin.symbol})?`, a: `${coin.name} is a cryptocurrency ranked #${coin.market_cap_rank} by market capitalisation. It trades under the symbol ${coin.symbol}.` },
    { q: `What is ${coin.name} price today?`, a: `The current ${coin.name} price is $${formatPrice(coin.price)} USD. The price has changed ${coin.change_24h?.toFixed(2)}% in the last 24 hours.` },
    { q: `What is ${coin.name}'s market cap?`, a: `${coin.name}'s current market capitalisation is ${formatLargeNum(coin.market_cap)}, making it the #${coin.market_cap_rank} largest cryptocurrency.` },
    { q: `Is ${coin.name} a good investment?`, a: `This is not financial advice. Cryptocurrency investments carry high risk. Always do your own research before investing in ${coin.name} or any other digital asset.` },
    { q: `Where can I buy ${coin.name}?`, a: `${coin.name} (${coin.symbol}) is available on major cryptocurrency exchanges. Always use reputable exchanges and store assets securely.` },
  ]

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem 1.25rem' }}>
      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FinancialProduct',
        name: `${coin.name} (${coin.symbol}) Price Today`,
        description: `${coin.name} current price $${formatPrice(coin.price)}, market cap ${formatLargeNum(coin.market_cap)}, 24h change ${coin.change_24h?.toFixed(2)}%`,
        url: `https://latestworld.in/crypto/${coin.slug}`,
        image: coin.image
      })}} />
      {/* Breadcrumb schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://latestworld.in' },
          { '@type': 'ListItem', position: 2, name: 'Crypto', item: 'https://latestworld.in/crypto' },
          { '@type': 'ListItem', position: 3, name: coin.name, item: `https://latestworld.in/crypto/${coin.slug}` }
        ]
      })}} />

      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Crypto', href: '/crypto' }, { label: coin.name }]} />

      {/* Hero */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {coin.image && <img src={coin.image} alt={coin.name} width={72} height={72} style={{ borderRadius: '50%', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }} />}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: 'clamp(1.5rem,4vw,2.2rem)', margin: 0 }}>{coin.name}</h1>
            <span style={{ background: 'var(--bg-soft)', color: 'var(--muted)', padding: '4px 12px', borderRadius: 8, fontFamily: 'Poppins', fontWeight: 700, fontSize: '14px' }}>{coin.symbol}</span>
            <span style={{ background: '#f1f5f9', color: 'var(--muted)', padding: '4px 10px', borderRadius: 8, fontFamily: 'Poppins', fontSize: '12px', fontWeight: 600 }}>Rank #{coin.market_cap_rank}</span>
          </div>
        </div>
      </div>

      {/* Price card */}
      <div style={{ background: up ? 'linear-gradient(135deg,#dcfce7,#f0fdf4)' : 'linear-gradient(135deg,#fee2e2,#fff5f5)', border: `2px solid ${up ? '#16a34a30' : '#dc262630'}`, borderRadius: 16, padding: '1.5rem 2rem', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
        <div>
          <div style={{ color: 'var(--muted)', fontFamily: 'Poppins', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Current Price</div>
          <div style={{ fontFamily: '"JetBrains Mono"', fontWeight: 700, fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: 'var(--text)' }}>${formatPrice(coin.price)}</div>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { l: '24h Change', v: `${up ? '▲' : '▼'} ${Math.abs(coin.change_24h || 0).toFixed(2)}%`, c: up ? '#16a34a' : '#dc2626' },
            { l: '7d Change', v: `${(coin.change_7d || 0) >= 0 ? '▲' : '▼'} ${Math.abs(coin.change_7d || 0).toFixed(2)}%`, c: (coin.change_7d || 0) >= 0 ? '#16a34a' : '#dc2626' },
            { l: 'Market Cap', v: formatLargeNum(coin.market_cap), c: undefined },
            { l: '24h Volume', v: formatLargeNum(coin.volume_24h), c: undefined },
          ].map(s => (
            <div key={s.l}>
              <div style={{ color: 'var(--muted)', fontFamily: 'Poppins', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{s.l}</div>
              <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1rem', color: s.c || 'var(--text)' }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      <AdSlot width={728} height={90} />

      {/* About */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.75rem' }}>About {coin.name}</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontFamily: 'Merriweather', fontSize: '14px' }}>
          {coin.description || `${coin.name} (${coin.symbol}) is a cryptocurrency currently ranked #${coin.market_cap_rank} by market capitalisation. The current price is $${formatPrice(coin.price)} USD with a 24-hour change of ${coin.change_24h?.toFixed(2)}%. The total market cap stands at ${formatLargeNum(coin.market_cap)} with a 24-hour trading volume of ${formatLargeNum(coin.volume_24h)}.`}
        </p>
        <p style={{ color: 'var(--light)', fontSize: '12px', fontFamily: 'Poppins', marginTop: '1rem' }}>
          ⚠️ This is not financial advice. Crypto investments are highly volatile. Data by{' '}
          <a href="https://www.coingecko.com?utm_source=latestworld&utm_medium=referral" target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a', fontWeight: 700 }}>CoinGecko</a>
        </p>
      </div>

      {/* FAQ */}
      <div style={{ marginBottom: '2rem' }}><FAQ items={faqItems} /></div>

      <AdSlot width={300} height={250} />

      {/* Related */}
      {related.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>Related Cryptocurrencies</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '0.75rem' }}>
            {related.map(c => (
              <Link key={c.slug} href={`/crypto/${c.slug}`} style={{ textDecoration: 'none' }}>
                <div className="card card-crypto" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                  {c.image && <img src={c.image} alt={c.name} width={32} height={32} style={{ borderRadius: '50%' }} />}
                  <div>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '13px' }}>{c.name}</div>
                    <div style={{ fontFamily: '"JetBrains Mono"', fontSize: '12px', color: (c.change_24h || 0) >= 0 ? '#16a34a' : '#dc2626' }}>${formatPrice(c.price)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
