import { getGithubProject, getGithubProjects, getAllSlugs, type GithubProject } from '@/lib/supabase'
import { truncate } from '@/utils/helpers'
import { Breadcrumb, FAQ, AdSlot } from '@/components/UI'
import Link from 'next/link'

export async function generateStaticParams() {
  const { github } = await getAllSlugs()
  return github.map((item) => ({ slug: item.slug }))
}

export default async function GithubDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [repo, all] = await Promise.all([
    getGithubProject(slug),
    getGithubProjects(8)
  ])
  const related = all.filter(x => x.slug !== slug).slice(0, 4)

  if (!repo) return <div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'Poppins', color: 'var(--muted)' }}>Project not found</div>

  const faqItems = [
    { q: `What is ${repo.repo_name?.split('/')[1]}?`, a: repo.description || `${repo.repo_name} is an open-source project on GitHub with ${repo.stars?.toLocaleString()} stars.` },
    { q: `What programming language is ${repo.repo_name?.split('/')[1]} written in?`, a: `This project is primarily written in ${repo.language || 'multiple languages'}.` },
    { q: `How popular is ${repo.repo_name?.split('/')[1]} on GitHub?`, a: `${repo.repo_name} has ${repo.stars?.toLocaleString()} stars and ${repo.forks?.toLocaleString()} forks on GitHub.` },
    { q: `How can I contribute to this project?`, a: `Visit the GitHub repository at ${repo.repo_url} to find contribution guidelines, issues, and pull request instructions.` },
  ]

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.25rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'SoftwareApplication',
        name: repo.repo_name?.split('/')[1], description: repo.description,
        url: repo.repo_url, applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
      })}} />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'GitHub Projects', href: '/github' }, { label: repo.repo_name?.split('/')[1] || '' }]} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {repo.avatar_url && <img src={repo.avatar_url} alt={repo.owner} width={64} height={64} style={{ borderRadius: '50%', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }} />}
        <div>
          <div style={{ color: 'var(--muted)', fontFamily: 'Poppins', fontSize: '13px', marginBottom: 4 }}>{repo.owner} /</div>
          <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: 'clamp(1.4rem,3.5vw,2rem)', margin: 0, color: 'var(--text)' }}>{repo.repo_name?.split('/')[1]}</h1>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[{ l: 'Stars', v: `⭐ ${repo.stars?.toLocaleString()}`, c: '#f59e0b' }, { l: 'Forks', v: `🍴 ${repo.forks?.toLocaleString()}`, c: '#2563eb' }, { l: 'Language', v: repo.language || 'N/A', c: '#16a34a' }].map(s => (
          <div key={s.l} className="card" style={{ padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.4rem', color: s.c }}>{s.v}</div>
            <div style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'Poppins', marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>About this Project</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontFamily: 'Merriweather', fontSize: '14px', marginBottom: '1rem' }}>{repo.description}</p>
        {repo.topics?.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {repo.topics.map(t => <span key={t} className="badge badge-github">{t}</span>)}
          </div>
        )}
      </div>

      <AdSlot width={728} height={90} />
      <a href={repo.repo_url} target="_blank" rel="noopener noreferrer" className="btn-glow" style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)', boxShadow: '0 4px 20px rgba(22,163,74,0.35)', marginBottom: '2rem', display: 'inline-flex' }}>View on GitHub →</a>
      <div style={{ marginBottom: '2rem' }}><FAQ items={faqItems} /></div>

      {related.length > 0 && (
        <div>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>Related Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '0.75rem' }}>
            {related.map(r => (
              <Link key={r.slug} href={`/github/${r.slug}`} style={{ textDecoration: 'none' }}>
                <div className="card card-github" style={{ padding: '1rem' }}>
                  <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '13px', marginBottom: '0.3rem', color: 'var(--text)' }}>{r.repo_name?.split('/')[1]}</div>
                  <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: '12px', fontFamily: 'Poppins' }}>⭐ {r.stars?.toLocaleString()}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
