import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { BreakingTicker } from '@/components/UI'

export const metadata: Metadata = {
  metadataBase: new URL('https://latestworld.in'),
  title: {
    default: 'LatestWorld — Tech News, Crypto, AI Tools, Jobs & GitHub India',
    template: '%s | LatestWorld'
  },
  description: 'LatestWorld.in — India\'s automated tech intelligence hub. Live cryptocurrency prices, latest tech news, AI tools, trending GitHub projects, startup funding news, and tech jobs. Updated automatically every few hours.',
  keywords: ['tech news India', 'crypto prices India', 'AI tools 2024', 'GitHub trending', 'startup funding India', 'tech jobs Bangalore', 'bitcoin price INR', 'ethereum price today'],
  authors: [{ name: 'LatestWorld', url: 'https://latestworld.in' }],
  creator: 'LatestWorld',
  publisher: 'LatestWorld',
  openGraph: {
    type: 'website', locale: 'en_IN',
    url: 'https://latestworld.in',
    siteName: 'LatestWorld',
    title: 'LatestWorld — India\'s #1 Automated Tech Intelligence Hub',
    description: 'Crypto prices, tech news, AI tools, GitHub trending, startup funding & tech jobs — all updated automatically.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'LatestWorld.in' }]
  },
  twitter: { card: 'summary_large_image', site: '@latestworld_in', creator: '@latestworld_in' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: { google: 'ADD_YOUR_GOOGLE_SITE_VERIFICATION_HERE' }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="canonical" href="https://latestworld.in" />
        {/* Add your AdSense script here after approval:
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX" crossOrigin="anonymous" /> */}
      </head>
      <body>
        <BreakingTicker />
        <Navbar />
        <main style={{ minHeight: '80vh' }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
