'use client'

import React, { useState } from 'react'

export default function GiftReveal() {
  const [isOpen, setIsOpen] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const handleClick = () => setIsOpen((v) => !v)

  return (
    <div className="relative flex flex-col items-center justify-center mt-10">
      <button
        onClick={handleClick}
        className="group relative gift-container focus:outline-none"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close gift' : 'Open gift'}
      >
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

        <div className={`bottle ${isOpen ? 'reveal' : ''}`} aria-hidden={!isOpen}>
          <div className="bottle-neck" />
          <div className="bottle-body">
            <div className="bottle-label font-serif text-black/90 tracking-widest text-center">DAZE</div>
          </div>
          <div className="bottle-cap" />
        </div>

        <div className="mt-4 text-sm text-white/60 group-hover:text-white/80 transition-colors">
          {isOpen ? 'Click to close' : 'Tap to open'}
        </div>
      </button>

      <button onClick={() => setShowHint(true)} className="mt-6 btn-outline-light">Reveal next hint</button>

      {showHint && (
        <p className="mt-4 text-white/80 text-center max-w-2xl">
          Congrats on finding this! your gift is located behind an australian animal near the one who makes your dreams come true
        </p>
      )}
    </div>
  )
} 