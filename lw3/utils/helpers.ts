export const slug = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim().substring(0, 80)

export const uniqueSlug = (t: string) => `${slug(t)}-${Date.now().toString(36)}`

export const formatPrice = (p: number) =>
  p >= 1 ? p.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : p.toFixed(6)

export const formatLargeNum = (n: number) => {
  if (!n) return 'N/A'
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`
  return `$${n.toLocaleString()}`
}

export const formatSalary = (min?: number, max?: number, raw?: string) => {
  if (raw) return raw
  if (!min && !max) return 'Competitive'
  const toL = (n: number) => `₹${(n / 100000).toFixed(0)}L`
  if (!max) return `${toL(min!)}+/yr`
  return `${toL(min!)} – ${toL(max)}/yr`
}

export const timeAgo = (d: string) => {
  if (!d) return ''
  const diff = Date.now() - new Date(d).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export const truncate = (t: string, n = 120) => {
  if (!t) return ''
  return t.length > n ? t.slice(0, n) + '…' : t
}

export const fmtDate = (d: string) =>
  d ? new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : ''
