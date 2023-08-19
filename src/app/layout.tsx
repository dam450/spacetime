import { ReactNode } from 'react'
import { cookies } from 'next/headers'
import './globals.css'

import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as Jamjuree,
} from 'next/font/google'

import { Copyright } from '@/components/Copyright'
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'

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
  const isAuthenticated = cookies().has('token')

  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.variable} ${jamjuree.variable} bg-gray-900 font-sans text-gray-100 `}
      >
        <main className="grid min-h-screen grid-cols-2">
          {/* left panel */}
          <div className="relative flex flex-1 flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
            {/* blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
            {/* stripes */}
            <div className="absolute bottom-0 right-1 top-0 w-2  bg-stripes" />

            {isAuthenticated ? (
              <Profile key={'authenticated'} />
            ) : (
              <SignIn key={'unauthenticated'} />
            )}

            <Hero />

            <Copyright />
          </div>

          {/* right panel */}
          <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
