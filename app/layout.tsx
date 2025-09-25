import type { Metadata } from 'next'
import './globals.css'
import ClientShell from '@/components/ClientShell'

export const metadata: Metadata = {
  title: 'Daze - Luxury Gourmand & Chinese-Inspired Fragrances',
  description: 'A fog-soft house of gourmand and Chinese-inspired perfumes. Scents drift through shadow and glow—intimate, modern, and a little surreal.',
  keywords: 'luxury perfumes, gourmand fragrances, Chinese-inspired perfumes, Daze, artisanal fragrances',
  authors: [{ name: 'Daze' }],
  openGraph: {
    title: 'Daze - Luxury Gourmand & Chinese-Inspired Fragrances',
    description: 'A fog-soft house of gourmand and Chinese-inspired perfumes—intimate, modern, a little surreal.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  )
} 