import { getAllSlugs } from '@/lib/supabase'

import ClientPage from './ClientPage'

export default function Page() {
  return <ClientPage />
}
export async function generateStaticParams() {
  try {
    const { news } = await getAllSlugs()
    return news && news.length > 0
      ? news.map((item: any) => ({ slug: item.slug }))
      : [{ slug: 'placeholder' }]
  } catch (error) {
    console.warn('[News generateStaticParams] Failed to fetch slugs for static generation:', error)
    return [{ slug: 'placeholder' }]
  }
}
