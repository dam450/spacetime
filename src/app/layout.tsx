import { ReactNode } from 'react'
import './globals.css'

import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as Jamjuree,
} from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

const jamjuree = Jamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-jamjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description: 'Uma cápsula do tempo construída com React e Next.js',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.variable} ${jamjuree.variable} bg-gray-900 font-sans text-gray-100 `}
      >
        {children}
      </body>
    </html>
  )
}
