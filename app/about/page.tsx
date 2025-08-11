'use client'

import React, { useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function Parallax({ speed = 0.1, scaleIntensity = 0.00018, children, className = '', scrollEl }: { speed?: number; scaleIntensity?: number; children: React.ReactNode; className?: string; scrollEl?: HTMLElement | null }) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const getScrollY = () => (scrollEl ? scrollEl.scrollTop : window.scrollY)
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const delta = getScrollY()
        const y = delta * speed
        const scale = 1 + Math.min(Math.abs(delta) * scaleIntensity, 0.06)
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
      })
    }
    onScroll()
    const target = scrollEl || window
    target.addEventListener('scroll', onScroll, { passive: true } as any)
    return () => { target.removeEventListener('scroll', onScroll as any); cancelAnimationFrame(raf) }
  }, [speed, scaleIntensity, scrollEl])
  return <div ref={ref} className={className + ' will-change-transform'}>{children}</div>
}

export default function AboutPage() {
  const sections = [
    { img: '/images/about_founder.jpg', position: '50% 15%', text: "I’ve always been surrounded by scent. The spice of mapo tofu in my parents’ kitchen. The sugary smell of fresh boba. The faint, nutty aroma of mooncakes around Mid-Autumn Festival. Even when life moved me, from China to Ohio to Michigan to Maine, and now New York, those smells stayed with me." },
    { img: '/images/about_lab.jpg', position: '50% 50%', text: "I first dreamed of making perfumes when I was sixteen. I’d use the leftover money on my mom’s Visa gift cards to order colognes online, then hide the bottles so no one would find them. Being Asian in America meant choosing a safe path—so I kept my love for perfume quiet." },
    { img: '/images/about_winter-columbia.jpg', position: '50% 70%', text: "Now I’m studying at an Ivy League school, and for the first time, I have the resources (and the nerve) to make it real. Daze brings Chinese‑inspired gourmand scents to the American market—sweet, savory, spicy, warm." },
    { img: '/images/about_founder.jpg', position: '50% 40%', text: "All of our scents are unisex, because memories are universal. They belong to anyone who’s ever caught a smell in the air and been taken back to a time, a place, or a feeling they thought they’d forgotten." },
  ]

  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const bgRefs = useRef<(HTMLDivElement | null)[]>([])
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const [containerReady, setContainerReady] = useState(false)

  useEffect(() => { setContainerReady(true) }, [])

  useEffect(() => {
    if (!containerReady) return
    const rootEl = scrollRef.current || undefined
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = Number((e.target as HTMLElement).dataset.index || 0)
          setActive(idx)
        }
      })
    }, { threshold: 0.51, root: rootEl })
    refs.current.forEach((el) => { if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [containerReady])

  // GSAP pinning and transitions
  useEffect(() => {
    if (!containerReady) return
    gsap.registerPlugin(ScrollTrigger)
    const scroller = scrollRef.current!
    const triggers: ScrollTrigger[] = []

    // Optional: ensure GSAP uses our container
    ScrollTrigger.defaults({ scroller })

    refs.current.forEach((sectionEl, i) => {
      if (!sectionEl) return
      const bg = bgRefs.current[i]
      const overlay = overlayRefs.current[i]
      const textBox = textRefs.current[i]

      if (bg && overlay && textBox) {
        gsap.set(bg, { '--blur': '18px' } as any)
        gsap.set(overlay, { '--overlay': 0.65 } as any)

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top top+=80',
            end: '+=120%',
            scrub: 0.4,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          },
          defaults: { ease: 'power2.out' },
        })
        tl
          // Start: text readable, image blurred
          .to(bg, { css: { '--blur': '0px' }, duration: 0.5 }, 0.15)
          .to(overlay, { css: { '--overlay': 0.25 }, duration: 0.5 }, 0.15)
          .to(textBox, { opacity: 0.35, duration: 0.5 }, 0.2)
          // Hold clear image
          .to({}, { duration: 0.3 }, 0.55)
          // End: return to text readable, image blurred
          .to(bg, { css: { '--blur': '18px' }, duration: 0.45 }, 0.9)
          .to(overlay, { css: { '--overlay': 0.65 }, duration: 0.45 }, 0.9)
          .to(textBox, { opacity: 1, duration: 0.45 }, 0.9)

        triggers.push(tl.scrollTrigger!)
      }
    })

    return () => { triggers.forEach(t => t.kill()); ScrollTrigger.defaults({ scroller: undefined as any }) }
  }, [containerReady])

  return (
    <>
      <Header />

      {/* Dedicated scroll container for the About page */}
      <div ref={scrollRef} className="fixed inset-0 z-0 overflow-y-auto overflow-x-hidden overscroll-contain scroll-smooth">
        {/* Fixed, pinned background layers behind the scrolling text */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          {sections.map((s, i) => (
            <Parallax key={s.img} speed={-0.12 + i * 0.03} scaleIntensity={0.00025} className="absolute inset-0" scrollEl={scrollRef.current}>
              <div ref={(el) => { bgRefs.current[i] = el }} className={`${active === i ? 'z-20 opacity-100' : 'z-10 opacity-0'} absolute inset-0 transition-opacity duration-700 ease-out`} style={{ filter: 'blur(var(--blur,18px))' as any }}>
                <Image src={s.img} alt="" fill priority={i === 0} loading={i === 0 ? 'eager' : 'lazy'} sizes="100vw" unoptimized decoding="async" className="object-cover" style={{ objectPosition: (s as any).position || '50% 50%' }} />
                {/* Mid-ground subtle gradient/texture layer for depth */}
                <Parallax speed={-0.06 + i * 0.02} scaleIntensity={0} className="absolute inset-0" scrollEl={scrollRef.current}>
                  <div className={`absolute inset-0`} style={{ background: 'radial-gradient(120% 80% at 50% 20%, rgba(0,0,0,0.1), transparent 60%)' }} />
                </Parallax>
                {/* Foreground vignette / darkening overlay for readability */}
                <div ref={(el) => { overlayRefs.current[i] = el }} className={`absolute inset-0 transition-colors duration-300`} style={{ backgroundColor: `rgba(0,0,0,var(--overlay,0.65))` }} />
              </div>
            </Parallax>
          ))}
        </div>

        {/* Foreground scroller content; keep nav visible above */}
        <main className="min-h-screen text-white bg-transparent relative z-10">
          <section className="pt-24 pb-24">
            <div className="container-custom max-w-3xl">
              <div className="flex items-center justify-between mb-10">
                <h1 className="text-5xl font-serif font-bold">Our Story</h1>
                {/* Progress dots */}
                <div className="flex space-x-2">
                  {sections.map((_, i) => (
                    <span key={i} className={`w-2.5 h-2.5 rounded-full ${active === i ? 'bg-white' : 'bg-white/40'}`} />
                  ))}
                </div>
              </div>
              {sections.map((s, i) => (
                <div key={i} ref={(el) => { refs.current[i] = el }} data-index={i} className="min-h-[80vh] flex items-center about-section">
                  <div ref={(el) => { textRefs.current[i] = el }} className="transition-opacity duration-500 border border-white/10 p-6 md:p-8 bg-black/50 backdrop-blur-sm">
                    <h2 className="sr-only">Section {i + 1}</h2>
                    <p className="text-lg md:text-xl leading-relaxed text-white/90">{s.text}</p>
                  </div>
                </div>
              ))}
              <div className="min-h-[50vh] flex items-center justify-center">
                <a href="/collection" className="btn-outline-light inline-block">Shop Collection</a>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </>
  )
} 