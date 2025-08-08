'use client'

import React, { useState } from 'react'
import Confetti from './Confetti'

export default function GiftReveal() {
  const [isOpen, setIsOpen] = useState(false)
  const [burst, setBurst] = useState(0)

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true)
      // trigger confetti burst
      setTimeout(() => setBurst((b) => b + 1), 50)
    } else {
      setIsOpen(false)
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center mt-10">
      {/* Confetti appears only when opened; use burst key to restart */}
      {isOpen && <Confetti key={burst} fullScreen density={96} speed={1.8} variant="background" />}

      <button
        onClick={handleClick}
        className="group relative gift-container focus:outline-none"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close gift' : 'Open gift'}
      >
        {/* Box base */}
        <div className={`gift-box ${isOpen ? 'open' : ''}`}>
          <div className="gift-body">
            <span className="gift-ribbon-vertical" />
            <span className="gift-ribbon-horizontal" />
          </div>
          <div className="gift-lid">
            <span className="gift-bow-left" />
            <span className="gift-bow-right" />
          </div>
        </div>

        {/* Bottle reveal */}
        <div className={`bottle ${isOpen ? 'reveal' : ''}`} aria-hidden={!isOpen}>
          <div className="bottle-neck" />
          <div className="bottle-body">
            <div className="bottle-label">DAZE</div>
          </div>
          <div className="bottle-cap" />
        </div>

        <div className="mt-4 text-sm text-white/60 group-hover:text-white/80 transition-colors">
          {isOpen ? 'Click to close' : 'Tap to open'}
        </div>
      </button>
    </div>
  )
} 