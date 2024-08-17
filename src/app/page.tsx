'use client'

import LandingFooter from '@/components/LandingFooter'
import useRedirect from '@/hooks/useRedirect'

import { Providers } from './providers'

export default function Home() {
  // useRedirect({ requireAuth: false })

  return (
    <>
      <Providers>
        <LandingFooter></LandingFooter>
      </Providers>
    </>
  )
}
