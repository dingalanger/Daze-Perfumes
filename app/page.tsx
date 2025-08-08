import Header from '@/components/Header'
import HeroWithVideo from '@/components/HeroWithVideo'
import FeaturedProducts from '@/components/FeaturedProducts'
import WaitlistSection from '@/components/WaitlistSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <HeroWithVideo />
      <FeaturedProducts />
      <WaitlistSection />
      <Footer />
    </main>
  )
} 