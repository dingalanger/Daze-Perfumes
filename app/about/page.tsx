'use client'

import React, { useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

function Parallax({ speed = 0.1, children, className = '' }: { speed?: number; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let startTop = 0
    const measure = () => { const rect = el.getBoundingClientRect(); startTop = rect.top + window.scrollY }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { const y = (window.scrollY - startTop) * speed; el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)` }) }
    measure(); onScroll();
    window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', measure)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', measure); cancelAnimationFrame(raf) }
  }, [speed])
  return <div ref={ref} className={'relative ' + className + ' will-change-transform'}>{children}</div>
}

export default function AboutPage() {
  const sections = [
    { img: '/images/about_founder.jpg', text: "I’ve always been surrounded by scent. The spice of mapo tofu in my parents’ kitchen. The sugary smell of fresh boba. The faint, nutty aroma of mooncakes around Mid-Autumn Festival. Even when life moved me, from China to Ohio to Michigan to Maine, and now New York, those smells stayed with me." },
    { img: '/images/about_lab.jpg', text: "I first dreamed of making perfumes when I was sixteen. I’d use the leftover money on my mom’s Visa gift cards to order colognes online, then hide the bottles so no one would find them. Being Asian in America meant choosing a safe path—so I kept my love for perfume quiet." },
    { img: '/images/about_winter-columbia.jpg', text: "Now I’m studying at an Ivy League school, and for the first time, I have the resources (and the nerve) to make it real. Daze brings Chinese‑inspired gourmand scents to the American market—sweet, savory, spicy, warm." },
    { img: '/images/about_lab.jpg', text: "All of our scents are unisex, because memories are universal. They belong to anyone who’s ever caught a smell in the air and been taken back to a time, a place, or a feeling they thought they’d forgotten." },
  ]

  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = Number((e.target as HTMLElement).dataset.index || 0)
          setActive(idx)
        }
      })
    }, { threshold: 0.6 })
    refs.current.forEach((el) => { if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {sections.map((s, i) => (
          <Parallax key={s.img} speed={-0.06 + i * 0.01} className="absolute inset-0">
            <Image src={s.img} alt="" fill priority={i === 0} className={`object-cover transition-all duration-700 ${active === i ? 'opacity-100 blur-0' : 'opacity-40 blur-lg'}`} />
            <div className={`absolute inset-0 transition-colors duration-700 ${active === i ? 'bg-black/20' : 'bg-black/60'}`} />
          </Parallax>
        ))}
      </div>

      <main className="min-h-screen text-white bg-transparent">
        <Header />

        <section className="pt-24 pb-32">
          <div className="container-custom max-w-3xl">
            <h1 className="text-5xl font-serif font-bold mb-12">Our Story</h1>
            {sections.map((s, i) => (
              <div key={i} ref={(el) => { refs.current[i] = el }} data-index={i} className="min-h-[75vh] flex items-center">
                <div className={`transition-all duration-700 border border-white/10 p-6 md:p-8 ${active === i ? 'backdrop-blur-0 bg-black/30 blur-0 opacity-100' : 'backdrop-blur-sm bg-black/40 blur-[2px] opacity-80'}`}>
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