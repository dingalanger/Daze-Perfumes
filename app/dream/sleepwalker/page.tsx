"use client"

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function SleepwalkerPreview() {
  return (
    <main className="min-h-screen bg-transparent">
      <Header />
      <section className="pt-28 md:pt-32 section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif">Sleepwalker Club</h1>
            <p className="mt-4 text-daze-white/80">Free to join. Entry opens on certain nights between <strong>3am–5am</strong>.</p>
          </div>

          <div className="mt-10 max-w-xl mx-auto card-gold-special p-6 rounded-xl">
            <JoinForm />
          </div>

          <div className="mt-12 text-center">
            <Link href="/dream/sleepwalker/drops" className="btn-secondary">Check drops</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

function JoinForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        try {
          const form = e.currentTarget as HTMLFormElement
          const formData = new FormData(form)
          const email = String(formData.get('email') || '').trim()
          if (!email) return
          const key = 'sleepwalker_members'
          const existingRaw = localStorage.getItem(key)
          const existing = existingRaw ? (JSON.parse(existingRaw) as string[]) : []
          if (!existing.includes(email)) existing.push(email)
          localStorage.setItem(key, JSON.stringify(existing))
          localStorage.setItem('sleepwalker_member', 'true')
          alert('Added to Sleepwalker Club. Welcome.')
          form.reset()
        } catch {}
      }}
      className="space-y-4"
    >
      <div className="text-left">
        <label htmlFor="email" className="block text-sm text-daze-white/80">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@nightmail.com"
          className="mt-1 w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-daze-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-vi-fog-lavender"
        />
      </div>
      <button type="submit" className="btn-primary w-full">Join</button>
      <p className="text-xs text-daze-white/60">We’ll only email about Sleepwalker windows and micro-drops.</p>
    </form>
  )
}


