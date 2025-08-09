'use client'

import React from 'react'

type ConfettiPiece = {
  left: string
  delay: string
  duration: string
  color: string
  drift: string
}

const COLORS = ['#F5D08A', '#FFFFFF', '#F2B46D', '#E8E8E8']

export default function Confetti({ fullScreen = false, density = 48, variant = 'overlay', speed = 1, originYPercent = 0 }: { fullScreen?: boolean; density?: number; variant?: 'overlay' | 'background'; speed?: number; originYPercent?: number }) {
  const pieces: ConfettiPiece[] = Array.from({ length: density }).map((_, index) => {
    const color = COLORS[index % COLORS.length]
    const leftPercent = (index * 97) % 100
    const baseDelay = (index % 12) * 0.12
    const baseDuration = 1.4 + (index % 6) * 0.28
    const adjustedDuration = Math.max(1, baseDuration / Math.max(0.25, speed))
    const driftPx = (index % 2 === 0 ? 1 : -1) * (10 + (index % 10))

    return {
      left: `${leftPercent}%`,
      delay: `${baseDelay}s`,
      duration: `${adjustedDuration}s`,
      color,
      drift: `${driftPx}px`,
    }
  })

  const containerClass = fullScreen
    ? `pointer-events-none fixed inset-0 overflow-hidden ${variant === 'background' ? 'z-0' : 'z-50'}`
    : `pointer-events-none absolute inset-0 overflow-hidden ${variant === 'background' ? 'z-0' : 'z-50'}`

  const origin = `${Math.min(95, Math.max(0, originYPercent))}%`

  return (
    <div className={containerClass} aria-hidden>
      <style jsx>{`
        @keyframes confettiFallOnce { 0% { transform: translate3d(0,-10%,0) rotate(0deg); opacity: 0 } 10%{opacity:1} 100% { transform: translate3d(var(--drift,0px), 120%, 0) rotate(360deg); opacity: 0 } }
      `}</style>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: p.left,
            top: origin as any,
            background: p.color,
            ['--duration' as any]: p.duration as any,
            ['--delay' as any]: p.delay as any,
            ['--drift' as any]: p.drift as any,
            animation: `confettiFallOnce var(--duration) cubic-bezier(0.25,0.4,0.3,1) var(--delay) 1`,
          }}
        />
      ))}
    </div>
  )
} 