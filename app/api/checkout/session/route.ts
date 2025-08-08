import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' })

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const proto = req.headers.get('x-forwarded-proto') || 'https'
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || ''
  const baseUrl = host ? `${proto}://${host}` : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')

  let body: any = {}
  try { body = await req.json() } catch {}
  const items: Array<{ name: string; price: number; quantity?: number }> = Array.isArray(body?.items) ? body.items : []

  const line_items = (items.length > 0 ? items : [{ name: 'Daze Fragrance (50ml)', price: 120, quantity: 1 }]).map(i => ({
    price_data: {
      currency: 'usd',
      product_data: { name: i.name },
      unit_amount: Math.round((i.price || 0) * 100),
    },
    quantity: i.quantity && i.quantity > 0 ? i.quantity : 1,
  }))

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
    })

    return NextResponse.json({ id: session.id, url: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Stripe error' }, { status: 500 })
  }
} 