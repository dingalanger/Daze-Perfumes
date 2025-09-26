'use client'

import { useEffect, useState } from 'react'
import PortalOverlay from '@/components/PortalOverlay'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [showPortal, setShowPortal] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const sessionSeen = sessionStorage.getItem('portal_seen_session') === 'true'
      if (!sessionSeen) setShowPortal(true)
    } catch {
      setShowPortal(true)
    }
  }, [])

  // Toggle a root class so hero content can stay hidden until overlay is gone
  useEffect(() => {
    const root = document.documentElement
    if (showPortal) root.classList.add('portal-active')
    else root.classList.remove('portal-active')
  }, [showPortal])

  if (!mounted) return null

  return (
    <>
      {showPortal && (
        <PortalOverlay onEntered={() => { try { sessionStorage.setItem('portal_seen_session', 'true') } catch {}; document.documentElement.classList.remove('portal-active'); setShowPortal(false) }} />
      )}
      {/* Remount the app once the overlay clears so home animations begin exactly then */}
      <div key={showPortal ? 'portal' : 'main'}>
        {children}
      </div>
    </>
  )
}
