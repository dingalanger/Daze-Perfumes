'use client'

import React, { useEffect, useRef, useState } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  rot: number
  vr: number
  size: number
  color: string
  life: number
}

export default function GiftReveal() {
  const [isOpen, setIsOpen] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  const spawnBurst = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: Particle[] = []
    const { width, height } = canvas

    // Emit from box center toward right with spread
    const originX = width / 2
    const originY = height / 2 - 30

    const colors = ['#FFD166', '#06D6A0', '#EF476F', '#118AB2', '#FFFFFF']

    for (let i = 0; i < 120; i++) {
      const speed = 3 + Math.random() * 3
      const angle = (Math.PI / 8) * (Math.random() - 0.5) // small vertical spread
      const vx = speed * (1 + Math.random() * 0.5)
      const vy = Math.sin(angle) * speed * (Math.random() < 0.5 ? -1 : 1)
      particles.push({
        x: originX,
        y: originY,
        vx,
        vy,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.2,
        size: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
      })
    }

    let last = performance.now()

    const gravity = 0.15
    const air = 0.995

    const tick = (t: number) => {
      const dt = Math.min(33, t - last) / 16.67
      last = t

      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.vy += gravity * dt
        p.vx *= air
        p.vy *= air
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.rot += p.vr * dt
        p.life += dt

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()
      }

      // Remove when all off-screen
      const active = particles.some(p => p.y < height + 20 && p.x < width + 40)
      if (active) rafRef.current = requestAnimationFrame(tick)
      else {
        ctx.clearRect(0, 0, width, height)
        rafRef.current = null
      }
    }

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      canvas.width = Math.min(600, rect.width)
      canvas.height = 300
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  const handleClick = () => {
    const next = !isOpen
    setIsOpen(next)
    if (next) spawnBurst()
  }

  return (
    <div className="relative flex flex-col items-center justify-center mt-10">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10" />

      <button
        onClick={handleClick}
        className="group relative gift-container focus:outline-none"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close gift' : 'Open gift'}
      >
        <div className={`gift-box ${isOpen ? 'open' : ''}`}>
          <div className="gift-body">
            <span className="gift-ribbon-vertical" />
            <span className="gift-ribbon-horizontal" />
          </div>
          <div className="gift-lid">
            <span className="gift-bow-left" />
            <span className="gift-bow-right" />
          </div>
        </div>

        <div className={`bottle ${isOpen ? 'reveal' : ''}`} aria-hidden={!isOpen}>
          <div className="bottle-neck" />
          <div className="bottle-body">
            <div className="bottle-label font-serif text-black/90 tracking-widest text-center">DAZE</div>
          </div>
          <div className="bottle-cap" />
        </div>

        <div className="mt-4 text-sm text-white/60 group-hover:text-white/80 transition-colors">
          {isOpen ? 'Click to close' : 'Tap to open'}
        </div>
      </button>

      <button onClick={() => setShowHint(true)} className="mt-6 btn-outline-light">Reveal next hint</button>

      {showHint && (
        <p className="mt-4 text-white/80 text-center max-w-2xl">
          Congrats on finding this! your gift is located behind an australian animal near the one who makes your dreams come true
        </p>
      )}
    </div>
  )
} 