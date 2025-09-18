'use client'

import { useEffect, useMemo, useState } from 'react'
import Header from '@/components/Header'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase'

function isWithinWindow(date: Date) {
  const hour = date.getHours()
  // Accessible from 8pm–5am local time
  return hour >= 20 || hour < 5
}

export default function SleepwalkerSecret() {
  const [now, setNow] = useState<Date>(new Date())
  const router = useRouter()

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const open = useMemo(() => isWithinWindow(now), [now])

  useEffect(() => {
    if (!open) {
      const id = setTimeout(() => router.push('/'), 4000)
      return () => clearTimeout(id)
    }
  }, [open, router])

  return (
    <main className="min-h-screen bg-transparent">
      <Header />
      <section className="pt-28 md:pt-32 section-padding">
        <div className="container-custom">
          {!open && (
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-serif">Looking for something?</h1>
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
                    const supabase = getSupabaseClient()
                    await supabase.auth.signInWithOtp({
                      email,
                      options: {
                        emailRedirectTo: `${window.location.origin}/sleepwalker-callback`
                      }
                    })
                    // Toast: instruct to check email
                    try {
                      const el = document.createElement('div')
                      el.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded shadow-lg transition-opacity duration-500 opacity-0 z-[1000]'
                      el.textContent = 'Check your email to confirm.'
                      document.body.appendChild(el)
                      requestAnimationFrame(() => { el.classList.remove('opacity-0') })
                      setTimeout(() => { el.classList.add('opacity-0'); setTimeout(() => el.remove(), 500) }, 2000)
                    } catch {}
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
      {/* Footer removed per request */}
    </main>
  )
}


