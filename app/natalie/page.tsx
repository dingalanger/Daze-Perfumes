import React from 'react'
import Header from '../../components/Header'
import GiftReveal from '../../components/GiftReveal'
import TitleReveal from '../../components/TitleReveal'

export default function NataliePage() {
  return (
    <main className="min-h-screen pt-20 bg-black">
      <Header />

      <section className="relative section-padding bg-black min-h-[70vh] flex flex-col items-center justify-center">
        <div className="container-custom text-center mx-auto">
          <TitleReveal />
          <p className="text-xl md:text-2xl text-white/80 animate-fade-in-delayed mt-6">
            You are the first to be Dazed!
          </p>
        </div>
        <GiftReveal />
      </section>
    </main>
  )
} 