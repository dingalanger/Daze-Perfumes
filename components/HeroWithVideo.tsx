'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Gift } from 'lucide-react'

export default function HeroWithVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.src = '/videos/O1.mp4'
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

          <p className="text-xl md:text-2xl text-white/85 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Discover the art of luxury perfumery where gourmand delights meet the elegance of Chinese tradition. Each fragrance tells a story.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up-delayed">
            <Link href="/collection" className="btn-outline-light w-[220px] text-center">Explore Collection</Link>
            <Link href="/about" className="btn-outline-light w-[220px] text-center">Our Story</Link>
          </div>

          <div className="mt-16 flex items-center justify-center space-x-8 text-sm text-white/70 animate-fade-in-delayed">
            <span>Artisanal Craftsmanship</span>
            <span>Luxury Ingredients</span>
            <span>Timeless Elegance</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in-slow">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>

      {/* Secret Icon Link */}
      <Link
        href="/natalie"
        aria-label="Secret"
        className="absolute bottom-6 right-6 z-10 text-white/40 hover:text-white transition-colors"
      >
        <Gift size={20} />
      </Link>
    </section>
  )
} 