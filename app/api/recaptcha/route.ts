import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { token } = await request.json()
    if (!token) return NextResponse.json({ success: false, error: 'missing_token' }, { status: 400 })

    const secret = process.env.RECAPTCHA_SECRET_KEY
    if (!secret) return NextResponse.json({ success: false, error: 'server_not_configured' }, { status: 500 })

    const params = new URLSearchParams()
    params.append('secret', secret)
    params.append('response', token)

    const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    })
    const data = await resp.json()

    const ok = Boolean(data.success) && (typeof data.score !== 'number' || data.score >= 0.5)
    return NextResponse.json({ success: ok, raw: data }, { status: ok ? 200 : 400 })
  } catch (err) {
    return NextResponse.json({ success: false, error: 'exception' }, { status: 500 })
  }
}
