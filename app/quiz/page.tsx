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
    q: "At a party, you're most likely...",
    answers: [
      { label: "Having sweet 1‑on‑1 chats in a cozy corner", scores: { pear: 2 } },
      { label: "Getting everyone to dance and try games", scores: { boba: 2 } },
      { label: "Making sure your friends are good and the plan runs smooth", scores: { stallion: 2 } },
      { label: "Trying something wild and getting people hyped about it", scores: { rice: 2 } },
    ],
  },
  {
    q: "Your ideal weekend vibe:",
    answers: [
      { label: "Slow morning, baking/reading, simple pleasures", scores: { pear: 2 } },
      { label: "Spontaneous city crawl, karaoke, late‑night desserts", scores: { boba: 2 } },
      { label: "Early workout/hike, crossing goals off your list", scores: { stallion: 2 } },
      { label: "Pop‑up markets, niche cafés, discovering bold new spots", scores: { rice: 2 } },
    ],
  },
  {
    q: "The compliment you love to hear:",
    answers: [
      { label: "You're so sweet and calming", scores: { pear: 2 } },
      { label: "You're the most fun person to be around", scores: { boba: 2 } },
      { label: "You're reliable, loyal, and driven", scores: { stallion: 2 } },
      { label: "Your style is so unique and bold", scores: { rice: 2 } },
    ],
  },
  {
    q: "Pick a color palette:",
    answers: [
      { label: "Soft pastels and creams", scores: { pear: 2 } },
      { label: "Bright, playful tones", scores: { boba: 2 } },
      { label: "Deep neutrals with leather accents", scores: { stallion: 2 } },
      { label: "High‑contrast, statement colors", scores: { rice: 2 } },
    ],
  },
  {
    q: "Decision style:",
    answers: [
      { label: "Go with the flow and keep it mellow", scores: { pear: 2 } },
      { label: "Follow the excitement and make it fun", scores: { boba: 2 } },
      { label: "Set a goal and execute with focus", scores: { stallion: 2 } },
      { label: "Break the mold and do it differently", scores: { rice: 2 } },
    ],
  },
  {
    q: "Music energy right now:",
    answers: [
      { label: "Mellow R&B / lo‑fi", scores: { pear: 2 } },
      { label: "Upbeat pop / EDM", scores: { boba: 2 } },
      { label: "Motivational hip‑hop / classic rock", scores: { stallion: 2 } },
      { label: "Indie / experimental", scores: { rice: 2 } },
    ],
  },
  {
    q: "Travel habit:",
    answers: [
      { label: "Slow towns, cafés, simple joys", scores: { pear: 2 } },
      { label: "Group trips, beach days, festivals", scores: { boba: 2 } },
      { label: "Planned treks and challenges", scores: { stallion: 2 } },
      { label: "Solo city hunts for hidden galleries and zines", scores: { rice: 2 } },
    ],
  },
  {
    q: "Dessert choice:",
    answers: [
      { label: "Fruit tart / pear sorbet", scores: { pear: 2 } },
      { label: "Boba milk‑tea float", scores: { boba: 2 } },
      { label: "Dark chocolate with caramel", scores: { stallion: 2 } },
      { label: "Mochi flight / unexpected flavor mashups", scores: { rice: 2 } },
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