import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = [
  '/wallet',
  '/transactions',
  '/transactions/direct',
  '/transactions/qr-gen',
  '/transactions/qr-scan',
  '/transactions/history',
  '/transactions/card',
  '/transactions/confirm',
]

export default function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')

  const isAuthenticated = !!accessToken

  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL('/auth/login', req.nextUrl.origin)

    return NextResponse.redirect(absoluteURL.toString())
  }
}
