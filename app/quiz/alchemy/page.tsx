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

const FAMILY_COLORS: Record<string, string> = {
  sweet: '#F7B500',
  bitter: '#8BA1B3',
  comfort: '#EAD7B7',
  floral: '#FF89B3',
  spice: '#E06C00',
  leather: '#915C39',
  musk: '#C0C0C0',
}

// Deterministic daily target fragrance
function dailyFragrance() {
  const choices = ['pear', 'boba', 'stallion', 'rice'] as const
  const d = new Date()
  const idx = (d.getFullYear() + d.getMonth() + d.getDate()) % choices.length
  return choices[idx]
}

const DAILY_COMBOS: Record<string, [string, string, string]> = {
  pear: ['pear', 'vanilla', 'musk'],
  boba: ['black-tea', 'vanilla', 'jasmine-rice'],
  stallion: ['osmanthus', 'leather', 'musk'],
  rice: ['jasmine-rice', 'vanilla', 'black-tea'],
}

function selectDailyTarget() {
  const id = dailyFragrance()
  const [top, heart, base] = DAILY_COMBOS[id]
  return {
    id,
    top: NOTES.find(n => n.id === top)!,
    heart: NOTES.find(n => n.id === heart)!,
    base: NOTES.find(n => n.id === base)!,
  }
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
  const [pour, setPour] = useState<{ color: string; key: number } | null>(null)
  const dropRef = useRef<HTMLDivElement | null>(null)
  const solved = flask.length === 3 && flask[0] === target.top.id && flask[1] === target.heart.id && flask[2] === target.base.id

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    if (!id) return
    if (flask.length >= 3) return
    const fam = NOTES.find(n => n.id === id)?.family || 'sweet'
    setPour({ color: FAMILY_COLORS[fam], key: Date.now() })
    setFlask([...flask, id])
    setTimeout(() => setPour(null), 700)
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

  const level = Math.min(3, flask.length) / 3

  return (
    <main className="min-h-screen pt-20 bg-black">
      <Header />
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">Scent Alchemy</h1>
          <p className="text-white/80 mb-4">Today's target fragrance: <span className="font-semibold capitalize">{target.id}</span>. Assemble Top, Heart, Base to match.</p>
          <p className="text-white/70 mb-6">Drag notes into the flask; submit to get feedback like “too floral” or “needs sweetness.” The correct combo changes daily.</p>

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
              <div ref={dropRef} onDragOver={(e) => e.preventDefault()} onDrop={onDrop} className="relative h-72 text-white flex items-center justify-center">
                {/* Flask outline via clip-path */}
                <div className="relative w-72 h-full">
                  <div className="absolute inset-0 clip-flask border border-white/30"></div>
                  {/* Liquid fill */}
                  <div className="absolute bottom-0 left-0 right-0 clip-flask overflow-hidden">
                    <div className="w-full transition-[height] duration-700" style={{ height: `${Math.max(6, level*100)}%`, background: 'linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.4))' }} />
                  </div>
                  {/* Pour stream */}
                  {pour && (
                    <div key={pour.key} className="absolute -top-10 left-1/2 -translate-x-1/2 h-10 w-3 rounded-full animate-pour" style={{ background: pour.color }} />
                  )}
                  {/* Labels */}
                  {flask.map((id, i) => (
                    <div key={i} className="absolute left-1/2 -translate-x-1/2 text-xs text-white/80" style={{ bottom: `${10 + i*18}%` }}>{i===0?'Top':i===1?'Heart':'Base'}: {NOTES.find(n=>n.id===id)?.label}</div>
                  ))}
                  {flask.length === 0 && <span className="absolute inset-0 flex items-center justify-center text-white/50">Drop Top, then Heart, then Base</span>}
                </div>
                {/* pour spout indicator */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-6 h-6 border-t border-x border-white/40 rotate-45"></div>
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
      <style jsx global>{`
        .clip-flask {
          clip-path: polygon(45% 0%, 55% 0%, 60% 8%, 64% 15%, 70% 28%, 85% 90%, 15% 90%, 30% 28%, 36% 15%, 40% 8%);
          border-radius: 6px;
        }
        @keyframes pourDown {
          0% { transform: translate(-50%, -120%); opacity: 0.0; }
          20% { opacity: 1; }
          100% { transform: translate(-50%, 0%); opacity: 0.9; }
        }
        .animate-pour { animation: pourDown 0.7s ease-in-out; }
      `}</style>
    </main>
  )
} 