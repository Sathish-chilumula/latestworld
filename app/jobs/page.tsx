'use client'
import { useEffect, useState } from 'react'
import { getJobs, getJob, type Job } from '@/lib/supabase'
import { formatSalary, truncate, timeAgo } from '@/utils/helpers'
import { Breadcrumb, FAQ, AdSlot, SkeletonCard } from '@/components/UI'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => { getJobs(100).then(setJobs).finally(() => setLoading(false)) }, [])

  const types = ['All', 'Full-time', 'Part-time', 'Contract', 'Remote']
  const filtered = jobs.filter(j => {
    const matchSearch = j.title?.toLowerCase().includes(search.toLowerCase()) || j.company?.toLowerCase().includes(search.toLowerCase()) || j.location?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || j.job_type?.toLowerCase().includes(filter.toLowerCase()) || j.location?.toLowerCase().includes(filter.toLowerCase())
    return matchSearch && matchFilter
  })

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.25rem' }}>
      <div style={{ background: 'linear-gradient(135deg,#dbeafe,#eff6ff)', border: '2px solid #2563eb20', borderRadius: 16, padding: '2rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: 'clamp(1.5rem,4vw,2rem)', marginBottom: '0.5rem' }}>💼 Tech Jobs in India</h1>
        <p style={{ color: 'var(--muted)', fontFamily: 'Poppins', fontSize: '14px', margin: 0 }}>Latest IT, engineering & software jobs — updated twice daily via Adzuna</p>
      </div>
      <AdSlot width={728} height={90} />

      <div style={{ display: 'flex', gap: '1rem', margin: '1.25rem 0', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 300px' }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs, companies, locations…" className="search-input" />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{ padding: '8px 14px', borderRadius: 999, border: '1.5px solid', borderColor: filter === t ? '#2563eb' : 'var(--border)', background: filter === t ? '#dbeafe' : 'var(--surface)', color: filter === t ? '#2563eb' : 'var(--muted)', fontFamily: 'Poppins', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '0.5rem', fontFamily: 'Poppins', fontSize: '13px', color: 'var(--muted)' }}>{filtered.length} jobs found</div>

      {loading ? (
        <div style={{ display: 'grid', gap: '0.875rem' }}>{Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} h={100} />)}</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {filtered.map(job => (
            <Link key={job.slug} href={`/jobs/${job.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card card-jobs accent-jobs" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1rem', marginBottom: '0.3rem', color: 'var(--text)' }}>{job.title}</div>
                  <div style={{ color: '#2563eb', fontSize: '13px', fontWeight: 600, fontFamily: 'Poppins', marginBottom: '0.3rem' }}>{job.company}</div>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--muted)', fontSize: '13px', fontFamily: 'Poppins', flexWrap: 'wrap' }}>
                    <span>📍 {job.location}</span>
                    <span>🕐 {job.job_type?.replace('_', ' ') || 'Full-time'}</span>
                    <span style={{ color: 'var(--light)' }}>{timeAgo(job.created_at)}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ color: '#16a34a', fontWeight: 700, fontSize: '14px', fontFamily: 'Poppins', marginBottom: '0.5rem' }}>{formatSalary(job.salary_min, job.salary_max, job.salary)}</div>
                  <span className="badge badge-jobs">Apply →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
