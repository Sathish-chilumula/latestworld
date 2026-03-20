'use client'
import { useEffect, useState } from 'react'
import { getGithubProjects, type GithubProject } from '@/lib/supabase'
import { truncate } from '@/utils/helpers'
import { AdSlot, SkeletonCard } from '@/components/UI'
import Link from 'next/link'

export default function GithubPage() {
  const [repos, setRepos] = useState<GithubProject[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => { getGithubProjects(80).then(setRepos).finally(() => setLoading(false)) }, [])

  const langs = ['All', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean))).slice(0, 10)]
  const filtered = filter === 'All' ? repos : repos.filter(r => r.language === filter)

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.25rem' }}>
      <div style={{ background: 'linear-gradient(135deg,#dcfce7,#f0fdf4)', border: '2px solid #16a34a20', borderRadius: 16, padding: '2rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: 'clamp(1.5rem,4vw,2rem)', marginBottom: '0.4rem' }}>⭐ Trending GitHub Projects</h1>
        <p style={{ color: 'var(--muted)', fontFamily: 'Poppins', fontSize: '14px', margin: 0 }}>Hottest open-source repos — updated daily via GitHub API</p>
      </div>
      <AdSlot width={728} height={90} />
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1.25rem 0' }}>
        {langs.map(l => (
          <button key={l} onClick={() => setFilter(l)} style={{ padding: '7px 14px', borderRadius: 999, border: '1.5px solid', borderColor: filter === l ? '#16a34a' : 'var(--border)', background: filter === l ? '#dcfce7' : 'var(--surface)', color: filter === l ? '#16a34a' : 'var(--muted)', fontFamily: 'Poppins', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>{l}</button>
        ))}
      </div>
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.25rem' }}>
          {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.25rem' }}>
          {filtered.map(repo => (
            <Link key={repo.slug} href={`/github/${repo.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card card-github accent-github" style={{ padding: '1.25rem', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem' }}>
                  {repo.avatar_url && <img src={repo.avatar_url} alt={repo.owner} width={22} height={22} style={{ borderRadius: '50%' }} />}
                  <span style={{ color: 'var(--muted)', fontSize: '12px', fontFamily: 'Poppins' }}>{repo.owner}</span>
                  {repo.language && <span className="badge badge-github" style={{ marginLeft: 'auto' }}>{repo.language}</span>}
                </div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '15px', marginBottom: '0.4rem', color: 'var(--text)' }}>{repo.repo_name?.split('/')[1]}</div>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.6, marginBottom: '0.75rem' }}>{truncate(repo.description, 90)}</p>
                {repo.topics?.slice(0, 3).map(t => <span key={t} style={{ display: 'inline-block', background: '#dcfce7', color: '#14532d', borderRadius: 4, padding: '1px 7px', fontSize: '11px', fontWeight: 600, marginRight: 4, marginBottom: 4 }}>{t}</span>)}
                <div style={{ display: 'flex', gap: '1rem', fontSize: '13px', fontFamily: 'Poppins', fontWeight: 700, marginTop: '0.5rem' }}>
                  <span style={{ color: '#f59e0b' }}>⭐ {repo.stars?.toLocaleString()}</span>
                  <span style={{ color: 'var(--muted)' }}>🍴 {repo.forks?.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
