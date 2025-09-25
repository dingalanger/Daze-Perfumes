'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'

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

          <p className="text-xl md:text-2xl text-white/85 mb-3 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Join our waitlist to get early access, secret drops, and invites.
          </p>
          <p className="text-white/80 mb-8 animate-slide-up">
            welcome,{' '}
            <Link href="/sleepwalker-secret" className="underline decoration-dotted underline-offset-4 hover:text-white">sleepwalker</Link>
          </p>
          <div className="animate-slide-up mb-8">
            <Link href="/waitlist" className="inline-block px-6 py-3 bg-vi-fog-lavender hover:bg-vi-muted-jade text-black rounded-none transition-colors">Join the Waitlist</Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up-delayed">
            <Link href="/collection" className="btn-outline-light w-[220px] text-center">Explore Collection</Link>
            <Link href="/about" className="btn-outline-light w-[220px] text-center">Our Story</Link>
          </div>
        </div>
      </div>

      {/* Footer tag list and scroll indicator removed per request */}
    </section>
  )
} 