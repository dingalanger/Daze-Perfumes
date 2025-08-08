'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CheckoutPage() {
  const handlePayNow = async () => {
    const res = await fetch('/api/checkout/session', { method: 'POST' })
    if (!res.ok) return // optionally show error
    const { url } = await res.json()
    if (url) window.location.href = url
  }

  return (
    <main className="min-h-screen pt-20 bg-daze-silk">
      <Header />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Payment / Shipping Form */}
            <div className="lg:col-span-2 bg-white p-8 border border-daze-cream rounded-lg">
              <h1 className="text-3xl font-serif font-bold text-daze-charcoal mb-6">Checkout</h1>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                {/* Contact */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Contact</h2>
                  <input type="email" placeholder="Email" className="w-full border border-daze-cream p-3 focus:outline-none focus:border-daze-gold" />
                </div>

                {/* Shipping */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Shipping address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input placeholder="First name" className="border border-daze-cream p-3 focus:outline-none focus:border-daze-gold" />
                    <input placeholder="Last name" className="border border-daze-cream p-3 focus:outline-none focus:border-daze-gold" />
                    <input placeholder="Address" className="md:col-span-2 border border-daze-cream p-3 focus:outline-none focus:border-daze-gold" />
                    <input placeholder="City" className="border border-daze-cream p-3 focus:outline-none focus:border-daze-gold" />
                    <input placeholder="Postal code" className="border border-daze-cream p-3 focus:outline-none focus:border-daze-gold" />
                    <input placeholder="Country" className="border border-daze-cream p-3 focus:outline-none focus:border-daze-gold" />
                  </div>
                </div>

                {/* Payment */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Payment</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input placeholder="Cardholder name" className="border border-daze-cream p-3 focus:outline-none focus:border-daze-gold" />
                    <input placeholder="Card number" className="border border-daze-cream p-3 focus:outline-none focus:border-daze-gold" />
                    <input placeholder="MM/YY" className="border border-daze-cream p-3 focus:outline-none focus:border-daze-gold" />
                    <input placeholder="CVC" className="border border-daze-cream p-3 focus:outline-none focus:border-daze-gold" />
                  </div>
                </div>

                <button type="button" onClick={handlePayNow} className="btn-primary w-full">Pay now</button>
                <p className="text-xs text-daze-charcoal/60">This is a demo checkout UI. Connect Stripe for live payments.</p>
              </form>
            </div>

            {/* Order Summary */}
            <aside className="bg-white p-8 border border-daze-cream rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Order summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Golden Orchid (50ml)</span>
                  <span>$120</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>$0</span>
                </div>
                <div className="border-t border-daze-cream pt-4 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>$120</span>
                </div>
              </div>
              <div className="mt-6 text-sm text-daze-charcoal/70">
                <p>Have questions? <Link href="/waitlist" className="underline">Join the waitlist</Link> and we’ll notify you about releases.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 