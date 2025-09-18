import { NextResponse } from 'next/server'

export async function GET() {
  // We rely on Supabase Auth magic link which processes tokens client-side.
  // This endpoint exists only to avoid 404 if linked by mistake.
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/sleepwalker-callback`)
}


