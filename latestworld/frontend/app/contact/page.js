export default function ContactPage() {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '3rem 1rem' }}>
      <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 800, marginBottom: '0.5rem' }}>Contact Us</h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>We'd love to hear from you.</p>

      <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: 12, padding: '2rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.4rem' }}>Your Name</label>
          <input type="text" placeholder="Sathish Kumar"
            style={{ width: '100%', padding: '0.7rem 1rem', background: '#0a0a0f', border: '1px solid #1e1e2e', borderRadius: 8, color: '#e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.4rem' }}>Email Address</label>
          <input type="email" placeholder="you@example.com"
            style={{ width: '100%', padding: '0.7rem 1rem', background: '#0a0a0f', border: '1px solid #1e1e2e', borderRadius: 8, color: '#e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.4rem' }}>Message</label>
          <textarea rows={5} placeholder="Your message..."
            style={{ width: '100%', padding: '0.7rem 1rem', background: '#0a0a0f', border: '1px solid #1e1e2e', borderRadius: 8, color: '#e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
        </div>
        <p style={{ color: '#475569', fontSize: '0.8rem', marginBottom: '1rem' }}>
          For now, please email us directly at: <a href="mailto:admin@latestworld.in" style={{ color: '#38bdf8' }}>admin@latestworld.in</a>
        </p>
      </div>
    </div>
  )
}
