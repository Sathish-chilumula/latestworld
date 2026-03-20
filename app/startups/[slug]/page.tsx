import { getStartupItem, getStartupNews, getAllSlugs, type StartupNews } from '@/lib/supabase'
import { fmtDate, truncate, timeAgo } from '@/utils/helpers'
import { Breadcrumb, FAQ, AdSlot } from '@/components/UI'
import Link from 'next/link'

export async function generateStaticParams() {
  const { startups } = await getAllSlugs()
  return startups.map((item) => ({ slug: item.slug }))
}

export default async function StartupDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [article, all] = await Promise.all([
    getStartupItem(slug),
    getStartupNews(8)
  ])
  const related = all.filter(x => x.slug !== slug).slice(0, 3)

  if (!article) return <div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'Poppins', color: 'var(--muted)' }}>Article not found</div>

  const faqItems = [
    { q: `What is this startup news about?`, a: article.summary || article.title },
    { q: `How much funding was raised?`, a: article.funding_amount ? `${article.company_name || 'The company'} raised ${article.funding_amount} in this funding round.` : 'Funding details are mentioned in the full article.' },
    { q: `When was this published?`, a: `Published on ${fmtDate(article.published_at)} by ${article.source}.` },
    { q: `Where can I read the full story?`, a: `Click the "Read Full Story" button to read the complete article at ${article.source}.` },
  ]

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.25rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'NewsArticle',
        headline: article.title, description: article.summary, image: article.image,
        datePublished: article.published_at, publisher: { '@type': 'Organization', name: article.source },
        url: `https://latestworld.in/startups/${article.slug}`
      })}} />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Startups', href: '/startups' }, { label: truncate(article.title, 40) }]} />

      {article.image && (
        <div className="img-zoom" style={{ height: 340, borderRadius: 16, overflow: 'hidden', marginBottom: '1.5rem' }}>
          <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <span className="badge badge-startups">{article.source}</span>
        {article.funding_amount && <span style={{ background: '#ffedd5', color: '#ea580c', padding: '3px 12px', borderRadius: 999, fontFamily: 'Poppins', fontWeight: 700, fontSize: '13px' }}>💰 {article.funding_amount}</span>}
        <span style={{ color: 'var(--muted)', fontSize: '13px', fontFamily: 'Poppins' }}>{fmtDate(article.published_at)}</span>
      </div>

      <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: 'clamp(1.4rem,3.5vw,2rem)', lineHeight: 1.3, marginBottom: '1.5rem', color: 'var(--text)' }}>{article.title}</h1>

      <blockquote style={{ borderLeft: '5px solid #ea580c', background: '#fff7ed', borderRadius: '0 12px 12px 0', padding: '1.25rem 1.25rem 1.25rem 1.5rem', marginBottom: '2rem' }}>
        <p style={{ fontFamily: 'Merriweather', fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text)', margin: 0 }}>{article.summary}</p>
      </blockquote>

      <AdSlot width={728} height={90} />

      <div style={{ background: 'var(--bg-soft)', borderRadius: 12, padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <span style={{ color: 'var(--muted)', fontSize: '14px', fontFamily: 'Poppins' }}>Full story at <strong>{article.source}</strong></span>
        <a href={article.source_url} target="_blank" rel="noopener noreferrer" className="btn-glow" style={{ background: 'linear-gradient(135deg,#ea580c,#c2410c)', boxShadow: '0 4px 20px rgba(234,88,12,0.35)' }}>Read Full Story →</a>
      </div>

      <div style={{ marginBottom: '2rem' }}><FAQ items={faqItems} /></div>

      {related.length > 0 && (
        <div>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>More Startup News</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {related.map(r => (
              <Link key={r.slug} href={`/startups/${r.slug}`} style={{ textDecoration: 'none' }}>
                <div className="card card-startups accent-startups" style={{ padding: '1rem' }}>
                  <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '13px', lineHeight: 1.4, marginBottom: '0.35rem', color: 'var(--text)' }}>{truncate(r.title, 80)}</div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {r.funding_amount && <span style={{ background: '#ffedd5', color: '#ea580c', padding: '2px 8px', borderRadius: 999, fontSize: '11px', fontWeight: 700, fontFamily: 'Poppins' }}>💰 {r.funding_amount}</span>}
                    <span style={{ color: 'var(--light)', fontSize: '11px', fontFamily: 'Poppins' }}>{timeAgo(r.published_at)}</span>
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
