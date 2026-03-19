import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ThemeProvider } from '@/components/providers/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'hiraki',
  description:
    'The most capable React drawer component. All 4 directions, velocity-aware gestures, snap points, zero dependencies.',
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
