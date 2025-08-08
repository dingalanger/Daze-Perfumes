import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Sparkles, Award, Heart, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20 bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="section-padding bg-black">
        <div className="container-custom text-white">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Story</h1>
          <p className="text-white/80 max-w-3xl">Daze crafts luxury gourmand and Chinese‑inspired fragrances.</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-black">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                The Art of Fusion
              </h2>
              <p className="text-lg text-white/70 mb-6 leading-relaxed">
                Daze was born from a passion for bridging cultures through scent. Our founder, inspired by both the rich traditions of Chinese perfumery and the indulgent world of gourmand fragrances, set out to create something truly unique.
              </p>
              <p className="text-lg text-white/70 mb-6 leading-relaxed">
                Each fragrance is a carefully crafted journey that combines the sophisticated elegance of Chinese tea ceremonies with the warm, comforting notes of gourmand traditions. We believe that scent has the power to transport us across time and space, connecting us to memories and cultures we've never experienced.
              </p>
              <div className="flex items-center space-x-4">
                <Sparkles className="text-white" size={24} />
                <span className="text-white font-medium">Artisanal Craftsmanship</span>
              </div>
            </div>

            <div className="relative animate-slide-up-delayed">
              <div className="w-full h-96 bg-neutral-900 rounded-lg border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mb-4 border border-white/20">
                    <span className="text-white text-4xl font-cursive">Daze</span>
                  </div>
                  <p className="text-white/60 italic">"Where East meets West in fragrance"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-black">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Our Values
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              The principles that guide every creation and decision at Daze.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Artisanal Excellence",
                description: "Every fragrance is hand-crafted with the finest ingredients, ensuring unparalleled quality and uniqueness."
              },
              {
                icon: Heart,
                title: "Cultural Respect",
                description: "We honor and celebrate the rich traditions of Chinese perfumery while embracing modern innovation."
              },
              {
                icon: Globe,
                title: "Sustainable Luxury",
                description: "Our commitment to ethical sourcing and sustainable practices ensures luxury that respects our planet."
              }
            ].map((value, index) => (
              <div
                key={index}
                className="text-center p-8 bg-neutral-900 rounded-lg border border-white/10 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
                  <value.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                <p className="text-white/70 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-black">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Our Process
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              From inspiration to creation, discover how we bring each fragrance to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "01", title: "Inspiration", description: "Drawing from Chinese traditions and gourmand classics to create unique concepts." },
              { number: "02", title: "Sourcing", description: "Selecting the finest ingredients from around the world, with respect for sustainability." },
              { number: "03", title: "Creation", description: "Hand-crafting each fragrance with precision and passion in our atelier." },
              { number: "04", title: "Perfection", description: "Rigorous testing and refinement to ensure every scent meets our exacting standards." }
            ].map((step, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-20 h-20 bg-white/10 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold border border-white/20">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-black">
        <div className="container-custom">
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Experience the Art of Daze</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">Discover our collection of luxury fragrances and find your perfect scent story.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a href="/collection" className="btn-outline-light py-3 px-8 rounded-none w-56 text-center">Explore Collection</a>
              <a href="/waitlist" className="btn-outline-light py-3 px-8 rounded-none w-56 text-center">Join Waitlist</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 