import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Star, Heart, ShoppingBag, Filter, Crown, Sparkles } from 'lucide-react'

const allProducts = [
  { id: 1, name: 'Pear', description: 'Juicy Asian pear with a crisp, cool sparkle and soft musk.', price: 95, category: 'Signature', rating: 4.9, reviews: 127, notes: ['Asian Pear', 'Lily', 'White Musk', 'Aqua'] },
  { id: 2, name: 'Boba Tea', description: 'Milky black tea with brown sugar pearls and vanilla cream.', price: 110, category: 'Signature', rating: 4.8, reviews: 89, notes: ['Black Tea', 'Brown Sugar', 'Vanilla', 'Milk'] },
  { id: 3, name: 'Steamed Rice', description: 'Warm steamed jasmine rice with a soft, comforting aura.', price: 89, category: 'Signature', rating: 4.7, reviews: 156, notes: ['Jasmine Rice', 'Clean Musk', 'Rice Steam', 'Warmth'] },
  { id: 4, name: 'Stallion', description: 'Year of the Horse limited edition. Dark leather, osmanthus, and amber.', price: 120, category: 'Zodiac', rating: 5.0, reviews: 12, notes: ['Osmanthus', 'Leather', 'Amber', 'Saffron'] },
]

export default function CollectionPage() {
  return (
    <main className="min-h-screen pt-20 bg-black">
      <Header />
      
      {/* Video Section - Space for future video */}
      <section className="relative h-80 bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-800 to-black"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-white/50 text-sm mb-2">Video Coming Soon</p>
            <div className="w-16 h-16 border-2 border-white/20 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="bg-black py-20">
        <div className="container-custom">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              Our <span className="text-white">Collection</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Discover our curated selection of four signature creations, including the limited edition Year of the Horse release.
            </p>
          </div>
        </div>
      </section>

      {/* Collection Grid */}
      <section className="section-padding bg-black">
        <div className="container-custom">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <button className="px-4 py-2 bg-white text-black rounded-none hover:bg-white/90 transition-colors duration-300">All</button>
              <button className="px-4 py-2 bg-transparent border border-white text-white rounded-none hover:bg-white hover:text-black transition-colors duration-300">Signature</button>
              <button className="px-4 py-2 bg-transparent border border-daze-gold text-daze-gold rounded-none hover:bg-daze-gold hover:text-black transition-colors duration-300">Zodiac</button>
            </div>
            <div className="flex items-center space-x-2 text-white/60">
              <Filter size={16} />
              <span className="text-sm">Sort by: Featured</span>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {allProducts.map((product, index) => {
              const isStallion = product.name === 'Stallion'
              return (
                <div
                  key={product.id}
                  className="group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`relative rounded-lg overflow-hidden card-hover border border-white/10 ${isStallion ? 'card-gold-special' : 'bg-neutral-900'}`}>
                    {/* Product Image */}
                    <div className={`relative h-80 ${isStallion ? 'bg-neutral-900' : 'bg-neutral-800'}`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-32 h-32 ${isStallion ? 'bg-white/10 border-white/30' : 'bg-white/10 border-white/20'} rounded-full flex items-center justify-center border`}>
                          <span className="text-white text-2xl font-cursive">{product.name.split(' ')[0]}</span>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white text-white hover:text-black transition-colors duration-300">
                          <Heart size={16} />
                        </button>
                        <button className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white text-white hover:text-black transition-colors duration-300">
                          <ShoppingBag size={16} />
                        </button>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        {isStallion && <Crown size={16} className="text-daze-gold" />}
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${isStallion ? 'badge-gold-metallic' : 'bg-white/10 text-white'} border border-white/20`}>
                          {isStallion ? 'Zodiac — Limited Edition' : product.category}
                        </span>
                      </div>

                      {isStallion && (
                        <div className="absolute -top-6 -right-6 rotate-12 text-daze-gold/70">
                          <Sparkles size={40} />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star size={16} className="text-white fill-current" />
                          <span className="text-sm text-white/70">{product.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-white/60 mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      
                      {/* Fragrance Notes */}
                      <div className="mb-4">
                        <p className="text-xs text-white/50 mb-2">Notes:</p>
                        <div className="flex flex-wrap gap-1">
                          {product.notes.map((note, idx) => (
                            <span key={idx} className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded border border-white/20">
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-semibold text-white">
                          ${product.price}
                        </span>
                        <span className="text-xs text-white/50">
                          {product.reviews} reviews
                        </span>
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