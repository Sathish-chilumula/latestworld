import { getAllSlugs } from '@/lib/supabase'

import ClientPage from './ClientPage'

export default function Page() {
  return <ClientPage />
}
export async function generateStaticParams() {
  try {
    const { startups } = await getAllSlugs()
    return startups && startups.length > 0
      ? startups.map((item: any) => ({ slug: item.slug }))
      : [{ slug: 'placeholder' }]
  } catch (error) {
    console.warn('[Startups generateStaticParams] Failed to fetch slugs for static generation:', error)
    return [{ slug: 'placeholder' }]
  }
}
