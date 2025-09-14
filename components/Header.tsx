'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag, User, Search } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cart')
      if (stored) setCartCount(JSON.parse(stored).reduce((sum: number, i: any) => sum + (i.quantity || 1), 0))
      const handler = () => {
        const s = localStorage.getItem('cart')
        if (s) setCartCount(JSON.parse(s).reduce((sum: number, i: any) => sum + (i.quantity || 1), 0))
        else setCartCount(0)
      }
      const added = () => { setPulse(true); setTimeout(() => setPulse(false), 600) }
      window.addEventListener('cart:update', handler)
      window.addEventListener('cart:add', added)
      return () => { window.removeEventListener('cart:update', handler); window.removeEventListener('cart:add', added) }
    } catch {}
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-daze-black/70 backdrop-blur-md border-b border-white/10">
      <div className="container-custom">
        <div className="grid grid-cols-3 items-center h-20">
          {/* Logo */}
          <div className="justify-self-start">
            <Link href="/" className="inline-flex items-center">
              <span className="font-sans font-extrabold tracking-[0.25em] text-daze-white text-2xl md:text-3xl uppercase">DAZE</span>
            </Link>
          </div>

          {/* Desktop Navigation (centered) */}
          <nav className="hidden md:flex justify-center items-center space-x-10 justify-self-center">
            <Link href="/" className="text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors">Home</Link>
            <Link href="/collection" className="text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors">Collection</Link>
            <Link href="/about" className="text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors">About</Link>
            <Link href="/waitlist" className="text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors">Waitlist</Link>
            <Link href="/sleepwalker" className="text-sm font-medium tracking-wide text-vi-fog-lavender hover:text-vi-muted-jade transition-colors">Sleepwalker Club</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 justify-self-end">
            <Link href="/search" className="p-2 text-white/80 hover:text-white transition-colors duration-300">
              <Search size={20} />
            </Link>
            <Link href="/account" className="p-2 text-white/80 hover:text-white transition-colors duration-300">
              <User size={20} />
            </Link>
            <Link href="/checkout" className={`relative p-2 text-white/80 hover:text-white transition-colors duration-300 ${pulse ? 'animate-ping-once' : ''}`}>
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 bg-white text-black rounded-full">{cartCount}</span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden justify-self-end p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/10">
            <nav className="flex flex-col space-y-4 text-center">
              <Link href="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
              <Link href="/collection" className="text-white/80 hover:text-white transition-colors">Collection</Link>
              <Link href="/about" className="text-white/80 hover:text-white transition-colors">About</Link>
              <Link href="/waitlist" className="text-white/80 hover:text-white transition-colors">Waitlist</Link>
              <Link href="/sleepwalker" className="text-vi-fog-lavender hover:text-vi-muted-jade transition-colors">Sleepwalker Club</Link>
              <Link href="/checkout" className="text-white/80 hover:text-white transition-colors">Cart ({cartCount})</Link>
            </nav>
          </div>
        )}
      </div>
      <style jsx global>{`
        .animate-ping-once { position: relative; }
        .animate-ping-once::after {
          content: '';
          position: absolute; inset: -6px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.4);
          animation: pingOnce 0.6s ease-out forwards;
        }
        @keyframes pingOnce { 0% { opacity: 1; transform: scale(0.9); } 100% { opacity: 0; transform: scale(1.4); } }
      `}</style>
    </header>
  )
} 