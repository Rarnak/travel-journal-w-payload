import React from 'react'
import './styles.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { Header } from '../components/Header'

export const metadata: Metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

// const roboto = Inter({
//   weight: ['500', '900', '100'],
//   display: 'swap',
// })

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
