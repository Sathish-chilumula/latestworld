'use client'
import { useEffect, useState } from 'react'
import { getJobBySlug } from '../../../lib/supabase'
import { useParams } from 'next/navigation'

export default function JobDetailPage() {
  const params = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params?.slug) {
      getJobBySlug(params.slug).then(setJob).finally(() => setLoading(false))
    }
  }, [params])

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Loading...</div>
  if (!job) return <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>Job not found</div>

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": job.title,
        "description": job.description,
        "hiringOrganization": { "@type": "Organization", "name": job.company },
        "jobLocation": { "@type": "Place", "address": job.location },
        "employmentType": job.job_type?.toUpperCase(),
        "datePosted": job.created_at
      })}} />

      <a href="/tech-jobs" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.875rem' }}>← Back to Jobs</a>

      <div style={{ margin: '1.5rem 0' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>{job.title}</h1>
        <div style={{ color: '#38bdf8', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{job.company}</div>
        <div style={{ display: 'flex', gap: '1.5rem', color: '#64748b', fontSize: '0.9rem', flexWrap: 'wrap' }}>
          <span>📍 {job.location}</span>
          <span>🕐 {job.job_type?.replace('_', ' ')}</span>
          {job.salary_min && <span style={{ color: '#22c55e' }}>💰 ₹{Number(job.salary_min/100000).toFixed(0)}L – {Number(job.salary_max/100000).toFixed(0)}L/yr</span>}
        </div>
      </div>

      {job.description && (
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ marginTop: 0 }}>Job Description</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{job.description?.substring(0, 1000)}...</p>
        </div>
      )}

      {job.apply_url && (
        <a href={job.apply_url} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-block', background: '#22c55e', color: '#0a0a0f', padding: '0.75rem 2rem', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: '1rem' }}>
          Apply for this Job →
        </a>
      )}
    </div>
  )
}
