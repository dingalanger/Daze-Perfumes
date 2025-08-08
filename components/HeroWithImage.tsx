'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function HeroWithImage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image Background */}
      <div className="absolute inset-0">
        <img
          src="/images/chinese-pine-trees.jpg"
          alt="Chinese Pine Trees"
          className="w-full h-full object-cover"
          loading="eager"
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4">
              <span className="text-gradient">Daze</span>
            </h1>
            <div className="flex items-center justify-center space-x-2 text-daze-gold mb-6">
              <Sparkles size={16} />
              <span className="text-sm font-medium text-white">LUXURY GOURMAND & CHINESE-INSPIRED FRAGRANCES</span>
              <Sparkles size={16} />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up">
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
          <div className="mt-16 flex items-center justify-center space-x-8 text-sm text-white/80 animate-fade-in-delayed">
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
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in-slow">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
} 