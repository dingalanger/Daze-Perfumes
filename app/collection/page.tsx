'use client'

import React, { useMemo, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
// media removed
import { Crown } from 'lucide-react'
import { products as allProducts } from '@/lib/products'

function addToCart(item: { id: string; name: string; price: number; quantity?: number }) {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('cart') : null
  const cart = stored ? JSON.parse(stored) : []
  const idx = cart.findIndex((i: any) => i.id === item.id && i.name === item.name)
  if (idx >= 0) cart[idx].quantity = (cart[idx].quantity || 1) + (item.quantity || 1)
  else cart.push({ id: item.id, name: item.name, price: item.price, quantity: item.quantity || 1 })
  localStorage.setItem('cart', JSON.stringify(cart))
  window.dispatchEvent(new Event('cart:update'))
  window.dispatchEvent(new Event('cart:add'))
}

function showToast(message: string) {
  const el = document.createElement('div')
  el.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded shadow-lg transition-opacity duration-700 opacity-0 z-[100]'
  el.textContent = message
  document.body.appendChild(el)
  requestAnimationFrame(() => { el.classList.remove('opacity-0') })
  setTimeout(() => { el.classList.add('opacity-0'); setTimeout(() => el.remove(), 700) }, 1500)
}

export default function CollectionPage() {
  const [filter, setFilter] = useState<'all' | 'Signature' | 'Zodiac'>('all')

  const products = useMemo(() => {
    if (filter === 'all') return allProducts
    return allProducts.filter(p => p.category === filter)
  }, [filter])

  return (
    <main className="min-h-screen pt-20 bg-transparent">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-daze-white mb-6">Our <span className="text-daze-white">Collection</span></h1>
            <p className="text-xl text-daze-white/70 max-w-3xl mx-auto mb-8">Curated scents from the fog. Minimal, calm, a little surreal.</p>
          </div>
        </div>
      </section>

      {/* Collection Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Filter Bar */}
          <div className="flex items-center space-x-4 mb-12">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-none transition-colors duration-300 ${filter==='all' ? 'bg-daze-fog text-daze-black' : 'bg-transparent border border-daze-fog text-daze-fog hover:bg-daze-fog hover:text-daze-black'}`}>All</button>
            <button onClick={() => setFilter('Signature')} className={`px-4 py-2 rounded-none transition-colors duration-300 ${filter==='Signature' ? 'bg-daze-fog text-daze-black' : 'bg-transparent border border-daze-fog text-daze-fog hover:bg-daze-fog hover:text-daze-black'}`}>Signature</button>
            <button onClick={() => setFilter('Zodiac')} className={`px-4 py-2 rounded-none transition-colors duration-300 ${filter==='Zodiac' ? 'bg-daze-lavender text-daze-black' : 'bg-transparent border border-daze-lavender text-daze-lavender hover:bg-daze-lavender hover:text-daze-black'}`}>Zodiac</button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => {
              const isStallion = product.name === 'Stallion'
              return (
                <div key={product.id} className="group animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`relative rounded-lg overflow-hidden card-hover border border-white/10 ${isStallion ? 'card-gold-special' : 'bg-sleep-fog'}`}>
                    <Link href={`/product/${product.slug}`} className="block relative h-80 grid place-items-center">
                      <div className="text-center">
                        <div className="text-sm uppercase tracking-widest text-daze-white/60">Vial</div>
                        <div className="mt-2 text-2xl font-serif text-daze-white">{product.name}</div>
                      </div>
                    </Link>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      {isStallion && <Crown size={16} className="text-daze-fog drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />}
                      <span className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${isStallion ? 'badge-gold-minimal shadow-[0_2px_8px_rgba(0,0,0,0.3)]' : 'bg-black/30 text-daze-white border border-white/20'}`}>
                        {isStallion ? 'Zodiac — Limited Edition' : product.category}
                      </span>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="mb-2">
                        <h3 className="text-lg font-semibold text-daze-white"><Link href={`/product/${product.slug}`}>{product.name}</Link></h3>
                      </div>

                      <p className="text-sm text-daze-white/70 mb-4 line-clamp-2">{product.shortDescription}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-xl font-semibold text-daze-white">$120</span>
                        <button className="btn-secondary" onClick={() => { addToCart({ id: product.id, name: product.name, price: product.price }); showToast('Preorder added to cart') }}>Preorder now</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 