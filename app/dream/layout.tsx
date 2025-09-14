import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Daze | Dream Preview',
  description: 'Preview the surreal, foggy Sleepwalker world.',
}

export default function DreamLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-daze-black text-daze-white">
        <div className="min-h-screen bg-sleep-fog">
          {children}
        </div>
      </body>
    </html>
  )
}


