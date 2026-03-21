import { getJob, getJobs, getAllSlugs, type Job } from '@/lib/supabase'
import { formatSalary, fmtDate, truncate } from '@/utils/helpers'
import { Breadcrumb, FAQ, AdSlot } from '@/components/UI'
import Link from 'next/link'

export async function generateStaticParams() {
  try {
    const { jobs } = await getAllSlugs()
    return jobs && jobs.length > 0
      ? jobs.map((item: any) => ({ slug: item.slug }))
      : [{ slug: 'placeholder' }]
  } catch (error) {
    console.warn('[Jobs generateStaticParams] Failed to fetch slugs for static generation:', error)
    return [{ slug: 'placeholder' }]
  }
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) console.warn('[Jobs] Missing NEXT_PUBLIC_SUPABASE_URL')
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) console.warn('[Jobs] Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')

  let job: Job | null = null
  let related: Job[] = []

  try {
    const [fetchedJob, allJobs] = await Promise.all([
      getJob(slug),
      getJobs(8)
    ])
    job = fetchedJob
    related = (allJobs || []).filter(x => x.slug !== slug).slice(0, 3)
  } catch (error) {
    console.error(`[Jobs] Error fetching data for slug "${slug}":`, error)
  }

  if (!job) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'Poppins', color: 'var(--muted)' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Job not found</h1>
        <p>This job may not exist or there was an error fetching the data.</p>
        <Link href="/" style={{ color: '#7c3aed', textDecoration: 'underline', marginTop: '1rem', display: 'inline-block' }}>Back to Home</Link>
      </div>
    )
  }

  const salary = formatSalary(job.salary_min, job.salary_max, job.salary)
  const faqItems = [
    { q: `What skills are needed for ${job.title}?`, a: `This ${job.title} position at ${job.company} requires relevant technical skills. Review the full job description below for specific requirements.` },
    { q: `Is this job remote?`, a: job.location?.toLowerCase().includes('remote') ? 'Yes, this position is remote.' : `This position is based in ${job.location}. Check the description for remote work options.` },
    { q: `What is the salary for this role?`, a: salary !== 'Competitive' ? `The salary range for this position is ${salary}.` : `Salary details are competitive and will be discussed during the hiring process.` },
    { q: `How do I apply for this job?`, a: `Click the "Apply Now" button on this page to be taken to the official application page on Adzuna or the company's careers portal.` },
  ]

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.25rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'JobPosting',
        title: job.title, description: job.description,
        hiringOrganization: { '@type': 'Organization', name: job.company },
        jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: job.location, addressCountry: 'IN' } },
        employmentType: job.job_type?.toUpperCase().replace('-', '_') || 'FULL_TIME',
        datePosted: job.created_at,
        url: `https://latestworld.in/jobs/${job.slug}`,
        ...(job.salary_min && { baseSalary: { '@type': 'MonetaryAmount', currency: 'INR', value: { '@type': 'QuantitativeValue', minValue: job.salary_min, maxValue: job.salary_max, unitText: 'YEAR' } } })
      })}} />

      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Tech Jobs', href: '/jobs' }, { label: truncate(job.title, 40) }]} />

      <div style={{ background: 'linear-gradient(135deg,#dbeafe,#eff6ff)', borderLeft: '6px solid #2563eb', borderRadius: 16, padding: '2rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: 'clamp(1.4rem,3.5vw,1.9rem)', marginBottom: '0.5rem', color: 'var(--text)' }}>{job.title}</h1>
        <div style={{ color: '#2563eb', fontWeight: 700, fontSize: '1.1rem', fontFamily: 'Poppins', marginBottom: '0.75rem' }}>{job.company}</div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: 'var(--muted)', fontSize: '14px', fontFamily: 'Poppins' }}>
          <span>📍 {job.location}</span>
          <span>🕐 {job.job_type?.replace('_', ' ') || 'Full-time'}</span>
          {salary !== 'Competitive' && <span style={{ color: '#16a34a', fontWeight: 700 }}>💰 {salary}</span>}
        </div>
      </div>

      <AdSlot width={728} height={90} />

      {job.description && (
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>Job Description</h2>
          <div style={{ color: 'var(--muted)', lineHeight: 1.9, fontFamily: 'Merriweather', fontSize: '14px', whiteSpace: 'pre-wrap' }}>{job.description}</div>
        </div>
      )}

      {job.apply_url && (
        <a href={job.apply_url} target="_blank" rel="noopener noreferrer" className="btn-glow" style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)', boxShadow: '0 4px 20px rgba(22,163,74,0.35)', marginBottom: '2rem', display: 'inline-flex' }}>
          ✅ Apply Now →
        </a>
      )}

      <div style={{ marginBottom: '2rem' }}><FAQ items={faqItems} /></div>

      {related.length > 0 && (
        <div>
          <h2 style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>Similar Jobs</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {related.map(j => (
              <Link key={j.slug} href={`/jobs/${j.slug}`} style={{ textDecoration: 'none' }}>
                <div className="card card-jobs accent-jobs" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>{j.title}</div>
                    <div style={{ color: '#2563eb', fontSize: '12px', fontFamily: 'Poppins', fontWeight: 600 }}>{j.company} · {j.location}</div>
                  </div>
                  <span className="badge badge-jobs">View →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
