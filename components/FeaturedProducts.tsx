'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { products as featuredProducts } from '@/lib/products'

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

export default function FeaturedProducts() {
  const product = featuredProducts[0]
  const marqueeRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = marqueeRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / rect.width
      const dy = (e.clientY - cy) / rect.height
      el.style.setProperty('--tx', `${dx * 8}px`)
      el.style.setProperty('--ty', `${dy * 8}px`)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const mockSrc = '/images/Daze Mock1.png'

  return (
    <section className="section-padding bg-black">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">Featured</h2>
          <p className="text-white/70">One scent in focus.</p>
        </div>

        <div ref={marqueeRef} className="relative max-w-6xl mx-auto">
          {/* Lighting canvas */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-28 -left-32 w-[520px] h-[520px] rounded-full bg-white/6 blur-3xl animate-float" />
            <div className="absolute top-10 -right-24 w-[420px] h-[420px] rounded-full bg-white/5 blur-3xl animate-float-delayed" />
            <div className="absolute bottom-[-160px] left-1/3 w-[620px] h-[620px] rounded-full bg-white/7 blur-3xl animate-float-slow" />
          </div>

          {/* Marquee card */}
          <div className="relative grid md:grid-cols-2 gap-10 items-center rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-8 overflow-hidden">
            <div className="absolute inset-0 opacity-30" style={{ transform: 'translate(var(--tx,0), var(--ty,0))' }}>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
                <Image src={mockSrc} alt={product?.name || 'Product'} fill className="object-cover opacity-90" />
              </div>
            </div>

            {/* Copy */}
            <div>
              <h3 className="text-4xl md:text-5xl font-serif text-white">{product?.name}</h3>
              <p className="mt-4 text-white/70 text-lg">{product?.longDescription}</p>
              <div className="mt-6 flex items-center gap-4">
                <span className="text-2xl font-semibold text-white">${product?.price}</span>
                <Link href={`/product/${product?.slug}`} className="btn-outline-light">Explore</Link>
                <button className="btn-light" onClick={() => { addToCart({ id: product!.id, name: product!.name, price: product!.price }); showToast('Preorder added to cart') }}>Preorder</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 