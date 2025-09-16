'use client'

import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
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
  const product = allProducts[0]

  return (
    <main className="min-h-screen pt-20 bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Dreamy lighting backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-white/5 blur-3xl animate-float" />
          <div className="absolute top-20 -right-40 w-[480px] h-[480px] rounded-full bg-white/4 blur-3xl animate-float-delayed" />
          <div className="absolute bottom-[-200px] left-1/3 w-[700px] h-[700px] rounded-full bg-white/6 blur-3xl animate-float-slow" />
        </div>
        <div className="container-custom">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">The One</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">A single star in the fog. Minimal, surreal, unmistakably DAZE.</p>
          </div>
        </div>
      </section>
      {/* Single Star Product */}
      <section className="relative section-padding">
        <div className="container-custom">
          <div className="relative max-w-5xl mx-auto">
            {/* Animated light rings */}
            <div className="absolute -inset-8 -z-10">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-white/10 animate-ping-slow" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full border border-white/10 animate-ping-slower" />
              <style jsx>{`
                @keyframes pingSlow { 0% { opacity: .25; transform: translate(-50%,-50%) scale(.9)} 70% { opacity:.06 } 100% { opacity:0; transform: translate(-50%,-50%) scale(1.15)} }
                .animate-ping-slow { animation: pingSlow 6s ease-out infinite; }
                .animate-ping-slower { animation: pingSlow 8s ease-out infinite; }
              `}</style>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Visual */}
              <div className="relative order-2 md:order-1">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-white/0">
                  <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_20%,rgba(255,255,255,0.12),transparent),radial-gradient(30%_30%_at_80%_80%,rgba(255,255,255,0.1),transparent)]" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="w-48 h-64 bg-white/80 rounded-xl shadow-2xl" />
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="order-1 md:order-2">
                <h2 className="text-4xl md:text-5xl font-serif text-white">{product.name}</h2>
                <p className="mt-4 text-white/70 text-lg">{product.longDescription}</p>
                <div className="mt-6 flex items-center gap-4">
                  <span className="text-2xl font-semibold text-white">${product.price}</span>
                  <Link href={`/product/${product.slug}`} className="btn-outline-light">Explore</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 