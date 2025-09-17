'use client'

import { useEffect, useState } from 'react'
import PortalOverlay from '@/components/PortalOverlay'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [showPortal, setShowPortal] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Always show on each visit
    setShowPortal(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {showPortal && (
        <PortalOverlay onEntered={() => setShowPortal(false)} />
      )}
      {children}
    </>
  )
}
