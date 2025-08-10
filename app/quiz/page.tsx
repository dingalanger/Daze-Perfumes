"use client"

import React, { useMemo, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { products } from '@/lib/products'

type ScoreMap = Partial<Record<string, number>>

// Simple scoring: each answer adds points to one or more fragrances
const QUESTIONS: { q: string; answers: { label: string; scores: ScoreMap }[] }[] = [
  {
    q: "Pick a cozy moment:",
    answers: [
      { label: "Warm bowl of jasmine rice at home", scores: { rice: 2 } },
      { label: "Fresh pear in the orchard", scores: { pear: 2 } },
      { label: "Milk tea run with friends", scores: { boba: 2 } },
      { label: "Night ride under city lights", scores: { stallion: 2 } },
    ],
  },
  {
    q: "Your ideal vibe:",
    answers: [
      { label: "Minimal, soft, comforting", scores: { rice: 2, pear: 1 } },
      { label: "Fresh, bright, juicy", scores: { pear: 2, rice: 1 } },
      { label: "Sweet, creamy, addictive", scores: { boba: 2 } },
      { label: "Bold, leathery, confident", scores: { stallion: 2 } },
    ],
  },
  {
    q: "Pick a note:",
    answers: [
      { label: "Osmanthus", scores: { stallion: 2 } },
      { label: "Asian Pear", scores: { pear: 2 } },
      { label: "Black Tea", scores: { boba: 2 } },
      { label: "Jasmine Rice", scores: { rice: 2 } },
    ],
  },
  {
    q: "Date plan:",
    answers: [
      { label: "Farmers market + picnic", scores: { pear: 2 } },
      { label: "Late‑night dessert spot", scores: { boba: 2 } },
      { label: "Gallery stroll + espresso", scores: { rice: 2 } },
      { label: "Concert + rooftop", scores: { stallion: 2 } },
    ],
  },
]

const PAIRINGS: Record<string, string[]> = {
  pear: ["Boba Tea", "Steamed Rice"],
  boba: ["Pear", "Steamed Rice"],
  rice: ["Pear", "Boba Tea"],
  stallion: ["Pear", "Boba Tea"],
}

export default function QuizPage() {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({ pear: 0, boba: 0, rice: 0, stallion: 0 })

  const makeChoice = (answerScores: ScoreMap) => {
    setScores(prev => {
      const next: Record<string, number> = { ...prev }
      Object.entries(answerScores).forEach(([k, v]) => { next[k] = (next[k] || 0) + (v || 0) })
      return next
    })
    setStep(step + 1)
  }

  const result = useMemo(() => {
    if (step < QUESTIONS.length) return null
    const entries = Object.entries(scores)
    entries.sort((a, b) => b[1] - a[1])
    const topKey = entries[0][0]
    const prod = products.find(p => p.id === topKey)
    return prod || null
  }, [step, scores])

  return (
    <main className="min-h-screen pt-20 bg-black">
      <Header />

      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <h1 className="text-4xl font-serif font-bold text-white mb-8">Couples Quiz</h1>

          {step < QUESTIONS.length ? (
            <div className="bg-neutral-900 border border-white/10 p-6">
              <p className="text-xl text-white mb-6">{QUESTIONS[step].q}</p>
              <div className="grid gap-3">
                {QUESTIONS[step].answers.map((a, idx) => (
                  <button key={idx} className="w-full text-left px-4 py-3 border border-white/20 text-white hover:bg-white hover:text-black transition" onClick={() => makeChoice(a.scores)}>
                    {a.label}
                  </button>
                ))}
              </div>
              <div className="mt-6 text-white/60 text-sm">Question {step + 1} of {QUESTIONS.length}</div>
            </div>
          ) : result ? (
            <div className="bg-neutral-900 border border-white/10 p-6">
              <h2 className="text-2xl font-serif font-bold text-white mb-2">Your match: {result.name}</h2>
              <p className="text-white/80 mb-4">{result.shortDescription}</p>
              <Link href={`/product/${result.slug}`} className="btn-outline-light inline-block">View {result.name}</Link>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-2">Pairs well with</h3>
                <ul className="list-disc pl-6 text-white/80">
                  {(PAIRINGS[result.id] || []).map(name => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>

              <button className="mt-8 btn-outline-light" onClick={() => { setStep(0); setScores({ pear: 0, boba: 0, rice: 0, stallion: 0 }) }}>Retake quiz</button>
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  )
} 