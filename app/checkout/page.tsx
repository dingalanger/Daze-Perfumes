'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

function getCart() {
  if (typeof window === 'undefined') return [] as any[]
  try { return JSON.parse(localStorage.getItem('cart') || '[]') } catch { return [] }
}

export default function CheckoutPage() {
  const handleCheckout = async () => {
    const items = getCart()
    const res = await fetch('/api/checkout/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items }) })
    if (!res.ok) return
    const { url } = await res.json()
    if (url) window.location.href = url
  }

  const items = getCart()
  const subtotal = items.reduce((s: number, i: any) => s + i.price * (i.quantity || 1), 0)

  return (
    <main className="min-h-screen pt-20 bg-daze-silk">
      <Header />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart summary (main) */}
            <div className="lg:col-span-2 bg-white p-8 border border-daze-cream rounded-lg">
              <h1 className="text-3xl font-serif font-bold text-daze-charcoal mb-6">Your Cart</h1>
              {items.length === 0 ? (
                <p className="text-daze-charcoal/70">Your cart is empty. Add items from the collection.</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between border-b border-daze-cream pb-4">
                      <div>
                        <p className="font-medium text-daze-charcoal">{item.name}</p>
                        <p className="text-sm text-daze-charcoal/70">Qty {item.quantity || 1}</p>
                      </div>
                      <span className="font-medium text-daze-charcoal">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <aside className="bg-white p-8 border border-daze-cream rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Order summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t border-daze-cream pt-4 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
              <button type="button" onClick={handleCheckout} className="btn-primary w-full mt-6">Check out</button>
              <p className="text-xs text-daze-charcoal/60 mt-2">Payments handled by Stripe. You’ll enter your information on the secure Stripe page.</p>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 
