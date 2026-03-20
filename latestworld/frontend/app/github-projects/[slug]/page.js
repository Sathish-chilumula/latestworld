'use client'
import { useEffect, useState } from 'react'
import { getGitHubProjectBySlug } from '../../../lib/supabase'
import { useParams } from 'next/navigation'

export default function RepoPage() {
  const params = useParams()
  const [repo, setRepo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params?.slug) {
      getGitHubProjectBySlug(params.slug).then(setRepo).finally(() => setLoading(false))
    }
  }, [params])

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading...</div>
  if (!repo) return <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Project not found</div>

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": repo.repo_name,
        "description": repo.description,
        "url": repo.repo_url,
        "applicationCategory": "DeveloperApplication"
      })}} />

      <a href="/github-projects" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>← Back to GitHub Projects</a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
        {repo.avatar_url && <img src={repo.avatar_url} alt={repo.owner} width={56} height={56} style={{ borderRadius: '50%' }} />}
        <div>
          <div style={{ color: '#64748b', fontSize: '0.875rem' }}>{repo.owner}</div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>
            {repo.repo_name?.split('/')[1]}
          </h1>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>⭐ {repo.stars?.toLocaleString()}</div>
          <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Stars</div>
        </div>
        <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#38bdf8' }}>🍴 {repo.forks?.toLocaleString()}</div>
          <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Forks</div>
        </div>
        <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#a78bfa' }}>{repo.language || 'N/A'}</div>
          <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Language</div>
        </div>
      </div>

      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ marginTop: 0 }}>About this project</h2>
        <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>{repo.description}</p>
        {repo.topics?.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            {repo.topics.map(t => <span key={t} className="badge badge-blue">{t}</span>)}
          </div>
        )}
      </div>

      <a href={repo.repo_url} target="_blank" rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#38bdf8', color: '#0a0a0f', padding: '0.75rem 1.5rem', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>
        View on GitHub →
      </a>
    </div>
  )
}
