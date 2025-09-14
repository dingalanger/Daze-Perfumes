import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function DreamHome() {
  return (
    <main className="min-h-screen bg-transparent">
      <Header />
      <section className="relative pt-28 md:pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-sleep-fog pointer-events-none" />
        <div className="pointer-events-none">
          <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-vi-fog-lavender/18 blur-3xl animate-float" />
          <div className="absolute top-10 -right-24 w-[360px] h-[360px] rounded-full bg-vi-muted-jade/18 blur-3xl animate-float-delayed" />
          <div className="absolute bottom-[-120px] left-1/4 w-[500px] h-[500px] rounded-full bg-vi-warm-cream/14 blur-3xl animate-float-slow" />
        </div>
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full text-xs tracking-widest uppercase bg-white/5 border border-white/10 text-white/70">Dream Preview</span>
            <h1 className="mt-6 text-5xl md:text-6xl font-sans font-extrabold leading-tight text-balance">Step into the Sleepwalker Club</h1>
            <p className="mt-5 text-lg text-daze-white/80">A foggy, dreamlike world of scent. Free to join. Secret micro-drops unlock between 3–5am.</p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a href="/dream/sleepwalker" className="btn-primary">Join the Club</a>
              <a href="#about-daze" className="btn-secondary">Learn More</a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}


