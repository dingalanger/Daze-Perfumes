"use client"

import React, { useMemo, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { products as allProducts } from '@/lib/products'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allProducts
    return allProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.notes.some(n => n.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
    )
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
              <Link key={p.id} href={`/product/${p.slug}`} className="group p-4 border border-white/10 bg-neutral-900 text-white hover:border-white/30 transition-colors">
                <div className="relative h-40 mb-4 bg-neutral-800">
                  {p.image && <Image src={p.image} alt={p.name} fill className="object-cover" />}
                </div>
                <h3 className="text-lg font-semibold mb-1">{p.name}</h3>
                <p className="text-sm text-white/60">Notes: {p.notes.join(', ')}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
} 