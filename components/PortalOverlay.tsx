'use client'

import { useEffect, useRef, useState } from 'react'

type PortalOverlayProps = { onEntered: () => void }

export default function PortalOverlay({ onEntered }: PortalOverlayProps) {
  const [holding, setHolding] = useState(false)
  const [progress, setProgress] = useState(0)
  const holdStartRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!holding) {
      setProgress((p) => (p > 0 && p < 100 ? Math.max(0, p - 2) : p))
      return
    }

    const requiredMs = 1500
    const start = performance.now()
    holdStartRef.current = start

    const tick = () => {
      const now = performance.now()
      const elapsed = now - (holdStartRef.current || start)
      const pct = Math.min(100, (elapsed / requiredMs) * 100)
      setProgress(pct)
      if (pct >= 100) {
        try { localStorage.setItem('portal_entered', 'true') } catch {}
        onEntered()
        cancelAnimationFrame(rafRef.current || 0)
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [holding, onEntered])

  useEffect(() => {
    // Prevent scroll while overlay is visible
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    return () => { html.style.overflow = prev }
  }, [])

  // Fog mask expands from center as user holds
  const radiusPercent = `${Math.max(0, Math.min(100, progress))}%`
  const ringRadius = 44
  const circumference = 2 * Math.PI * ringRadius
  const dash = circumference * (1 - progress / 100)
  const t = Math.max(0, Math.min(1, progress / 100))
  const overlayOpacity = 0.85 - 0.45 * t

  return (
    <div className="fixed inset-0 z-[1000]" style={{ background: `rgba(5,5,6,${0.92 * (1 - t * 0.3)})` }}>
      {/* Subtle background gradient */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(1200px 800px at -10% -20%, rgba(255,255,255,0.06), transparent 60%), radial-gradient(1000px 700px at 110% 10%, rgba(255,255,255,0.05), transparent 60%), radial-gradient(800px 600px at 50% 120%, rgba(255,255,255,0.04), transparent 60%)'
      }} />

      {/* Parting fog mask layer */}
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: `radial-gradient(circle at 50% 50%, rgba(0,0,0,1) ${radiusPercent}, rgba(0,0,0,0) calc(${radiusPercent} + 1%))`,
          maskImage: `radial-gradient(circle at 50% 50%, rgba(0,0,0,1) ${radiusPercent}, rgba(0,0,0,0) calc(${radiusPercent} + 1%))`,
          background: `rgba(0,0,0,${overlayOpacity.toFixed(2)})`
        }}
      />

      {/* Side clouds (placeholders) */}
      <img
        src="/images/cloud-placeholder.svg"
        alt="Cloud left"
        className="pointer-events-none select-none absolute left-[-160px] top-1/4 w-[520px] opacity-10"
        style={{ transform: `translateX(${(-60 + 60 * t).toFixed(1)}px) scale(${1 + t * 0.05})` }}
        draggable={false}
      />
      <img
        src="/images/cloud-placeholder.svg"
        alt="Cloud right"
        className="pointer-events-none select-none absolute right-[-160px] top-1/3 w-[520px] opacity-10"
        style={{ transform: `translateX(${(60 - 60 * t).toFixed(1)}px) scale(${1 + t * 0.05})` }}
        draggable={false}
      />
      {/* Ambient floating blobs (theme-agnostic) */}
      <div className="absolute -top-24 -left-28 w-[420px] h-[420px] rounded-full bg-white/8 blur-3xl animate-float" />
      <div className="absolute top-1/3 -right-24 w-[360px] h-[360px] rounded-full bg-white/8 blur-3xl animate-float-delayed" />
      <div className="absolute bottom-[-140px] left-1/4 w-[520px] h-[520px] rounded-full bg-white/6 blur-3xl animate-float-slow" />

      <div className="relative h-full flex items-center justify-center px-6 pointer-events-none">
        <div className="text-center max-w-md">
          <h1 className="font-serif text-4xl md:text-5xl text-white">DAZE</h1>
          <p className="mt-3 text-white/80">Press and hold to enter.</p>

          <div className="mt-10 inline-flex items-center justify-center pointer-events-auto">
            <button
              onMouseDown={() => setHolding(true)}
              onMouseUp={() => setHolding(false)}
              onMouseLeave={() => setHolding(false)}
              onTouchStart={() => setHolding(true)}
              onTouchEnd={() => setHolding(false)}
              aria-label="Hold to enter"
              className="group relative w-28 h-28 rounded-full grid place-items-center border border-white/20 bg-black/30 transition-colors hover:bg-black/20 hover:shadow-[0_0_0_6px_rgba(255,255,255,0.06),0_0_40px_rgba(255,255,255,0.08)]"
            >
              <svg className="absolute inset-0" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={ringRadius} stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r={ringRadius}
                  stroke="url(#grad)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={dash}
                  strokeLinecap="round"
                  style={{ transition: `${holding ? 'stroke-dashoffset 0.06s linear' : 'stroke-dashoffset 0.2s ease'}, stroke 0.2s ease` }}
                  transform="rotate(-90 50 50)"
                />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.45" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-xs uppercase tracking-widest text-white/85 transition-opacity group-hover:opacity-100">Hold to enter</span>
            </button>
          </div>

          <p className="mt-6 text-xs text-white/60">We’ll remember next time.</p>
        </div>
      </div>
    </div>
  )
}
