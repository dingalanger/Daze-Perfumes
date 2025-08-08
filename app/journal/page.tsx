import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const journalPosts = [
  {
    id: 1,
    title: "The Art of Chinese Tea Ceremony in Perfumery",
    excerpt: "Discover how traditional Chinese tea ceremonies inspire our latest fragrance collection, blending ancient wisdom with modern luxury.",
    category: "Culture",
    date: "December 15, 2024",
    readTime: "5 min read",
    image: "/api/placeholder/400/250"
  },
  {
    id: 2,
    title: "Gourmand Fragrances: A Journey Through Sweet Memories",
    excerpt: "Explore the world of gourmand perfumery and how sweet notes can evoke powerful emotional connections and memories.",
    category: "Fragrance",
    date: "December 10, 2024",
    readTime: "4 min read",
    image: "/api/placeholder/400/250"
  },
  {
    id: 3,
    title: "Sustainable Luxury: Our Commitment to Ethical Sourcing",
    excerpt: "Learn about our dedication to sustainable practices and how we ensure every ingredient meets our ethical standards.",
    category: "Sustainability",
    date: "December 5, 2024",
    readTime: "6 min read",
    image: "/api/placeholder/400/250"
  },
  {
    id: 4,
    title: "The Story Behind Golden Orchid: From Concept to Creation",
    excerpt: "Follow the journey of our signature fragrance, from initial inspiration to the final masterpiece that graces your skin.",
    category: "Behind the Scenes",
    date: "November 28, 2024",
    readTime: "7 min read",
    image: "/api/placeholder/400/250"
  },
  {
    id: 5,
    title: "Fragrance Notes: Understanding the Language of Scent",
    excerpt: "A comprehensive guide to understanding fragrance notes and how they work together to create complex, beautiful scents.",
    category: "Education",
    date: "November 20, 2024",
    readTime: "8 min read",
    image: "/api/placeholder/400/250"
  },
  {
    id: 6,
    title: "The Perfect Gift: Choosing Fragrances for Loved Ones",
    excerpt: "Expert tips on selecting the perfect fragrance gift, from understanding preferences to seasonal considerations.",
    category: "Lifestyle",
    date: "November 15, 2024",
    readTime: "5 min read",
    image: "/api/placeholder/400/250"
  }
]

export default function JournalPage() {
  return (
    <main className="min-h-screen pt-20 bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-daze-silk via-white to-daze-cream py-20">
        <div className="container-custom text-white">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Journal</h1>
            <p className="text-xl text-daze-charcoal/70 max-w-3xl mx-auto">
              Stories, insights, and discoveries from the world of luxury perfumery. 
              Explore the art, culture, and craftsmanship behind every Daze fragrance.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-daze-gold/10 to-daze-rose/10 rounded-lg p-8 md:p-12 animate-slide-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-daze-gold text-white text-sm font-medium rounded-full mb-4">
                  Featured
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-daze-charcoal mb-6">
                  The Art of Chinese Tea Ceremony in Perfumery
                </h2>
                <p className="text-lg text-daze-charcoal/70 mb-6 leading-relaxed">
                  Discover how traditional Chinese tea ceremonies inspire our latest fragrance collection, 
                  blending ancient wisdom with modern luxury. From the delicate notes of jasmine to the 
                  grounding presence of oolong, explore how tea culture shapes our olfactory journey.
                </p>
                <div className="flex items-center space-x-6 text-sm text-daze-charcoal/60 mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>December 15, 2024</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>5 min read</span>
                  </div>
                </div>
                <button className="btn-primary group">
                  Read Full Article
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
              <div className="bg-gradient-to-br from-daze-cream to-daze-silk h-80 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-daze-gold/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-daze-gold text-2xl">🍵</span>
                  </div>
                  <p className="text-daze-charcoal/70 italic">Tea Ceremony Collection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journal Grid */}
      <section className="section-padding bg-daze-silk">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-daze-charcoal mb-6">
              Latest <span className="text-gradient">Stories</span>
            </h2>
            <p className="text-xl text-daze-charcoal/70 max-w-2xl mx-auto">
              Explore our latest articles, insights, and behind-the-scenes stories from the world of Daze.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {journalPosts.slice(1).map((post, index) => (
              <article
                key={post.id}
                className="bg-white rounded-lg overflow-hidden card-hover animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-48 bg-gradient-to-br from-daze-cream to-daze-silk flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-daze-gold/20 rounded-full flex items-center justify-center mb-2">
                      <span className="text-daze-gold text-lg">📖</span>
                    </div>
                    <p className="text-daze-charcoal/70 text-sm">{post.category}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-xs text-daze-charcoal/60 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-daze-charcoal mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-daze-charcoal/70 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <button className="text-daze-gold hover:text-daze-bronze font-medium text-sm flex items-center group">
                    Read More
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12 animate-slide-up-delayed">
            <button className="btn-secondary">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-gradient-to-r from-daze-gold to-daze-bronze">
        <div className="container-custom">
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Stay Connected
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Subscribe to our journal for exclusive stories, fragrance insights, and behind-the-scenes content.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="bg-white text-daze-gold hover:bg-daze-silk font-medium px-6 py-3 transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 