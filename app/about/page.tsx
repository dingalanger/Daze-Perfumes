'use client'

import React, { useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

function Parallax({ speed = 0.1, scaleIntensity = 0.00018, children, className = '' }: { speed?: number; scaleIntensity?: number; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let startTop = 0
    const measure = () => { const rect = el.getBoundingClientRect(); startTop = rect.top + window.scrollY }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const delta = window.scrollY - startTop
        const y = delta * speed
        const scale = 1 + Math.min(Math.abs(delta) * scaleIntensity, 0.06)
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
      })
    }
    measure(); onScroll();
    window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', measure)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', measure); cancelAnimationFrame(raf) }
  }, [speed, scaleIntensity])
  return <div ref={ref} className={className + ' will-change-transform'}>{children}</div>
}

export default function AboutPage() {
  const sections = [
    { img: '/images/about_founder.jpg', position: '50% 15%', text: "I’ve always been surrounded by scent. The spice of mapo tofu in my parents’ kitchen. The sugary smell of fresh boba. The faint, nutty aroma of mooncakes around Mid-Autumn Festival. Even when life moved me, from China to Ohio to Michigan to Maine, and now New York, those smells stayed with me." },
    { img: '/images/about_lab.jpg', position: '50% 50%', text: "I first dreamed of making perfumes when I was sixteen. I’d use the leftover money on my mom’s Visa gift cards to order colognes online, then hide the bottles so no one would find them. Being Asian in America meant choosing a safe path—so I kept my love for perfume quiet." },
    { img: '/images/about_winter-columbia.jpg', position: '50% 35%', text: "Now I’m studying at an Ivy League school, and for the first time, I have the resources (and the nerve) to make it real. Daze brings Chinese‑inspired gourmand scents to the American market—sweet, savory, spicy, warm." },
    { img: '/images/about_founder.jpg', position: '50% 40%', text: "All of our scents are unisex, because memories are universal. They belong to anyone who’s ever caught a smell in the air and been taken back to a time, a place, or a feeling they thought they’d forgotten." },
  ]

  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [isBetweenTextBlocks, setIsBetweenTextBlocks] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = Number((e.target as HTMLElement).dataset.index || 0)
          setActive(idx)
        }
      })
    }, { threshold: 0.4 })
    refs.current.forEach((el) => { if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    let raf = 0
    const update = () => {
      const centerY = window.innerHeight / 2
      const current = refs.current[active]
      if (!current) { setIsBetweenTextBlocks(false); return }
      const rect = current.getBoundingClientRect()
      const isCenterInside = centerY >= rect.top && centerY <= rect.bottom
      setIsBetweenTextBlocks(!isCenterInside)
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', update); cancelAnimationFrame(raf) }
  }, [active])

  return (
    <>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {sections.map((s, i) => (
          <Parallax
            key={s.img}
            speed={-0.12 + i * 0.03}
            scaleIntensity={0.00025}
            className="absolute inset-0"
          >
            <div className={`${active === i ? 'z-20 opacity-100' : 'z-10 opacity-0'} absolute inset-0 transition-opacity duration-700 ease-out`}>
              <Image
                src={s.img}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                unoptimized
                className="object-cover"
                style={{
                  objectPosition: (s as any).position || '50% 50%',
                  filter: active === i ? (isBetweenTextBlocks ? 'blur(0px)' : 'blur(16px)') : 'blur(16px)',
                  transition: 'filter 700ms ease-out'
                }}
              />
              <div className={`absolute inset-0 transition-colors duration-500 ${active === i ? (isBetweenTextBlocks ? 'bg-black/30' : 'bg-black/65') : 'bg-black/50'}`} />
            </div>
          </Parallax>
        ))}
      </div>

      <main className="min-h-screen text-white bg-transparent relative z-10">
        <Header />

        <section className="pt-24 pb-32">
          <div className="container-custom max-w-3xl">
            <h1 className="text-5xl font-serif font-bold mb-12">Our Story</h1>
            {sections.map((s, i) => (
              <div key={i} ref={(el) => { refs.current[i] = el }} data-index={i} className="min-h-[75vh] flex items-center">
                <div className={`transition-all duration-700 border border-white/10 p-6 md:p-8 ${active === i ? 'backdrop-blur-0 bg-black/40 blur-0 opacity-100' : 'backdrop-blur-sm bg-black/50 blur-[2px] opacity-85'}`}>
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
    </>
  )
} 