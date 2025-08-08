'use client'

import React from 'react'
import Link from 'next/link'
import { Star, Heart, ShoppingBag, Crown, Sparkles } from 'lucide-react'

const featuredProducts = [
  { id: 1, name: 'Pear', description: 'Juicy Asian pear with a crisp, cool sparkle and soft musk.', price: 95, image: '/api/placeholder/400/500', category: 'Signature', rating: 4.9, reviews: 127 },
  { id: 2, name: 'Boba Tea', description: 'Milky black tea with brown sugar pearls and vanilla cream.', price: 110, image: '/api/placeholder/400/500', category: 'Signature', rating: 4.8, reviews: 89 },
  { id: 3, name: 'Steamed Rice', description: 'Warm steamed jasmine rice with a soft, comforting aura.', price: 89, image: '/api/placeholder/400/500', category: 'Signature', rating: 4.7, reviews: 156 },
  { id: 4, name: 'Stallion', description: 'Year of the Horse limited edition. Dark leather, osmanthus, and amber.', price: 120, image: '/api/placeholder/400/500', category: 'Zodiac', rating: 5.0, reviews: 12 },
]

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
                  <div className={`relative h-80 ${isStallion ? 'bg-neutral-900' : 'bg-neutral-800'}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-32 h-32 ${isStallion ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/10'} border rounded-full flex items-center justify-center`}>
                        <span className="text-white text-xl font-serif font-semibold">{product.name.split(' ')[0]}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white text-black transition-colors duration-300"><Heart size={16} /></button>
                      <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white text-black transition-colors duration-300"><ShoppingBag size={16} /></button>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      {isStallion && <Crown size={16} className="text-daze-gold" />}
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${isStallion ? 'badge-gold-metallic' : 'bg-white/10 text-white'}`}>
                        {isStallion ? 'Zodiac — Limited Edition' : product.category}
                      </span>
                    </div>

                    {isStallion && (
                      <div className="absolute -top-6 -right-6 rotate-12 text-daze-gold/70">
                        <Sparkles size={40} />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                      <div className="flex items-center space-x-1"><Star size={16} className="text-white" /><span className="text-sm text-white/70">{product.rating}</span></div>
                    </div>
                    <p className="text-sm text-white/70 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold text-white">${product.price}</span>
                      <span className="text-xs text-white/50">{product.reviews} reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12 animate-slide-up-delayed">
          <Link href="/collection" className="btn-outline-light">View All Fragrances</Link>
        </div>
      </div>
    </section>
  )
} 