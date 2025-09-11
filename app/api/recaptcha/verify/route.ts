import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { token } = await req.json()
    if (!token) return NextResponse.json({ success: false, error: 'missing-token' }, { status: 400 })

    const secret = process.env.RECAPTCHA_SECRET_KEY
    if (!secret) return NextResponse.json({ success: false, error: 'missing-secret' }, { status: 500 })

    const params = new URLSearchParams({ secret, response: token })
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })
    const data = await res.json()

    const ok = !!data.success && (data.score === undefined || data.score >= 0.5)
    return NextResponse.json({ success: ok, raw: data }, { status: ok ? 200 : 400 })
  } catch (e) {
    return NextResponse.json({ success: false, error: 'server-error' }, { status: 500 })
  }
}
