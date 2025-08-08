import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Daze - Luxury Gourmand & Chinese-Inspired Fragrances',
  description: 'Discover the art of luxury perfumery with Daze. Our collection features exquisite gourmand and Chinese-inspired fragrances that tell stories through scent.',
  keywords: 'luxury perfumes, gourmand fragrances, Chinese-inspired perfumes, Daze, artisanal fragrances',
  authors: [{ name: 'Daze' }],
  openGraph: {
    title: 'Daze - Luxury Gourmand & Chinese-Inspired Fragrances',
    description: 'Discover the art of luxury perfumery with Daze. Our collection features exquisite gourmand and Chinese-inspired fragrances.',
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
        {children}
      </body>
    </html>
  )
} 