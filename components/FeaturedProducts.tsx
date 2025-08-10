'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Crown } from 'lucide-react'
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
  return (
    <section className="section-padding bg-black">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Featured Collection</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Discover our most beloved fragrances, each crafted with the finest ingredients and inspired by rich traditions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => {
            const isStallion = product.name === 'Stallion'
            return (
              <div key={product.id} className="group animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`relative rounded-lg overflow-hidden card-hover ${isStallion ? 'card-gold-special' : 'bg-neutral-900'}`}>
                  <Link href={`/product/${product.slug}`} className="block relative h-80 bg-neutral-900">
                    {product.image ? (
                      <Image src={product.image} alt={product.name} fill className={`object-cover opacity-90 transition-opacity group-hover:opacity-100 ${isStallion ? 'object-[50%_78%]' : ''}`} />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-32 h-32 ${isStallion ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/10'} border rounded-full flex items-center justify-center`}>
                          <span className="text-white text-xl font-serif font-semibold">{product.name.split(' ')[0]}</span>
                        </div>
                      </div>
                    )}
                  </Link>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    {isStallion && <Crown size={16} className="text-daze-gold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />}
                    <span className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${isStallion ? 'badge-gold-minimal shadow-[0_2px_8px_rgba(0,0,0,0.3)]' : 'bg-black/70 text-white border border-white/20'}`}>{isStallion ? 'Zodiac — Limited Edition' : product.category}</span>
                  </div>

                  <div className="p-6">
                    <div className="mb-2">
                      <h3 className="text-lg font-semibold text-white"><Link href={`/product/${product.slug}`}>{product.name}</Link></h3>
                    </div>
                    <p className="text-sm text-white/70 mb-4 line-clamp-2">{product.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold text-white">$120</span>
                      <button className="btn-outline-light" onClick={() => { addToCart({ id: product.id, name: product.name, price: product.price }); showToast('Preorder added to cart') }}>Preorder now</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 