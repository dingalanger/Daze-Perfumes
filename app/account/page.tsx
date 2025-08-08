'use client'

import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AccountPage() {
  return (
    <main className="min-h-screen pt-20 bg-black">
      <Header />
      <section className="section-padding bg-black">
        <div className="container-custom">
          <h1 className="text-4xl font-serif font-bold text-white mb-6">Account</h1>
          <p className="text-white/70 max-w-2xl">Sign in and account features coming soon. This page is a placeholder for profile, orders, and saved items.</p>
        </div>
      </section>
      <Footer />
    </main>
  )
} 