'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type CartItem = { id: string; name: string; price: number; quantity?: number }

function readCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem('cart') || '[]') } catch { return [] }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(items))
  window.dispatchEvent(new Event('cart:update'))
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    setItems(readCart())
    const handler = () => setItems(readCart())
    window.addEventListener('cart:update', handler)
    return () => window.removeEventListener('cart:update', handler)
  }, [])

  const removeItem = (target: CartItem) => {
    const next = readCart().filter(i => !(i.id === target.id && i.name === target.name))
    writeCart(next)
    setItems(next)
  }

  const setQuantity = (target: CartItem, qty: number) => {
    const next = [...readCart()]
    const idx = next.findIndex(i => i.id === target.id && i.name === target.name)
    if (idx >= 0) {
      next[idx].quantity = Math.max(1, Math.floor(qty || 1))
      writeCart(next)
      setItems(next)
    }
  }

  const changeQuantity = (target: CartItem, delta: number) => {
    const next = [...readCart()]
    const idx = next.findIndex(i => i.id === target.id && i.name === target.name)
    if (idx >= 0) {
      const current = next[idx].quantity || 1
      next[idx].quantity = Math.max(1, current + delta)
      writeCart(next)
      setItems(next)
    }
  }

  const subtotal = items.reduce((s, i) => s + i.price * (i.quantity || 1), 0)

  return (
    <main className="min-h-screen pt-20 bg-black">
      <Header />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart summary (main) */}
            <div className="lg:col-span-2 bg-neutral-950 p-8 border border-white/10 rounded-lg">
              <h1 className="text-3xl font-serif font-bold text-white mb-6">Your Preorder</h1>
              {items.length === 0 ? (
                <p className="text-white/70">Your cart is empty. Add items from the collection.</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id+item.name} className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <p className="font-medium text-white">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-white/50">Qty</span>
                          <button aria-label="Decrease" className="px-2 py-1 border border-white/20 text-white/80 hover:text-white" onClick={() => changeQuantity(item, -1)}>-</button>
                          <input
                            type="number"
                            min={1}
                            value={item.quantity || 1}
                            onChange={(e) => setQuantity(item, parseInt(e.target.value || '1'))}
                            className="w-16 bg-neutral-900 border border-white/20 text-white text-center px-2 py-1"
                          />
                          <button aria-label="Increase" className="px-2 py-1 border border-white/20 text-white/80 hover:text-white" onClick={() => changeQuantity(item, 1)}>+</button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="text-sm text-white/60 hover:text-white underline" onClick={() => removeItem(item)}>Remove</button>
                        <span className="font-medium text-white">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <aside className="bg-neutral-950 p-8 border border-white/10 rounded-lg">
              <h2 className="text-lg font-semibold text-white mb-4">Preorder summary</h2>
              <div className="space-y-4 text-white/80">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Shipping</span>
                  <span className="text-white">$0.00</span>
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between font-semibold">
                  <span className="text-white">Total</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
              </div>
              <button type="button" onClick={async () => {
                const res = await fetch('/api/checkout/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items }) })
                if (!res.ok) return
                const { url } = await res.json()
                if (url) window.location.href = url
              }} className="btn-primary w-full mt-6">Preorder</button>
              <p className="text-xs text-white/50 mt-2">Payments handled by Stripe. You’ll enter your information on the secure Stripe page.</p>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 
