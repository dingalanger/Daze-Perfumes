import Header from '@/components/Header'
// Experimental revamp: media-free dreamy hero
import WaitlistSection from '@/components/WaitlistSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent">
      <Header />
      <section className="relative pt-28 md:pt-32 pb-20">
        <div className="absolute inset-0 bg-sleep-fog pointer-events-none" />
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full text-xs tracking-widest uppercase bg-white/5 border border-white/10 text-white/70">Experimental</span>
            <h1 className="mt-6 text-5xl md:text-6xl font-serif leading-tight text-balance">
              Step into the Sleepwalker Club
            </h1>
            <p className="mt-5 text-lg text-daze-white/80">
              A foggy, dreamlike world of scent. Free to join. Secret micro-drops unlock between 3–5am.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a href="/sleepwalker" className="btn-primary">Join the Club</a>
              <a href="#about-daze" className="btn-secondary">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      <section id="about-daze" className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif">Soft, hazy, slightly surreal.</h2>
              <p className="mt-4 text-daze-white/80">
                Think Apple meets a Studio Ghibli dream sequence: clean, calm, cinematic. Grounded neutrals and muted pastels guide the way. No noise. Just presence.
              </p>
            </div>
            <div className="card-gold-special p-8 rounded-xl">
              <p className="font-whimsy text-xl text-daze-fog">
                “On certain nights, the city turns to mist. Those who are awake drift a little closer.”
              </p>
            </div>
          </div>
        </div>
      </section>

      <WaitlistSection />
      <Footer />
    </main>
  )
} 