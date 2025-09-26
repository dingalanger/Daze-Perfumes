'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroWithVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.src = '/videos/O1 new.mp4'
    video.preload = 'auto'
    video.loop = true
    video.muted = true
    video.autoplay = true

    const ensurePlay = async () => {
      try {
        await video.play()
      } catch {
        try { video.muted = true; await video.play() } catch {}
      }
    }

    ensurePlay()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-wide text-white mb-4">DAZE</h1>
          </div>

          {/* Hidden initially; reveal via CSS when overlay unmounts by targeting :not(.portal-active) */}
          <p className="hero-reveal text-2xl md:text-3xl text-white/90 mb-8 opacity-0 translate-y-4">
            Welcome, <Link href="/sleepwalker-secret" className="transition-all hover:text-white hover:[text-shadow:0_0_10px_rgba(255,255,255,0.6)] focus:[text-shadow:0_0_10px_rgba(255,255,255,0.6)]">sleepwalker</Link>
          </p>
          <div className="hero-reveal mb-10 opacity-0 translate-y-4">
            <div className="group relative inline-block">
              <span className="pointer-events-none absolute -inset-1 rounded-full bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Link href="/waitlist" className="relative inline-flex items-center justify-center w-[260px] sm:w-[300px] px-8 py-4 text-lg font-semibold rounded-full bg-white text-black border border-white/40 shadow-[0_0_0_1px_rgba(255,255,255,0.2)] hover:shadow-[0_0_24px_rgba(255,255,255,0.25)] transition-all duration-300 hover:scale-[1.02]">
                Join the Waitlist
                <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="hero-reveal flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 translate-y-4">
            <Link href="/collection" className="btn-outline-light w-[220px] text-center">Explore Collection</Link>
            <Link href="/about" className="btn-outline-light w-[220px] text-center">Our Story</Link>
          </div>
        </div>
      </div>

      {/* Footer tag list and scroll indicator removed per request */}
    </section>
  )
} 