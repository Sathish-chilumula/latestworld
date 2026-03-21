import { getAllSlugs } from '@/lib/supabase'

import ClientPage from './ClientPage'

export default function Page() {
  return <ClientPage />
}
export async function generateStaticParams() {
  try {
    const { crypto } = await getAllSlugs()
    return crypto && crypto.length > 0
      ? crypto.map((item: any) => ({ slug: item.slug }))
      : [{ slug: 'placeholder' }]
  } catch (error) {
    console.warn('[Crypto generateStaticParams] Failed to fetch slugs for static generation:', error)
    return [{ slug: 'placeholder' }]
  }
}
