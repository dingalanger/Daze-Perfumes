import type { Metadata } from 'next'
import './globals.css'
import ClientShell from '../components/ClientShell'

export const metadata: Metadata = {
  title: 'Daze | Sleepwalker Club',
  description: 'Step into a foggy, dreamlike world of scent. Join the Sleepwalker Club for secret micro-drops between 3–5am.',
  keywords: 'perfume, fragrances, dreamlike, sleepwalker club, micro-drops, daze',
  authors: [{ name: 'Daze' }],
  openGraph: {
    title: 'Daze | Sleepwalker Club',
    description: 'A soft, hazy, surreal world of scent. Secret drops at 3–5am.',
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
      <body className="antialiased bg-vi-pearl-white text-vi-soft-black">
        <ClientShell>
          <div className="min-h-screen bg-sleep-fog">
            {children}
          </div>
        </ClientShell>
      </body>
    </html>
  )
} 