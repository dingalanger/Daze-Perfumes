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

    // Support both v2 (checkbox) and v3 (score-based):
    // - v2: no score/action fields, only success boolean
    // - v3: success + score + action
    const isV3 = typeof data.score === 'number'
    const scoreIsOk = !isV3 || data.score >= 0.5
    const actionIsOk = !isV3 || typeof data.action !== 'string' || data.action === 'waitlist_submit'
    const ok = Boolean(data.success) && scoreIsOk && actionIsOk
    return NextResponse.json({ success: ok, raw: data }, { status: ok ? 200 : 400 })
  } catch (err) {
    return NextResponse.json({ success: false, error: 'exception' }, { status: 500 })
  }
}
