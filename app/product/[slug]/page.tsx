import { products } from '@/lib/products'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

function addToCart(item: { id: string; name: string; price: number; quantity?: number }) {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('cart') : null
  const cart = stored ? JSON.parse(stored) : []
  const idx = cart.findIndex((i: any) => i.id === item.id)
  if (idx >= 0) cart[idx].quantity = (cart[idx].quantity || 1) + (item.quantity || 1)
  else cart.push({ id: item.id, name: item.name, price: item.price, quantity: item.quantity || 1 })
  localStorage.setItem('cart', JSON.stringify(cart))
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('cart:update'))
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug)
  if (!product) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Not found</div>

  return (
    <main className="min-h-screen bg-black">
      <Header />

      <section className="section-padding">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Placeholder image */}
          <div className="bg-neutral-900 border border-white/10 rounded-lg aspect-[4/5] flex items-center justify-center">
            <div className="text-center">
              <div className="w-40 h-56 mx-auto bg-white/10 border border-white/20 rounded-md mb-4" />
              <p className="text-white/60 text-sm">Image coming soon</p>
            </div>
          </div>

          {/* Product info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">{product.name} Eau De Parfum</h1>
            <p className="text-white/80 mb-6">${product.price}.00</p>

            {/* Size and quantity (visual only) */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-white/60 mb-2">Size</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white text-black">50ml</button>
                  <button className="px-4 py-2 border border-white/20 text-white">100ml</button>
                </div>
              </div>
              <div>
                <p className="text-sm text-white/60 mb-2">Quantity</p>
                <div className="flex">
                  <input className="w-20 bg-neutral-900 border border-white/20 text-white px-3 py-2" defaultValue={1} id="qty" />
                </div>
              </div>
            </div>

            <button
              className="w-full btn-outline-light mb-4"
              onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1 })}
            >
              Add to cart
            </button>

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