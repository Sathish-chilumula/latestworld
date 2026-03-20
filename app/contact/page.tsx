'use client'
import type { Metadata } from 'next'

export default function ContactPage() {
  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '3rem 1.25rem' }}>
      <h1 style={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '2rem', marginBottom: '0.4rem' }}>Contact Us</h1>
      <p style={{ color: 'var(--muted)', fontFamily: 'Poppins', marginBottom: '2rem' }}>Questions, feedback, or advertising inquiries? We'd love to hear from you.</p>

      <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Your Name', type: 'text', placeholder: 'Full name' },
          { label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
          { label: 'Subject', type: 'text', placeholder: 'What is this about?' },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontFamily: 'Poppins', fontWeight: 600, fontSize: '13px', color: 'var(--text)', marginBottom: '0.4rem' }}>{f.label}</label>
            <input type={f.type} placeholder={f.placeholder} className="search-input" style={{ paddingLeft: 16 }} />
          </div>
        ))}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontFamily: 'Poppins', fontWeight: 600, fontSize: '13px', color: 'var(--text)', marginBottom: '0.4rem' }}>Message</label>
          <textarea rows={5} placeholder="Your message…" className="search-input" style={{ paddingLeft: 16, paddingTop: 12, resize: 'vertical', minHeight: 120 }} />
        </div>
        <button className="btn-glow" style={{ width: '100%', justifyContent: 'center' }}>Send Message</button>
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '14px', marginBottom: '0.75rem' }}>Direct Contact</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ fontFamily: 'Poppins', fontSize: '14px', color: 'var(--muted)' }}>📧 <a href="mailto:admin@latestworld.in" style={{ color: '#e63946', fontWeight: 600 }}>admin@latestworld.in</a></div>
          <div style={{ fontFamily: 'Poppins', fontSize: '14px', color: 'var(--muted)' }}>🌐 <a href="https://latestworld.in" style={{ color: '#e63946', fontWeight: 600 }}>latestworld.in</a></div>
          <div style={{ fontFamily: 'Poppins', fontSize: '13px', color: 'var(--light)', marginTop: '0.25rem' }}>Response time: typically within 24–48 hours.</div>
        </div>
      </div>
    </div>
  )
}
