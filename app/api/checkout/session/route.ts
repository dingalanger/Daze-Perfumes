import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' })

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  // Compute base URL from request headers; fallback to env
  const proto = req.headers.get('x-forwarded-proto') || 'https'
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || ''
  const baseUrl = host ? `${proto}://${host}` : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Daze Fragrance (50ml)' },
            unit_amount: 12000,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
    })

    return NextResponse.json({ id: session.id, url: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Stripe error' }, { status: 500 })
  }
} 