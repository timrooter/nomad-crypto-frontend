import type { Metadata } from 'next'

import { ReactNode } from 'react'

import { Header } from '@/components/header'
import { StoreProvider } from '@/components/store-provider'
import { cn } from '@/lib/utils'
import { Inter as FontSans } from 'next/font/google'
import { CookiesProvider } from 'next-client-cookies/server'

import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  description:
    'Pay for goods and services with cryptocurrency using the secure and convenient Blur virtual card.',
  title: 'Blur',
  icons: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      sizes: '24x24',
      url: '/icon.svg',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang={'en'}>
      <body
        className={cn(
          'grid min-h-screen grid-rows-[auto_1fr_auto] font-sans antialiased',
          fontSans.variable
        )}
      >
        <CookiesProvider>
          <StoreProvider>
            <Header />
            <div className={'overflow-x-hidden px-6 py-4 md:px-16 md:py-12'}>{children}</div>
            <small className={'mb-2 text-center text-muted-foreground'}>
              ©️ 2024 Blur. All Rights Reserved.
            </small>
          </StoreProvider>
        </CookiesProvider>
      </body>
    </html>
  )
}
