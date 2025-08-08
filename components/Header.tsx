'use client'

import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag, User, Search } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="container-custom">
        <div className="grid grid-cols-3 items-center h-20">
          {/* Logo */}
          <div className="justify-self-start">
            <Link href="/" className="inline-flex items-center">
              <span className="font-serif font-bold tracking-wide text-white text-2xl md:text-3xl">DAZE</span>
            </Link>
          </div>

          {/* Desktop Navigation (centered) */}
          <nav className="hidden md:flex justify-center items-center space-x-10 justify-self-center">
            <Link href="/" className="text-sm font-medium tracking-wide text-white/90 hover:text-white transition-colors">Home</Link>
            <Link href="/collection" className="text-sm font-medium tracking-wide text-white/90 hover:text-white transition-colors">Collection</Link>
            <Link href="/about" className="text-sm font-medium tracking-wide text-white/90 hover:text-white transition-colors">About</Link>
            <Link href="/waitlist" className="text-sm font-medium tracking-wide text-white/90 hover:text-white transition-colors">Waitlist</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 justify-self-end">
            <Link href="/search" className="p-2 text-white/80 hover:text-white transition-colors duration-300">
              <Search size={20} />
            </Link>
            <Link href="/account" className="p-2 text-white/80 hover:text-white transition-colors duration-300">
              <User size={20} />
            </Link>
            <Link href="/checkout" className="p-2 text-white/80 hover:text-white transition-colors duration-300">
              <ShoppingBag size={20} />
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
              <Link href="/" className="text-white/90 hover:text-white transition-colors">Home</Link>
              <Link href="/collection" className="text-white/90 hover:text-white transition-colors">Collection</Link>
              <Link href="/about" className="text-white/90 hover:text-white transition-colors">About</Link>
              <Link href="/waitlist" className="text-white/90 hover:text-white transition-colors">Waitlist</Link>
            </nav>
            <div className="flex items-center justify-center space-x-4 mt-6">
              <Link href="/search" className="p-2 text-white/80 hover:text-white transition-colors duration-300">
                <Search size={20} />
              </Link>
              <Link href="/account" className="p-2 text-white/80 hover:text-white transition-colors duration-300">
                <User size={20} />
              </Link>
              <Link href="/checkout" className="p-2 text-white/80 hover:text-white transition-colors duration-300">
                <ShoppingBag size={20} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 