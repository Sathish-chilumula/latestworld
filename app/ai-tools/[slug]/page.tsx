import { getAITool, getAITools, getAllSlugs, type AITool } from '@/lib/supabase'
import { truncate } from '@/utils/helpers'
import { Breadcrumb, FAQ, AdSlot } from '@/components/UI'
import Link from 'next/link'

export async function generateStaticParams() {
  const { aitools } = await getAllSlugs()
  return aitools.map((item: any) => ({ slug: item.slug }))
}

export default async function AIToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [tool, all] = await Promise.all([
    getAITool(slug),
    getAITools(8)
  ])
  const related = all.filter(x => x.slug !== slug).slice(0, 4)

  if (!tool) return <div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'Poppins', color: 'var(--muted)' }}>Tool not found</div>

  const faqItems = [
    { q: `What does ${tool.name} do?`, a: tool.description || tool.tagline || `${tool.name} is an AI tool that helps users with various tasks.` },
    { q: `Is ${tool.name} free to use?`, a: tool.pricing === 'Free' ? `Yes, ${tool.name} offers a free plan.` : `${tool.name} offers ${tool.pricing || 'various pricing options'}. Visit their website for details.` },
    { q: `How can I start using ${tool.name}?`, a: `Visit ${tool.website || 'the official website'} to sign up and start using ${tool.name}.` },
    { q: `What category does ${tool.name} belong to?`, a: `${tool.name} is categorized as a ${tool.category || 'AI'} tool.` },
  ]

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.25rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'SoftwareApplication',
        name: tool.name, description: tool.description || tool.tagline,
        url: tool.website, applicationCategory: tool.category || 'AIApplication',
        image: tool.image, offers: { '@type': 'Offer', price: tool.pricing === 'Free' ? '0' : undefined, priceCurrency: 'USD' }
      })}} />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'AI Tools', href: '/ai-tools' }, { label: tool.name }]} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {tool.image
          ? <img src={tool.image} alt={tool.name} width={80} height={80} style={{ borderRadius: 18, objectFit: 'cover', boxShadow: '0 4px 20px rgba(124,58,237,0.2)' }} />
          : <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg,#7c3aed,#6d28d9)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>🤖</div>
        }
        <div>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: 'clamp(1.5rem,4vw,2rem)', margin: '0 0 0.3rem 0', color: 'var(--text)' }}>{tool.name}</h1>
          <p style={{ color: 'var(--muted)', fontFamily: 'Poppins', fontSize: '15px', margin: 0 }}>{tool.tagline}</p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-aitools">{tool.category || 'AI'}</span>
            {tool.pricing && <span style={{ background: '#dcfce7', color: '#16a34a', padding: '3px 10px', borderRadius: 999, fontSize: '11px', fontWeight: 700, fontFamily: 'Poppins' }}>{tool.pricing}</span>}
            {tool.votes > 0 && <span style={{ color: '#7c3aed', fontWeight: 700, fontSize: '13px', fontFamily: 'Poppins' }}>▲ {tool.votes} upvotes</span>}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>About {tool.name}</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontFamily: 'Merriweather', fontSize: '14px' }}>{tool.description || tool.tagline}</p>
      </div>

      <AdSlot width={728} height={90} />

      {tool.website && (
        <a href={tool.website} target="_blank" rel="noopener noreferrer" className="btn-glow" style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)', boxShadow: '0 4px 20px rgba(124,58,237,0.35)', marginBottom: '2rem', display: 'inline-flex' }}>
          Visit {tool.name} →
        </a>
      )}

      <div style={{ marginBottom: '2rem' }}><FAQ items={faqItems} /></div>

      {related.length > 0 && (
        <div>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>Similar AI Tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '0.75rem' }}>
            {related.map(t => (
              <Link key={t.slug} href={`/ai-tools/${t.slug}`} style={{ textDecoration: 'none' }}>
                <div className="card card-aitools" style={{ padding: '1rem', display: 'flex', gap: 10, alignItems: 'center' }}>
                  {t.image ? <img src={t.image} alt={t.name} width={36} height={36} style={{ borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} /> : <div style={{ width: 36, height: 36, background: '#ede9fe', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🤖</div>}
                  <div>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>{t.name}</div>
                    <div style={{ color: '#7c3aed', fontSize: '11px', fontWeight: 700, fontFamily: 'Poppins' }}>▲ {t.votes}</div>
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
