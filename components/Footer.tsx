import React from 'react'
import Link from 'next/link'
import { Instagram, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-daze-black text-daze-white border-t border-white/10">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <span className="text-3xl font-serif text-daze-white">Daze</span>
            </div>
            <p className="text-daze-white/70 mb-6 max-w-md">
              A soft, hazy, slightly surreal world of scent. Join the Sleepwalker Club for secret micro-drops between 3–5am.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/dazeparfums/" target="_blank" rel="noopener noreferrer" className="text-daze-white/70 hover:text-daze-white transition-colors duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-daze-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/collection" className="text-daze-white/70 hover:text-daze-white transition-colors duration-300">Collection</Link>
              </li>
              <li>
                <Link href="/about" className="text-daze-white/70 hover:text-daze-white transition-colors duration-300">About</Link>
              </li>
              <li>
                <Link href="/waitlist" className="text-daze-white/70 hover:text-daze-white transition-colors duration-300">Waitlist</Link>
              </li>
              <li>
                <Link href="/sleepwalker" className="text-daze-fog hover:text-daze-lavender transition-colors duration-300">Sleepwalker Club</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-daze-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <MapPin size={16} className="text-daze-white/80" />
                <span className="text-daze-white/70 text-sm">New York, NY</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-daze-white/60 text-sm">© 2024 Daze. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-daze-white/60 hover:text-daze-white transition-colors duration-300">Privacy Policy</Link>
              <Link href="/terms" className="text-daze-white/60 hover:text-daze-white transition-colors duration-300">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 