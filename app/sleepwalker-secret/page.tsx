'use client'

import { useEffect, useMemo, useState } from 'react'
import Header from '@/components/Header'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase'

function isWithinWindow(_date: Date) {
  // Temporarily open 24/7 for testing
  return true
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
      <section className="relative pt-28 md:pt-32 section-padding overflow-hidden">
        {/* dreamy background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full bg-white/6 blur-3xl animate-float" />
          <div className="absolute top-10 -right-24 w-[420px] h-[420px] rounded-full bg-white/5 blur-3xl animate-float-delayed" />
          <div className="absolute bottom-[-160px] left-1/3 w-[620px] h-[620px] rounded-full bg-white/7 blur-3xl animate-float-slow" />
        </div>
        <div className="container-custom">
          {!open && (
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-serif">Looking for something?</h1>
            </div>
          )}

          {open && (
            <div className="relative max-w-2xl mx-auto">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-serif">Sleepwalker’s Club</h1>
                <p className="mt-3 text-white/80">Exclusive access to experiments and micro‑drops.</p>
              </div>
              <form
                onSubmit={async (e) => {
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
                className="mt-10 rounded-2xl p-6 space-y-4 border border-white/10 bg-gradient-to-b from-white/5 to-transparent shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_40px_120px_rgba(255,255,255,0.08)]"
              >
                <div>
                  <label htmlFor="email" className="block text-sm text-white/80">Email</label>
                  <input id="email" name="email" type="email" required placeholder="you@nightmail.com" className="mt-1 w-full bg-black/30 border border-white/10 rounded-md px-3 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30" />
                </div>
                <button type="submit" className="btn-light w-full">Join</button>
                <p className="text-xs text-white/60">We’ll email only when the fog rolls in.</p>
              </form>

              {/* Or continue with Google */}
              <div className="mt-6 text-center">
                <button
                  onClick={async () => {
                    const supabase = getSupabaseClient()
                    await supabase.auth.signInWithOAuth({
                      provider: 'google',
                      options: { redirectTo: `${window.location.origin}/sleepwalker-callback` }
                    })
                  }}
                  className="btn-outline-light"
                >
                  Continue with Google
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Footer removed per request */}
    </main>
  )
}


