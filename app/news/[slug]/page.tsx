import { getNewsItem, getTechNews, getAllSlugs, type TechNews } from '@/lib/supabase'
import { fmtDate, truncate, timeAgo } from '@/utils/helpers'
import { Breadcrumb, FAQ, AdSlot } from '@/components/UI'
import Link from 'next/link'

export async function generateStaticParams() {
  try {
    const { news } = await getAllSlugs()
    return (news || []).map((item: any) => ({ slug: item.slug }))
  } catch (error) {
    console.warn('[News generateStaticParams] Failed to fetch slugs for static generation:', error)
    return []
  }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) console.warn('[News] Missing NEXT_PUBLIC_SUPABASE_URL')
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) console.warn('[News] Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')

  let article: TechNews | null = null
  let related: TechNews[] = []

  try {
    const [fetchedArticle, allNews] = await Promise.all([
      getNewsItem(slug),
      getTechNews(8)
    ])
    article = fetchedArticle
    related = (allNews || []).filter(x => x.slug !== slug).slice(0, 3)
  } catch (error) {
    console.error(`[News] Error fetching data for slug "${slug}":`, error)
  }

  if (!article) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'Poppins', color: 'var(--muted)' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Article not found</h1>
        <p>This article may not exist or there was an error fetching the data.</p>
        <Link href="/" style={{ color: '#7c3aed', textDecoration: 'underline', marginTop: '1rem', display: 'inline-block' }}>Back to Home</Link>
      </div>
    )
  }

  const faqItems = [
    { q: `What is this news about?`, a: article.summary || article.title },
    { q: `When was this published?`, a: `This article was published on ${fmtDate(article.published_at)} by ${article.source}.` },
    { q: `Where can I read the full story?`, a: `You can read the complete article at ${article.source}. Click the "Read Full Story" button below.` },
  ]

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.25rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'NewsArticle',
        headline: article.title, description: article.summary, image: article.image,
        datePublished: article.published_at, dateModified: article.published_at,
        publisher: { '@type': 'Organization', name: article.source },
        url: `https://latestworld.in/news/${article.slug}`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://latestworld.in/news/${article.slug}` }
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://latestworld.in' },
          { '@type': 'ListItem', position: 2, name: 'Tech News', item: 'https://latestworld.in/news' },
          { '@type': 'ListItem', position: 3, name: article.title }
        ]
      })}} />

      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Tech News', href: '/news' }, { label: truncate(article.title, 40) }]} />

      {article.image && (
        <div className="img-zoom" style={{ height: 360, borderRadius: 16, overflow: 'hidden', marginBottom: '1.5rem' }}>
          <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <span className="badge badge-news">{article.source}</span>
        <span style={{ color: 'var(--muted)', fontSize: '13px', fontFamily: 'Poppins' }}>{fmtDate(article.published_at)}</span>
        <span style={{ color: 'var(--light)', fontSize: '12px', fontFamily: 'Poppins' }}>{timeAgo(article.published_at)}</span>
      </div>

      <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: 'clamp(1.4rem,3.5vw,2rem)', lineHeight: 1.3, marginBottom: '1.5rem', color: 'var(--text)' }}>{article.title}</h1>

      <blockquote style={{ borderLeft: '5px solid #e63946', paddingLeft: '1.25rem', marginBottom: '2rem', background: '#fff5f5', borderRadius: '0 12px 12px 0', padding: '1.25rem 1.25rem 1.25rem 1.5rem' }}>
        <p style={{ fontFamily: 'Merriweather', fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text)', margin: 0 }}>{article.summary}</p>
      </blockquote>

      <AdSlot width={728} height={90} />

      {article.content && (
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <p style={{ fontFamily: 'Merriweather', fontSize: '14px', lineHeight: 1.9, color: 'var(--muted)' }}>{article.content}</p>
        </div>
      )}

      <div style={{ background: 'var(--bg-soft)', borderRadius: 12, padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <span style={{ color: 'var(--muted)', fontSize: '14px', fontFamily: 'Poppins' }}>Full story at <strong>{article.source}</strong></span>
        <a href={article.source_url} target="_blank" rel="noopener noreferrer" className="btn-glow" style={{ background: 'linear-gradient(135deg,#e63946,#c1121f)', boxShadow: '0 4px 20px rgba(230,57,70,0.35)' }}>Read Full Story →</a>
      </div>

      <div style={{ marginBottom: '2rem' }}><FAQ items={faqItems} /></div>

      {related.length > 0 && (
        <div>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>Related News</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '0.75rem' }}>
            {related.map(r => (
              <Link key={r.slug} href={`/news/${r.slug}`} style={{ textDecoration: 'none' }}>
                <div className="card card-news" style={{ padding: '0.875rem' }}>
                  <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '13px', lineHeight: 1.4, marginBottom: '0.35rem', color: 'var(--text)' }}>{truncate(r.title, 70)}</div>
                  <span className="badge badge-news">{r.source}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
