'use client'

import { useEffect, useRef, useState } from 'react'

type PortalOverlayProps = {
  onEntered: () => void
}

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
    document.documentElement.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = '' }
  }, [])

  const radius = 44
  const circumference = 2 * Math.PI * radius
  const dash = circumference * (1 - progress / 100)

  return (
    <div className="fixed inset-0 z-[1000] bg-daze-black/90 backdrop-blur-md">
      {/* Background fog and floating blobs */}
      <div className="absolute inset-0 bg-sleep-fog" />
      <div className="absolute -top-20 -left-24 w-[420px] h-[420px] rounded-full bg-daze-lavender/18 blur-3xl animate-float" />
      <div className="absolute top-1/3 -right-24 w-[360px] h-[360px] rounded-full bg-daze-fog/18 blur-3xl animate-float-delayed" />
      <div className="absolute bottom-[-120px] left-1/4 w-[500px] h-[500px] rounded-full bg-daze-peach/14 blur-3xl animate-float-slow" />

      <div className="relative h-full flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="font-serif text-4xl md:text-5xl">DAZE</h1>
          <p className="mt-3 text-daze-white/80">A soft, hazy, slightly surreal world of scent.</p>

          <div className="mt-10 inline-flex items-center justify-center">
            <button
              onMouseDown={() => setHolding(true)}
              onMouseUp={() => setHolding(false)}
              onMouseLeave={() => setHolding(false)}
              onTouchStart={() => setHolding(true)}
              onTouchEnd={() => setHolding(false)}
              className="relative w-28 h-28 rounded-full grid place-items-center border border-white/20 bg-black/20 hover:bg-black/10 transition-colors"
            >
              <svg className="absolute inset-0" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={radius} stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="url(#grad)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={dash}
                  strokeLinecap="round"
                  style={{ transition: holding ? 'stroke-dashoffset 0.06s linear' : 'stroke-dashoffset 0.2s ease' }}
                  transform="rotate(-90 50 50)"
                />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#CDB4DB" />
                    <stop offset="100%" stopColor="#BAC9E9" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-xs uppercase tracking-widest text-daze-white/80">Hold to enter</span>
            </button>
          </div>

          <p className="mt-6 text-xs text-daze-white/60">Press and hold until the fog parts.</p>
        </div>
      </div>
    </div>
  )
}


