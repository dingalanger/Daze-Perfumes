'use client'

import React, { useEffect, useState } from 'react'
import Confetti from './Confetti'

export default function TitleReveal() {
  const [burst, setBurst] = useState(0)

  useEffect(() => {
    setBurst((b) => b + 1)
  }, [])

  return (
    <div className="relative text-center">
      <Confetti key={burst} fullScreen density={80} speed={1.5} variant="background" />
      <h1 className="reveal-text text-4xl md:text-6xl font-serif font-bold text-white mb-6 relative z-10">
        Happy Birthday Natalie!
      </h1>
    </div>
  )
} 