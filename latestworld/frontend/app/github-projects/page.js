'use client'
import { useEffect, useState } from 'react'
import { getGitHubProjects } from '../../lib/supabase'

export default function GitHubPage() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    getGitHubProjects(60).then(setRepos).finally(() => setLoading(false))
  }, [])

  const languages = ['all', ...new Set(repos.map(r => r.language).filter(Boolean))]
  const filtered = filter === 'all' ? repos : repos.filter(r => r.language === filter)

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, marginBottom: '0.5rem' }}>⭐ Trending GitHub Projects</h1>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Hottest open source projects — updated daily</p>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {languages.slice(0, 10).map(lang => (
          <button key={lang} onClick={() => setFilter(lang)}
            style={{
              padding: '0.35rem 0.75rem', borderRadius: 999, border: '1px solid',
              borderColor: filter === lang ? '#38bdf8' : '#1e1e2e',
              background: filter === lang ? 'rgba(56,189,248,0.1)' : 'transparent',
              color: filter === lang ? '#38bdf8' : '#64748b', cursor: 'pointer', fontSize: '0.8rem'
            }}>
            {lang}
          </button>
        ))}
      </div>

      {loading ? <div style={{ color: '#64748b' }}>Loading...</div> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
          {filtered.map(repo => (
            <a key={repo.slug} href={`/github-projects/${repo.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: '1.25rem', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  {repo.avatar_url && <img src={repo.avatar_url} alt={repo.owner} width={24} height={24} style={{ borderRadius: '50%' }} />}
                  <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{repo.owner}</span>
                  {repo.language && <span className="badge badge-blue" style={{ marginLeft: 'auto' }}>{repo.language}</span>}
                </div>
                <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: '0.5rem' }}>{repo.repo_name?.split('/')[1]}</div>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0 0 0.75rem', lineHeight: 1.5 }}>
                  {repo.description?.substring(0, 100)}
                </p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                  <span style={{ color: '#f59e0b' }}>⭐ {repo.stars?.toLocaleString()}</span>
                  <span style={{ color: '#64748b' }}>🍴 {repo.forks?.toLocaleString()}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
