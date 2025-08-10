'use client'

import React, { useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) el.classList.add('opacity-100', 'translate-y-0')
      })
    }, { threshold: 0.25 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className="opacity-0 translate-y-6 transition-all duration-700 will-change-transform">
      {children}
    </div>
  )
}

function Parallax({ speed = 0.1, children, className = '' }: { speed?: number; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let startTop = 0
    const measure = () => {
      const rect = el.getBoundingClientRect()
      startTop = rect.top + window.scrollY
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = (window.scrollY - startTop) * speed
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`
      })
    }
    measure(); onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', measure); cancelAnimationFrame(raf) }
  }, [speed])
  return <div ref={ref} className={className + ' will-change-transform'}>{children}</div>
}

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20 bg-black overflow-x-hidden">
      <Header />

      {/* Hero with subtle parallax shapes */}
      <section className="relative section-padding bg-black overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <Parallax speed={-0.12} className="absolute -top-24 -left-24 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-30" >
            <div className="w-full h-full bg-gradient-to-br from-white/10 via-white/0 to-white/0" />
          </Parallax>
          <Parallax speed={-0.08} className="absolute top-10 right-[-10rem] w-[32rem] h-[32rem] rounded-full blur-3xl opacity-20">
            <div className="w-full h-full bg-gradient-to-tr from-white/15 via-white/0 to-white/0" />
          </Parallax>
          <Parallax speed={-0.05} className="absolute bottom-[-8rem] left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full blur-2xl opacity-15">
            <div className="w-full h-full bg-gradient-to-b from-white/10 to-white/0" />
          </Parallax>
        </div>
        <div className="container-custom relative z-10 text-white">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Story</h1>
          <Reveal>
            <p className="text-white/80 max-w-3xl">I’ve always been surrounded by scent. The spice of mapo tofu in my parents’ kitchen. The sugary smell of fresh boba. The faint, nutty aroma of mooncakes around Mid-Autumn Festival. Even when life moved me, from China to Ohio to Michigan to Maine, and now New York, those smells stayed with me.</p>
          </Reveal>
        </div>
      </section>

      {/* Scroll sections with parallax imagery */}
      <section className="section-padding bg-black">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <Reveal>
            <p className="text-lg text-white/80 leading-relaxed">I first dreamed of making perfumes when I was sixteen. I’d use the leftover money on my mom’s Visa gift cards to order colognes online, then hide the bottles in a pile of clothes so no one would find them. It wasn’t that I’d stolen anything—I was just afraid of the disapproving look I knew I’d get. In my family, school always came first. Being Asian in America meant keeping your head down, working hard, and choosing a safe path. Perfume didn’t fit into that plan, so I kept my love for it quiet.</p>
          </Reveal>
          <Parallax speed={0.15}>
            <Reveal>
              <div className="relative h-72 bg-neutral-900 border border-white/10">
                <div className="absolute inset-0 flex items-center justify-center text-white/60">Studio — early experiments</div>
              </div>
            </Reveal>
          </Parallax>
        </div>
      </section>

      <section className="section-padding bg-black">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <Parallax speed={-0.12}>
            <Reveal>
              <div className="relative h-72 bg-neutral-900 border border-white/10">
                <div className="absolute inset-0 flex items-center justify-center text-white/60">Memories — boba, mooncakes, mapo tofu</div>
              </div>
            </Reveal>
          </Parallax>
          <Reveal>
            <p className="text-lg text-white/80 leading-relaxed">Now I’m studying at an Ivy League school, and for the first time, I have the resources (and the nerve) to make it real. Daze is my way of bringing Chinese-inspired gourmand scents into the American market. It’s for everyone, but some fragrances carry the nostalgia of growing up Chinese-American: sweet, savory, spicy, warm.</p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-black">
        <div className="container-custom">
          <Reveal>
            <p className="text-lg text-white/80 leading-relaxed max-w-4xl">All of our scents are unisex, because memories are universal. They belong to anyone who’s ever caught a smell in the air and been taken back to a time, a place, or a feeling they thought they’d forgotten.</p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-black">
        <div className="container-custom">
          <Parallax speed={0.1}>
            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative h-56 bg-neutral-900 border border-white/10 flex items-center justify-center text-white/60">Behind the scenes</div>
                <div className="relative h-56 bg-neutral-900 border border-white/10 flex items-center justify-center text-white/60">Materials & notes</div>
                <div className="relative h-56 bg-neutral-900 border border-white/10 flex items-center justify-center text-white/60">Process</div>
              </div>
            </Reveal>
          </Parallax>
        </div>
      </section>

      <section className="section-padding bg-black">
        <div className="container-custom text-center">
          <Reveal>
            <h2 className="text-3xl font-serif font-bold text-white mb-4">Experience Daze</h2>
            <p className="text-white/80 mb-6">Explore the collection and find the story that belongs to you.</p>
            <a href="/collection" className="btn-outline-light inline-block">Shop Collection</a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
} 