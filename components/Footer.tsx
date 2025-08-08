import React from 'react'
import Link from 'next/link'
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <span className="text-3xl font-cursive text-white">Daze</span>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              Crafting luxury gourmand and Chinese-inspired fragrances that tell stories through scent. Each creation is a journey through time and tradition.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-300"><Instagram size={20} /></a>
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-300"><Facebook size={20} /></a>
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-300"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/collection" className="text-white/70 hover:text-white transition-colors duration-300">Collection</Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors duration-300">About</Link>
              </li>
              <li>
                <Link href="/waitlist" className="text-white/70 hover:text-white transition-colors duration-300">Waitlist</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-white/80" />
                <span className="text-white/70 text-sm">hello@daze.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-white/80" />
                <span className="text-white/70 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} className="text-white/80" />
                <span className="text-white/70 text-sm">New York, NY</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">© 2024 Daze. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors duration-300">Privacy Policy</Link>
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors duration-300">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 