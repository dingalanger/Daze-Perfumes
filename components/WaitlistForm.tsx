'use client'

import React from 'react'
import { useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase'
import { Mail, User, Phone, CheckCircle, AlertCircle } from 'lucide-react'
import ReCAPTCHA from 'react-google-recaptcha'

function WaitlistInner({ siteKey }: { siteKey?: string }) {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    interests: [] as string[]
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const interestOptions = [
    'Gourmand Fragrances',
    'Chinese-Inspired Scents',
    'Luxury Perfumes',
    'Limited Editions',
    'Exclusive Events',
    'Behind-the-Scenes Content'
  ]

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const verifyCaptcha = async (): Promise<boolean> => {
    try {
      if (!captchaToken) return false
      const res = await fetch('/api/recaptcha', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: captchaToken }) })
      const json = await res.json()
      return Boolean(json.success)
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    const supabase = getSupabaseClient()

    try {
      const ok = await verifyCaptcha()
      if (!ok) {
        setErrorMessage('Captcha verification failed. Please try again.')
        setSubmitStatus('error')
        return
      }

      const { data, error } = await supabase
        .from('waitlist')
        .insert([{ email: formData.email, first_name: formData.first_name || null, last_name: formData.last_name || null, phone: formData.phone || null, interests: formData.interests.length > 0 ? formData.interests : null }])
        .select()

      if (error) {
        if (error.code === '23505') setErrorMessage('This email is already on our waitlist!')
        else if (error.code === '42501') setErrorMessage('Permission denied. Please check your Supabase configuration.')
        else setErrorMessage(`Database error: ${error.message}`)
        setSubmitStatus('error')
      } else {
        setSubmitStatus('success')
        setFormData({ email: '', first_name: '', last_name: '', phone: '', interests: [] })
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your connection and try again.')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const hasSiteKey = Boolean(siteKey)

  return (
    <div className="bg-neutral-950 rounded-lg p-8 shadow-sm border border-white/10">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-serif font-bold text-white mb-2">Join Our Waitlist</h3>
        <p className="text-white/70">Be the first to know about new releases, exclusive events, and behind-the-scenes content.</p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg flex items-center space-x-3">
          <CheckCircle className="text-green-400" size={20} />
          <div>
            <p className="text-green-300 font-medium">Successfully joined!</p>
            <p className="text-green-400/80 text-sm">We'll keep you updated on all things Daze.</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center space-x-3">
          <AlertCircle className="text-red-400" size={20} />
          <div>
            <p className="text-red-300 font-medium">Oops! Something went wrong.</p>
            <p className="text-red-400/80 text-sm">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-white mb-2">First Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input type="text" id="first_name" value={formData.first_name} onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))} className="w-full bg-neutral-900 text-white placeholder-white/40 pl-10 pr-4 py-3 border border-white/10 focus:border-white/40 focus:outline-none transition-colors duration-300" placeholder="Your first name" />
            </div>
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-white mb-2">Last Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input type="text" id="last_name" value={formData.last_name} onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))} className="w-full bg-neutral-900 text-white placeholder-white/40 pl-10 pr-4 py-3 border border-white/10 focus:border-white/40 focus:outline-none transition-colors duration-300" placeholder="Your last name" />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Email Address *</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="w-full bg-neutral-900 text-white placeholder-white/40 pl-10 pr-4 py-3 border border-white/10 focus:border-white/40 focus:outline-none transition-colors duration-300" placeholder="your.email@example.com" />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text sm font-medium text-white mb-2">Phone Number (Optional)</label>
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input type="tel" id="phone" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} className="w-full bg-neutral-900 text-white placeholder-white/40 pl-10 pr-4 py-3 border border-white/10 focus:border-white/40 focus:outline-none transition-colors duration-300" placeholder="+1 (555) 123-4567" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-3">What interests you? (Optional)</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {interestOptions.map((interest) => (
              <label key={interest} className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" checked={formData.interests.includes(interest)} onChange={() => handleInterestChange(interest)} className="w-4 h-4 text-white bg-neutral-900 border-white/20 rounded focus:ring-white focus:ring-2" />
                <span className="text-sm text-white/70">{interest}</span>
              </label>
            ))}
          </div>
        </div>

        {hasSiteKey ? (
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={siteKey as string}
              onChange={(token) => setCaptchaToken(token)}
              onExpired={() => setCaptchaToken(null)}
              theme="dark"
            />
          </div>
        ) : (
          <p className="text-xs text-red-400 text-center">Captcha not configured. Set NEXT_PUBLIC_RECAPTCHA_SITE_KEY.</p>
        )}

        <button type="submit" disabled={isSubmitting || !formData.email || !captchaToken || !hasSiteKey} className="w-full btn-outline-light disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? 'Joining...' : 'Join Waitlist'}
        </button>

        <p className="text-xs text-white/50 text-center">By joining our waitlist, you agree to receive updates about Daze. You can unsubscribe at any time.</p>
      </form>
    </div>
  )
}

export default function WaitlistForm() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
  return (
    <WaitlistInner siteKey={siteKey} />
  )
} 