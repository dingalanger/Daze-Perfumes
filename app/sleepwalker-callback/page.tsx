'use client'

import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase'
import Link from 'next/link'

export default function SleepwalkerCallback() {
  const [ok, setOk] = useState<boolean | null>(null)

  useEffect(() => {
    const run = async () => {
      const supabase = getSupabaseClient()
      const { data: { session } } = await supabase.auth.getSession()
      setOk(!!session)
      if (session) {
        try { localStorage.setItem('sleepwalker_member', 'true') } catch {}
      }
    }
    run()
  }, [])

  if (ok === null) return null
  return ok ? (
    <div className="min-h-screen grid place-items-center text-center p-8">
      <div>
        <h1 className="text-3xl font-serif">Welcome to the Sleepwalker’s Club</h1>
        <p className="mt-2 text-white/70">You’re verified.</p>
        <Link href="/" className="btn-outline-light mt-6 inline-block">Enter</Link>
      </div>
    </div>
  ) : (
    <div className="min-h-screen grid place-items-center text-center p-8">
      <div>
        <h1 className="text-3xl font-serif">Verification failed</h1>
        <Link href="/" className="btn-outline-light mt-6 inline-block">Back home</Link>
      </div>
    </div>
  )
}


