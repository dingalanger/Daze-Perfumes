import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WaitlistForm from '@/components/WaitlistForm'

export default function WaitlistPage() {
  return (
    <main className="min-h-screen pt-20 bg-black">
      <Header />
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center animate-fade-in text-white">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Join Our <span className="text-white/90">Waitlist</span></h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Be among the first to experience our latest fragrances, exclusive events,
              and behind-the-scenes content from the world of Daze Perfumes.
            </p>
          </div>
        </div>
      </section>
      <section className="section-padding bg-black">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <WaitlistForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
} 