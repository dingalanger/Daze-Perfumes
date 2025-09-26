'use client'

import { useState } from 'react'
import { products } from '@/lib/products'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

type CartItem = { id: string; name: string; price: number; quantity?: number }

function writeCartItem(item: CartItem) {
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

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug)
  const [size, setSize] = useState<'50ml' | '100ml'>('50ml')
  const [qty, setQty] = useState<number>(1)
  if (!product) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Not found</div>

  const price = size === '100ml' ? 150 : product.price

  const add = () => {
    writeCartItem({ id: product.id, name: `${product.name} ${size}`, price, quantity: qty })
    showToast(`${product.name} preorder added to cart`)
  }

  return (
    <main className="min-h-screen bg-black pt-20">
      <Header />

      <section className="section-padding">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product image */}
          <div className="relative bg-neutral-900 border border-white/10 rounded-lg aspect-[4/5] overflow-hidden">
            {(
              <Image
                src={product.slug === 'pear' ? '/images/Daze Mock1.png' : product.image}
                alt={product.name}
                fill
                className="object-contain p-6"
              />
            )}
          </div>

          {/* Product info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">{product.name} Eau De Parfum</h1>
            <p className="text-white/80 mb-6">${price}.00</p>

            {/* Size and quantity */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-white/60 mb-2">Size</p>
                <div className="flex gap-2">
                  <button onClick={() => setSize('50ml')} className={`px-4 py-2 ${size==='50ml' ? 'bg-white text-black' : 'border border-white/20 text-white'}`}>50ml</button>
                  <button onClick={() => setSize('100ml')} className={`px-4 py-2 ${size==='100ml' ? 'bg-white text-black' : 'border border-white/20 text-white'}`}>100ml</button>
                </div>
              </div>
              <div>
                <p className="text-sm text-white/60 mb-2">Quantity</p>
                <div className="flex">
                  <input className="w-20 bg-neutral-900 border border-white/20 text-white px-3 py-2" value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || '1')))} />
                </div>
              </div>
            </div>

            <button className="w-full btn-outline-light mb-4" onClick={add}>Preorder now</button>

            <p className="text-white/80 mb-8">Arrives soon — shipping included</p>

            <div className="prose prose-invert max-w-none">
              <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
              <p className="text-white/80 mb-6">{product.longDescription}</p>

              <h3 className="text-lg font-semibold text-white mb-3">Notes</h3>
              <ul className="list-disc pl-6 text-white/80">
                {product.notes.map(n => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 text-sm text-white/60">
              <Link href="/collection" className="underline">Back to collection</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 