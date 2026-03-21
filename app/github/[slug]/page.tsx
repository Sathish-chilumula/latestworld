import { getAllSlugs } from '@/lib/supabase'

import ClientPage from './ClientPage'

export default function Page() {
  return <ClientPage />
}
export async function generateStaticParams() {
  try {
    const { github } = await getAllSlugs()
    return github && github.length > 0
      ? github.map((item: any) => ({ slug: item.slug }))
      : [{ slug: 'placeholder' }]
  } catch (error) {
    console.warn('[GitHub generateStaticParams] Failed to fetch slugs for static generation:', error)
    return [{ slug: 'placeholder' }]
  }
}
