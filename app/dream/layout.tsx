import type { Metadata } from 'next'
import '../globals.css'
import ClientShell from '@/components/ClientShell'

export const metadata: Metadata = {
  title: 'Daze | Dream Preview',
  description: 'Preview the surreal, foggy Sleepwalker world.',
}

export default function DreamLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-daze-black text-daze-white">
        <ClientShell>
          <div className="min-h-screen bg-sleep-fog">
            {children}
          </div>
        </ClientShell>
      </body>
    </html>
  )
}


