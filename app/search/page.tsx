"use client"

import React, { useMemo, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const demoProducts = [
  { id: 1, name: 'Golden Orchid', notes: ['Vanilla', 'Orchid', 'Amber'] },
  { id: 2, name: 'Jade Garden', notes: ['Green Tea', 'Jasmine', 'Bamboo'] },
  { id: 3, name: 'Silk Road', notes: ['Cardamom', 'Sandalwood', 'Musk'] },
  { id: 4, name: 'Moon Palace', notes: ['Osmanthus', 'Honey', 'White Tea'] },
]

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return demoProducts
    return demoProducts.filter(p => p.name.toLowerCase().includes(q) || p.notes.some(n => n.toLowerCase().includes(q)))
  }, [query])

  return (
    <main className="min-h-screen pt-20 bg-black">
      <Header />
      <section className="section-padding bg-black">
        <div className="container-custom">
          <h1 className="text-4xl font-serif font-bold text-white mb-6">Search</h1>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fragrances, notes..."
            className="w-full max-w-2xl bg-neutral-900 text-white placeholder-white/40 border border-white/10 focus:border-white/40 outline-none px-4 py-3"
          />

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(p => (
              <div key={p.id} className="p-6 border border-white/10 bg-neutral-900 text-white">
                <h3 className="text-lg font-semibold mb-2">{p.name}</h3>
                <p className="text-sm text-white/60">Notes: {p.notes.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
} 