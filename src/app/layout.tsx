import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Modal from '@/components/Modal'

import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Taskify - 새로운 일정 관리',
  description: '새로운 일정 관리',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Modal />
      </body>
    </html>
  )
}
