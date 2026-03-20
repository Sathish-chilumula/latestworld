'use client'
import { useEffect, useState } from 'react'
import { getTechJobs } from '../../lib/supabase'

export default function TechJobsPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getTechJobs(60).then(setJobs).finally(() => setLoading(false))
  }, [])

  const filtered = jobs.filter(j =>
    j.title?.toLowerCase().includes(search.toLowerCase()) ||
    j.company?.toLowerCase().includes(search.toLowerCase()) ||
    j.location?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, marginBottom: '0.5rem' }}>💼 Tech Jobs in India</h1>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Latest IT & engineering jobs — updated twice daily</p>

      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search jobs, companies, locations..."
        style={{
          width: '100%', maxWidth: 500, padding: '0.6rem 1rem',
          background: '#111118', border: '1px solid #1e1e2e', borderRadius: 8,
          color: '#e2e8f0', fontSize: '0.9rem', marginBottom: '1.5rem', outline: 'none'
        }}
      />

      {loading ? <div style={{ color: '#64748b' }}>Loading...</div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(job => (
            <a key={job.slug} href={`/tech-jobs/${job.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '1rem', marginBottom: '0.25rem' }}>{job.title}</div>
                  <div style={{ color: '#38bdf8', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{job.company}</div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
                    <span>📍 {job.location}</span>
                    <span>🕐 {job.job_type?.replace('_', ' ')}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {job.salary_min && (
                    <div style={{ color: '#22c55e', fontWeight: 600, fontSize: '0.9rem' }}>
                      ₹{Number(job.salary_min / 100000).toFixed(0)}L – {Number(job.salary_max / 100000).toFixed(0)}L/yr
                    </div>
                  )}
                  <span style={{ background: '#1e1e2e', color: '#64748b', padding: '0.25rem 0.75rem', borderRadius: 999, fontSize: '0.75rem', display: 'inline-block', marginTop: '0.25rem' }}>
                    Apply →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
