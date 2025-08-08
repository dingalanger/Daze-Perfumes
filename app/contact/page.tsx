import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-20">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-daze-silk via-white to-daze-cream py-20">
        <div className="container-custom">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-daze-charcoal mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-daze-charcoal/70 max-w-3xl mx-auto">
              We'd love to hear from you. Whether you have questions about our fragrances, 
              need assistance with an order, or want to share your experience, we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="animate-slide-up">
              <h2 className="text-3xl font-serif font-bold text-daze-charcoal mb-8">
                Send us a Message
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-daze-charcoal mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 border border-daze-cream focus:border-daze-gold focus:outline-none transition-colors duration-300"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-daze-charcoal mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 border border-daze-cream focus:border-daze-gold focus:outline-none transition-colors duration-300"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-daze-charcoal mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-daze-cream focus:border-daze-gold focus:outline-none transition-colors duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-daze-charcoal mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 border border-daze-cream focus:border-daze-gold focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="product">Product Information</option>
                    <option value="order">Order Support</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="press">Press & Media</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-daze-charcoal mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-daze-cream focus:border-daze-gold focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary group w-full"
                >
                  Send Message
                  <Send size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="animate-slide-up-delayed">
              <h2 className="text-3xl font-serif font-bold text-daze-charcoal mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-daze-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-daze-gold" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-daze-charcoal mb-2">Email</h3>
                    <p className="text-daze-charcoal/70 mb-1">hello@dazeperfumes.com</p>
                    <p className="text-daze-charcoal/70">support@dazeperfumes.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-daze-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-daze-gold" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-daze-charcoal mb-2">Phone</h3>
                    <p className="text-daze-charcoal/70 mb-1">+1 (555) 123-4567</p>
                    <p className="text-sm text-daze-charcoal/50">Monday - Friday, 9AM - 6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-daze-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-daze-gold" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-daze-charcoal mb-2">Address</h3>
                    <p className="text-daze-charcoal/70 mb-1">
                      Daze Perfumes<br />
                      123 Luxury Avenue<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-daze-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="text-daze-gold" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-daze-charcoal mb-2">Business Hours</h3>
                    <p className="text-daze-charcoal/70 mb-1">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-lg font-semibold text-daze-charcoal mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-daze-gold/20 rounded-full flex items-center justify-center hover:bg-daze-gold hover:text-white transition-colors duration-300">
                    <span className="text-sm font-bold">IG</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-daze-gold/20 rounded-full flex items-center justify-center hover:bg-daze-gold hover:text-white transition-colors duration-300">
                    <span className="text-sm font-bold">FB</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-daze-gold/20 rounded-full flex items-center justify-center hover:bg-daze-gold hover:text-white transition-colors duration-300">
                    <span className="text-sm font-bold">TW</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-daze-silk">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-daze-charcoal mb-6">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-xl text-daze-charcoal/70 max-w-2xl mx-auto">
              Find answers to common questions about our fragrances, shipping, and policies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How long does shipping take?",
                answer: "Standard shipping takes 3-5 business days within the US. International shipping typically takes 7-14 business days."
              },
              {
                question: "Do you offer samples?",
                answer: "Yes! We offer sample sets of our most popular fragrances. You can find them in our collection or contact us for custom samples."
              },
              {
                question: "Are your fragrances cruelty-free?",
                answer: "Absolutely. All Daze fragrances are cruelty-free and we never test on animals. We're committed to ethical practices."
              },
              {
                question: "Can I return a fragrance?",
                answer: "We offer a 30-day return policy for unused fragrances in their original packaging. Contact our support team to initiate a return."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-lg font-semibold text-daze-charcoal mb-3">{faq.question}</h3>
                <p className="text-daze-charcoal/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 