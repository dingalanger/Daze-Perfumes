'use client'

import { useEffect, useRef, useState } from 'react'

type PortalOverlayProps = { onEntered: () => void }

export default function PortalOverlay({ onEntered }: PortalOverlayProps) {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number | null>(null)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const requiredMs = 1400
    let prev = performance.now()

    const tick = () => {
      const now = performance.now()
      const delta = now - prev
      prev = now
      setProgress((p) => {
        // Auto progress like a loading animation (no hold required)
        const step = (delta / requiredMs) * 100
        const next = Math.max(0, Math.min(100, p + step))
        return next
      })
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      try { localStorage.setItem('portal_entered', 'true') } catch {}
      // brief crossfade to allow home to mount
      setFadeOut(true)
      const id = setTimeout(() => onEntered(), 250)
      return () => clearTimeout(id)
    }
  }, [progress, onEntered])

  useEffect(() => {
    // Prevent scroll while overlay is visible
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    return () => { html.style.overflow = prev }
  }, [])

  // Fog clears uniformly from the whole screen (no central circle)
  const t = Math.max(0, Math.min(1, progress / 100))

  return (
    <div className={`fixed inset-0 z-[1000] transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`} style={{ background: 'rgba(5,5,6,0.92)' }}>
      {/* Subtle background gradient */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(1200px 800px at -10% -20%, rgba(255,255,255,0.06), transparent 60%), radial-gradient(1000px 700px at 110% 10%, rgba(255,255,255,0.05), transparent 60%), radial-gradient(800px 600px at 50% 120%, rgba(255,255,255,0.04), transparent 60%)'
      }} />

      {/* Fog layer that dissipates globally */}
      <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${0.85 * (1 - t)})` }} />

      {/* Cloud layers drift and fade as fog clears */}
      <img
        src="/images/cloud-placeholder.svg"
        alt="Cloud left"
        className="pointer-events-none select-none absolute w-[680px]"
        style={{ left: '50%', top: '48%', opacity: 0.15 * (1 - t), transform: `translate(-50%, -50%) translateX(${(-260 * t).toFixed(1)}px) scale(${(1 + t * 0.08).toFixed(3)})` }}
        draggable={false}
      />
      <img
        src="/images/cloud-placeholder.svg"
        alt="Cloud right"
        className="pointer-events-none select-none absolute w-[680px]"
        style={{ left: '50%', top: '52%', opacity: 0.15 * (1 - t), transform: `translate(-50%, -50%) translateX(${(260 * t).toFixed(1)}px) scale(${(1 + t * 0.08).toFixed(3)})` }}
        draggable={false}
      />
      {/* Additional layers for richness */}
      <img
        src="/images/cloud-placeholder.svg"
        alt="Cloud upper-left"
        className="pointer-events-none select-none absolute w-[520px]"
        style={{ left: '50%', top: '40%', opacity: 0.15 * (1 - t), transform: `translate(-50%, -50%) translateX(${(-300 * t).toFixed(1)}px) scale(${(0.96 + t * 0.06).toFixed(3)})` }}
        draggable={false}
      />
      <img
        src="/images/cloud-placeholder.svg"
        alt="Cloud lower-right"
        className="pointer-events-none select-none absolute w-[520px]"
        style={{ left: '50%', top: '60%', opacity: 0.15 * (1 - t), transform: `translate(-50%, -50%) translateX(${(300 * t).toFixed(1)}px) scale(${(0.96 + t * 0.06).toFixed(3)})` }}
        draggable={false}
      />
      {/* Ambient floating blobs (theme-agnostic) */}
      <div className="absolute -top-24 -left-28 w-[420px] h-[420px] rounded-full bg-white/8 blur-3xl animate-float" />
      <div className="absolute top-1/3 -right-24 w-[360px] h-[360px] rounded-full bg-white/8 blur-3xl animate-float-delayed" />
      <div className="absolute bottom-[-140px] left-1/4 w-[520px] h-[520px] rounded-full bg-white/6 blur-3xl animate-float-slow" />

      <div className="relative h-full flex items-center justify-center px-6 pointer-events-none">
        <div className="text-center max-w-md" style={{ opacity: 1 - t }}>
          <h1 className="font-serif text-4xl md:text-5xl text-white">DAZE</h1>
          <p className="mt-3 text-white/80">Slip into the daze.</p>
        </div>
      </div>
    </div>
  )
}
