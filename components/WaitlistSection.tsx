import WaitlistForm from './WaitlistForm'

export default function WaitlistSection() {
  return (
    <section className="section-padding bg-black">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-white animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Join Our <span className="text-white/90">Waitlist</span>
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Be among the first to experience our latest fragrances, exclusive events,
              and behind-the-scenes content from the world of Daze Perfumes.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-white/80">Exclusive previews and early access</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-white/80">Members‑only events and offers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span className="text-white/80">Behind‑the‑scenes stories</span>
              </div>
            </div>
          </div>
          <div className="animate-slide-up-delayed">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  )
} 