'use client'

import { useEffect, useRef, useState } from 'react'

type PortalOverlayProps = { onEntered: () => void }

export default function PortalOverlay({ onEntered }: PortalOverlayProps) {
  const [holding, setHolding] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const holdStartRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const requiredMs = 1500
    let prev = performance.now()

    const tick = () => {
      const now = performance.now()
      const delta = now - prev
      prev = now
      setProgress((p) => {
        const dir = holding ? 1 : -1
        const step = (delta / requiredMs) * 100 * dir
        const next = Math.max(0, Math.min(100, p + step))
        return next
      })
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [holding])

  useEffect(() => {
    if (progress >= 100) {
      try { localStorage.setItem('portal_entered', 'true') } catch {}
      onEntered()
    }
  }, [progress, onEntered])

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

  return (
    <div className="fixed inset-0 z-[1000]" style={{ background: 'rgba(5,5,6,0.92)' }}>
      {/* Subtle background gradient */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(1200px 800px at -10% -20%, rgba(255,255,255,0.06), transparent 60%), radial-gradient(1000px 700px at 110% 10%, rgba(255,255,255,0.05), transparent 60%), radial-gradient(800px 600px at 50% 120%, rgba(255,255,255,0.04), transparent 60%)'
      }} />

      {/* Parting fog mask layer */}
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: `radial-gradient(circle at 50% 50%, rgba(0,0,0,0) ${radiusPercent}, rgba(0,0,0,1) calc(${radiusPercent} + 1%))`,
          maskImage: `radial-gradient(circle at 50% 50%, rgba(0,0,0,0) ${radiusPercent}, rgba(0,0,0,1) calc(${radiusPercent} + 1%))`,
          background: 'rgba(0,0,0,0.85)'
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
          <p className="mt-3 text-white/80">Hold on to slip into the daze.</p>

          <div className="mt-10 inline-flex items-center justify-center pointer-events-auto">
            <button
              onMouseDown={() => setHolding(true)}
              onMouseUp={() => setHolding(false)}
              onMouseLeave={() => setHolding(false)}
              onTouchStart={() => setHolding(true)}
              onTouchEnd={() => setHolding(false)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseOut={() => setIsHovering(false)}
              aria-label="Hold to enter"
              className="group relative w-28 h-28 rounded-full grid place-items-center border border-white/20 bg-black/30 transition-[background,box-shadow] duration-200 hover:bg-black/20 hover:shadow-[0_0_0_10px_rgba(147,197,253,0.18),0_0_80px_rgba(147,197,253,0.35)]"
            >
              <svg className="absolute inset-0" viewBox="0 0 100 100" style={{ filter: (isHovering || holding) ? 'drop-shadow(0 0 14px rgba(147,197,253,0.45))' : undefined }}>
                <circle cx="50" cy="50" r={ringRadius} stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r={ringRadius}
                  stroke={(isHovering || holding) ? 'url(#gradActive)' : 'url(#grad)'}
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
                  <linearGradient id="gradActive" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#9bc5ff" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#7aaaff" stopOpacity="0.85" />
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
