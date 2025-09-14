'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useEffect, useMemo, useState } from 'react'

function isWithinWindow(date: Date) {
  const start = new Date(date)
  start.setHours(3, 0, 0, 0)
  const end = new Date(date)
  end.setHours(5, 0, 0, 0)
  return date >= start && date <= end
}

export default function DropsPage() {
  const [now, setNow] = useState<Date>(new Date())
  const [isMember, setIsMember] = useState<boolean>(false)

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    try { setIsMember(localStorage.getItem('sleepwalker_member') === 'true') } catch {}
    return () => clearInterval(id)
  }, [])

  const open = useMemo(() => isWithinWindow(now), [now])

  return (
    <main className="min-h-screen bg-transparent">
      <Header />
      <section className="pt-28 md:pt-32 section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif">Secret Micro‑Drops</h1>
            <p className="mt-4 text-daze-white/80">Opens nightly from 3:00–5:00 AM (your local time).</p>
          </div>

          {!isMember && (
            <div className="mt-8 max-w-xl mx-auto text-center">
              <p className="text-daze-white/70">Join the Sleepwalker Club to see drops.</p>
              <a href="/sleepwalker" className="btn-secondary mt-4 inline-block">Join the Club</a>
            </div>
          )}

          {isMember && !open && (
            <div className="mt-10 max-w-xl mx-auto card-gold-special p-6 rounded-xl text-center">
              <p className="text-daze-white/80">The fog hasn’t rolled in yet.</p>
              <p className="mt-1 text-sm text-daze-white/60">Come back between 3–5am to glimpse tonight’s oddities.</p>
            </div>
          )}

          {isMember && open && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {[1,2,3].map((i) => (
                <article key={i} className="card-gold-special rounded-xl p-6">
                  <h3 className="font-serif text-2xl">Vial {i}</h3>
                  <p className="mt-2 text-sm text-daze-white/70">One-off 10ml experiment. No notes. No guarantees.</p>
                  <button className="btn-primary mt-4 w-full">Reserve</button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}


