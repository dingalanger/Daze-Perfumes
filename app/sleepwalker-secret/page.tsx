'use client'

import { useEffect, useMemo, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function isWithinWindow(date: Date) {
  const start = new Date(date)
  start.setHours(3, 0, 0, 0)
  const end = new Date(date)
  end.setHours(5, 0, 0, 0)
  return date >= start && date <= end
}

export default function SleepwalkerSecret() {
  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const open = useMemo(() => isWithinWindow(now), [now])

  return (
    <main className="min-h-screen bg-transparent">
      <Header />
      <section className="pt-28 md:pt-32 section-padding">
        <div className="container-custom">
          {!open && (
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-serif">Looking for something?</h1>
              <p className="mt-4 text-white/70">Come back between 3–5am. If you know, you know.</p>
            </div>
          )}

          {open && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-serif">Sleepwalker’s Club</h1>
                <p className="mt-3 text-white/80">Exclusive access to experiments and micro‑drops.</p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  try {
                    const form = e.currentTarget as HTMLFormElement
                    const fd = new FormData(form)
                    const email = String(fd.get('email') || '').trim()
                    if (!email) return
                    const key = 'sleepwalker_members'
                    const raw = localStorage.getItem(key)
                    const arr = raw ? (JSON.parse(raw) as string[]) : []
                    if (!arr.includes(email)) arr.push(email)
                    localStorage.setItem(key, JSON.stringify(arr))
                    localStorage.setItem('sleepwalker_member', 'true')
                    alert('Welcome to the Sleepwalker’s Club.')
                    form.reset()
                  } catch {}
                }}
                className="mt-10 card-gold-special p-6 rounded-xl space-y-4"
              >
                <div>
                  <label htmlFor="email" className="block text-sm text-white/80">Email</label>
                  <input id="email" name="email" type="email" required placeholder="you@nightmail.com" className="mt-1 w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30" />
                </div>
                <button type="submit" className="btn-outline-light w-full">Join</button>
                <p className="text-xs text-white/60">We’ll email only when the fog rolls in.</p>
              </form>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}


