import { getAllSlugs } from '@/lib/supabase'

import ClientPage from './ClientPage'

export default function Page() {
  return <ClientPage />
}
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
