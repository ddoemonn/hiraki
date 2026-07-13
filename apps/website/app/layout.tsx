import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ThemeProvider } from '@/components/providers/theme-provider'
import './globals.css'

const description =
  'The most capable React drawer component. All 4 directions, velocity-aware gestures, snap points, zero dependencies.'

// Bump `?v=` to force Twitter/X and other caches to refetch the OG image.
const ogImage = {
  url: '/og?v=5',
  width: 1200,
  height: 630,
  alt: 'hiraki, an accessible zero-dependency React drawer',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://hiraki.ozzyx.xyz'),
  title: 'hiraki',
  description,
  openGraph: {
    title: 'hiraki',
    description,
    url: 'https://hiraki.ozzyx.xyz',
    siteName: 'hiraki',
    images: [ogImage],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'hiraki',
    description,
    images: [ogImage],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="bg-base text-fg">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
