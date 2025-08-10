"use client"

import React, { useMemo, useRef, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Notes palette
const NOTES = [
  { id: 'pear', label: 'Pear', family: 'sweet' },
  { id: 'black-tea', label: 'Black Tea', family: 'bitter' },
  { id: 'jasmine-rice', label: 'Jasmine Rice', family: 'comfort' },
  { id: 'osmanthus', label: 'Osmanthus', family: 'floral' },
  { id: 'vanilla', label: 'Vanilla', family: 'sweet' },
  { id: 'saffron', label: 'Saffron', family: 'spice' },
  { id: 'leather', label: 'Leather', family: 'leather' },
  { id: 'musk', label: 'Warm Musk', family: 'musk' },
]

// Deterministic daily combo using date seed
function dailyIndex(max: number) {
  const d = new Date()
  const seed = parseInt(`${d.getFullYear()}${d.getMonth()+1}${d.getDate()}`)
  let x = Math.sin(seed) * 10000
  return () => Math.floor((x = Math.sin(x) * 10000) % max + max) % max
}

function selectDailyTarget() {
  const rand = dailyIndex(NOTES.length)
  const pick = () => NOTES[rand()]
  // Top / Heart / Base must be distinct
  const top = pick()
  let heart = pick(); while (heart.id === top.id) heart = pick()
  let base = pick(); while (base.id === top.id || base.id === heart.id) base = pick()
  return { top, heart, base }
}

function feedbackFor(selection: string[]) {
  // Very light heuristic feedback
  const families = selection.map(id => NOTES.find(n => n.id === id)?.family)
  const counts = families.reduce<Record<string, number>>((acc, f) => { if (!f) return acc; acc[f] = (acc[f]||0)+1; return acc }, {})
  if (!selection.length) return 'Add three notes to the flask.'
  if (selection.length < 3) return 'Keep going — you need three notes.'
  if ((counts.floral||0) >= 2) return 'Too floral — ground it with musk, leather or tea.'
  if ((counts.sweet||0) >= 2) return 'Too sweet — add balance (tea, saffron or leather).'
  if ((counts.leather||0) + (counts.musk||0) >= 2) return 'Too heavy — lift with pear, rice, or osmanthus.'
  return 'Close… adjust sweetness/weight to balance the blend.'
}

export default function AlchemyPage() {
  const target = useMemo(() => selectDailyTarget(), [])
  const [flask, setFlask] = useState<string[]>([])
  const [message, setMessage] = useState<string>('Drag three notes into the flask in Top → Heart → Base order.')
  const dropRef = useRef<HTMLDivElement | null>(null)
  const solved = flask.length === 3 && flask[0] === target.top.id && flask[1] === target.heart.id && flask[2] === target.base.id

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    if (!id) return
    if (flask.length >= 3) return
    setFlask([...flask, id])
  }

  const onDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id)
  }

  const check = () => {
    if (flask.length !== 3) { setMessage('You need exactly three notes.'); return }
    if (solved) {
      setMessage('Perfect! You recreated today\'s secret accord. You\'re entered to win!')
    } else {
      setMessage(feedbackFor(flask))
    }
  }

  const reset = () => { setFlask([]); setMessage('Drag three notes into the flask in Top → Heart → Base order.') }

  return (
    <main className="min-h-screen pt-20 bg-black">
      <Header />
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Scent Alchemy</h1>
          <p className="text-white/80 mb-6">Apprentice perfumer: assemble the Top, Heart, and Base to match today\'s secret accord. Drag notes into the flask; submit to get feedback like “too floral” or “needs sweetness.” The correct combo changes daily.</p>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {/* Notes palette */}
            <div className="md:col-span-1">
              <h2 className="text-white font-semibold mb-3">Ingredients</h2>
              <div className="grid grid-cols-2 gap-3">
                {NOTES.map(n => (
                  <div key={n.id} draggable onDragStart={(e) => onDragStart(e, n.id)} className="cursor-move select-none px-3 py-2 border border-white/20 text-white hover:bg-white hover:text-black transition">
                    {n.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Flask drop area */}
            <div className="md:col-span-2">
              <h2 className="text-white font-semibold mb-3">Your Flask</h2>
              <div ref={dropRef} onDragOver={(e) => e.preventDefault()} onDrop={onDrop} className="h-56 border border-white/20 bg-neutral-900 text-white flex flex-col items-center justify-center gap-3 p-4">
                {flask.length === 0 && <span className="text-white/50">Drop Top, then Heart, then Base</span>}
                {flask.map((id, i) => (
                  <div key={i} className="px-3 py-2 bg-white/10 border border-white/20 w-full max-w-sm text-center">{i===0?'Top':i===1?'Heart':'Base'}: {NOTES.find(n => n.id===id)?.label}</div>
                ))}
              </div>

              <div className="mt-4 flex gap-3">
                <button className="btn-outline-light" onClick={check}>Submit blend</button>
                <button className="btn-outline-light" onClick={reset}>Reset</button>
              </div>

              <p className={`mt-4 ${solved ? 'text-green-400' : 'text-white/80'}`}>{message}</p>

              {solved && (
                <div className="mt-6 text-white/70 text-sm">
                  <p>Share a screenshot on social and tag us. Winners are randomly selected from solvers each day.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
} 