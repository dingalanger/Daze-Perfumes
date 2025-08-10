'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Chinese Tree Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-daze-silk via-white to-daze-cream">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-96 bg-gradient-to-b from-daze-jade/30 to-transparent rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-b from-daze-gold/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-b from-daze-rose/10 to-transparent rounded-full blur-3xl animate-float-slow"></div>
        </div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-daze-charcoal mb-4">
              <span className="text-gradient">Daze</span>
            </h1>
            <div className="flex items-center justify-center space-x-2 text-daze-gold mb-6">
              <Sparkles size={16} />
              <span className="text-sm font-medium">LUXURY GOURMAND & CHINESE-INSPIRED FRAGRANCES</span>
              <Sparkles size={16} />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-daze-charcoal/70 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up">
            Discover the art of luxury perfumery where gourmand delights meet 
            the elegance of Chinese tradition. Each fragrance tells a story.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up-delayed">
            <Link href="/collection" className="btn-primary group">
              Explore Collection
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link href="/about" className="btn-secondary">
              Our Story
            </Link>
          </div>

          {/* Floating Elements */}
          <div className="mt-16 flex items-center justify-center space-x-8 text-sm text-daze-charcoal/60 animate-fade-in-delayed">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-daze-gold rounded-full"></div>
              <span>Artisanal Craftsmanship</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-daze-gold rounded-full"></div>
              <span>Luxury Ingredients</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-daze-gold rounded-full"></div>
              <span>Timeless Elegance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-fade-in-slow text-daze-gold">
        <ChevronDown size={36} className="animate-bounce" />
      </div>
    </section>
  )
} 