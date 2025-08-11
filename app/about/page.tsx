'use client'

import React, { useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

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
  const [isBetweenTextBlocks, setIsBetweenTextBlocks] = useState(false)
  const sectionTops = useRef<number[]>([])
  const sectionHeights = useRef<number[]>([])
  const [activeProgress, setActiveProgress] = useState(0)
  const scrollRef = useRef<HTMLDivElement | null>(null)
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
    }, { threshold: 0.5, root: rootEl })
    refs.current.forEach((el) => { if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [containerReady])

  useEffect(() => {
    let raf = 0
    const update = () => {
      const container = scrollRef.current
      const current = refs.current[active]
      if (!container || !current) { setIsBetweenTextBlocks(false); setActiveProgress(0); return }
      const containerHeight = container.clientHeight
      const containerScroll = container.scrollTop

      const top = sectionTops.current[active] ?? current.offsetTop
      const height = sectionHeights.current[active] ?? current.offsetHeight

      // whether the vertical center of container is inside the section
      const center = containerScroll + containerHeight / 2
      setIsBetweenTextBlocks(!(center >= top && center <= top + height))

      const progress = Math.min(1, Math.max(0, (containerScroll - top + containerHeight * 0.25) / (height + containerHeight * 0.5)))
      setActiveProgress(progress)
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    update()
    const container = scrollRef.current
    container?.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => { container?.removeEventListener('scroll', onScroll); window.removeEventListener('resize', update); cancelAnimationFrame(raf) }
  }, [active])

  useEffect(() => {
    const container = scrollRef.current
    const measureAll = () => {
      sectionTops.current = refs.current.map((el) => el?.offsetTop || 0)
      sectionHeights.current = refs.current.map((el) => el?.offsetHeight || 0)
    }
    measureAll()
    const onResize = () => measureAll()
    window.addEventListener('resize', onResize)
    const ro = container ? new ResizeObserver(measureAll) : null
    if (container && ro) ro.observe(container)
    return () => { window.removeEventListener('resize', onResize); if (container && ro) ro.disconnect() }
  }, [])

  const computeBlurPx = (p: number) => {
    if (p < 0.15) return 18 - (p / 0.15) * 18
    if (p < 0.65) return 0
    if (p < 0.9) return ((p - 0.65) / 0.25) * 18
    return 18
  }

  // Smooth blur easing
  const [blurAnimated, setBlurAnimated] = useState(18)
  useEffect(() => {
    let raf = 0
    const target = computeBlurPx(activeProgress)
    const animate = () => {
      setBlurAnimated((prev) => {
        const next = prev + (target - prev) * 0.12
        if (Math.abs(next - target) < 0.1) return target
        raf = requestAnimationFrame(animate)
        return next
      })
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [activeProgress])

  return (
    <>
      <Header />

      {/* Dedicated scroll container for the About page */}
      <div ref={scrollRef} className="fixed inset-0 z-0 overflow-y-auto overscroll-contain scroll-smooth">
        {/* Fixed, pinned background layers behind the scrolling text */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          {sections.map((s, i) => (
            <Parallax key={s.img} speed={-0.12 + i * 0.03} scaleIntensity={0.00025} className="absolute inset-0" scrollEl={scrollRef.current}>
              <div className={`${active === i ? 'z-20 opacity-100' : 'z-10 opacity-0'} absolute inset-0 transition-opacity duration-700 ease-out`}>
                <Image src={s.img} alt="" fill priority={i === 0} sizes="100vw" unoptimized className="object-cover" style={{ objectPosition: (s as any).position || '50% 50%', filter: active === i ? `blur(${blurAnimated.toFixed(1)}px)` : 'blur(18px)', transition: 'filter 500ms ease-out' }} />
                {/* Mid-ground subtle gradient/texture layer for depth */}
                <Parallax speed={-0.06 + i * 0.02} scaleIntensity={0} className="absolute inset-0" scrollEl={scrollRef.current}>
                  <div className={`absolute inset-0`} style={{ background: 'radial-gradient(120% 80% at 50% 20%, rgba(0,0,0,0.1), transparent 60%)' }} />
                </Parallax>
                {/* Foreground vignette / darkening overlay for readability */}
                <div className={`absolute inset-0 transition-colors duration-500 ${active === i ? (blurAnimated < 3 ? 'bg-black/25' : 'bg-black/65') : 'bg-black/50'}`} />
              </div>
            </Parallax>
          ))}
        </div>

        {/* Foreground scroller content; keep nav visible above */}
        <main className="min-h-screen text-white bg-transparent relative z-10">
          <section className="pt-24 pb-32">
            <div className="container-custom max-w-3xl">
              <h1 className="text-5xl font-serif font-bold mb-12">Our Story</h1>
              {sections.map((s, i) => (
                <div key={i} ref={(el) => { refs.current[i] = el }} data-index={i} className="min-h-[75vh] flex items-center">
                  <div
                    className={`transition-all duration-700 border border-white/10 p-6 md:p-8`}
                    style={i === active ? {
                      backdropFilter: blurAnimated < 3 ? 'blur(0px)' : 'blur(4px)',
                      backgroundColor: blurAnimated < 3 ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.5)',
                      opacity: Math.min(1, Math.max(0, (blurAnimated - 2) / 10)),
                      transform: 'translateZ(0)'
                    } : { backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0,0,0,0.5)', opacity: 0.85, transform: 'translateZ(0)' }}
                  >
                    <p className="text-lg md:text-xl leading-relaxed text-white/90">{s.text}</p>
                  </div>
                </div>
              ))}
              <div className="min-h-[60vh] flex items-center justify-center">
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