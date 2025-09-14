'use client'

import React, { useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// removed media imports

export default function AboutPage() {
  const sections = [
    { title: 'Beginnings', text: "I’ve always been surrounded by scent. The spice of mapo tofu in my parents’ kitchen. The sugary smell of fresh boba. The faint, nutty aroma of mooncakes around Mid-Autumn Festival. Even when life moved me, from China to Ohio to Michigan to Maine, and now New York, those smells stayed with me." },
    { title: 'First Experiments', text: `I first dreamed of making perfumes when I was sixteen. I’d use the leftover money on my mom’s Visa gift cards to order colognes online, then hide the bottles in a pile of clothes so no one would find them. It wasn’t that I’d stolen anything—I was just afraid of the disapproving look I knew I’d get. In my family, school always came first. Being Asian in America meant keeping your head down, working hard, and choosing a safe path. Perfume didn’t fit into that plan, so I kept my love for it quiet.` },
    { title: 'Turning Point', text: "Now I’m studying at an Ivy League school, and for the first time, I have the resources (and the nerve) to make it real. Daze brings Chinese‑inspired gourmand scents to the American market—sweet, savory, spicy, warm." },
    { title: 'For Everyone', text: "All of our scents are unisex, because memories are universal. They belong to anyone who’s ever caught a smell in the air and been taken back to a time, a place, or a feeling they thought they’d forgotten." },
  ]

  // Shifted image mapping: hero uses founder1, then sections get the next images, last is placeholder
  const shiftedImages: (string | null)[] = [null, null, null, null]

  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Reveal-on-scroll
    const items = Array.from(container.querySelectorAll('.reveal')) as HTMLElement[]
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) (e.target as HTMLElement).classList.add('in-view') })
    }, { threshold: 0.15 })
    items.forEach(el => obs.observe(el))

    // Lightweight parallax for elements with data-parallax
    const parallaxEls = Array.from(container.querySelectorAll('[data-parallax]')) as HTMLElement[]
    parallaxEls.forEach(el => { el.style.willChange = 'transform' })

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight
        parallaxEls.forEach(el => {
          const speedAttr = el.getAttribute('data-speed')
          const speed = speedAttr ? parseFloat(speedAttr) : 0.06
          const rect = el.getBoundingClientRect()
          const centerDelta = (rect.top + rect.height / 2) - (vh / 2)
          const translateY = Math.max(-60, Math.min(60, centerDelta * speed))
          el.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`
        })
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      obs.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <Header />

      {/* Dreamy fog background (no media) */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-sleep-fog" />

      <main ref={containerRef} className="relative z-0">
        {/* Hero with image */}
        <section className="pt-28 pb-16">
          <div className="container-custom max-w-5xl px-4">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center reveal">
              <div className="md:order-2">
                <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Our Story</h1>
                <p className="text-white/80 text-lg">From steamed rice and boba tea to mooncakes and midnight snacks, Daze bottles the cravings and comforts of home. Our founder, Alex Jason Li—a Chinese‑American kid who’s always sniffing everything—turned his love of unique smells into a gourmand perfume house. Every fragrance is a little taste of his memories that everyone is welcome to enjoy.</p>
              </div>
              <div className="md:order-1">
                <div className="relative aspect-[4/3] md:aspect-[5/4] w-full overflow-hidden rounded-3xl border border-white/10 bg-sleep-fog" />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="pb-24">
          <div className="container-custom max-w-5xl px-4">
            <div className="relative">
              {/* vertical guideline */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />

              {sections.map((s, i) => {
                const isEven = i % 2 === 0
                const img = shiftedImages[i]
                return (
                  <article key={i} className="grid md:grid-cols-2 gap-10 items-center md:gap-16 py-16 md:py-24 reveal">
                    {/* Text */}
                    <div className={`${isEven ? '' : 'md:order-2'}`}>
                      <div className="flex items-baseline space-x-4 mb-4" data-parallax data-speed="-0.06">
                        <span className="text-4xl md:text-5xl font-serif font-bold text-white/70 leading-none">{i + 1}.</span>
                        <h2 className="text-2xl md:text-3xl font-serif font-semibold">{s.title}</h2>
                      </div>
                      <p className="text-white/85 text-lg leading-relaxed" data-parallax data-speed="-0.05">
                        {s.text}
                      </p>
                    </div>

                    {/* Placeholder card (no media) */}
                    <div className={`${isEven ? 'md:order-2' : ''}`} data-parallax data-speed="0.08">
                      <div className="relative aspect-[4/3] md:aspect-[5/4] w-full overflow-hidden rounded-3xl border border-white/10 bg-sleep-fog grid place-items-center">
                        <span className="text-white/60">A gentle fog rolls in</span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* CTA */}
            <div className="pt-8 md:pt-2 pb-24 flex items-center justify-center reveal">
              <a href="/collection" className="btn-outline-light inline-block">Shop Collection</a>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <style jsx global>{`
        .reveal { opacity: 0; transform: translateY(18px); transition: opacity 600ms ease, transform 700ms cubic-bezier(0.19,1,0.22,1); }
        .reveal.in-view { opacity: 1; transform: translateY(0); }
      `}</style>
    </>
  )
} 