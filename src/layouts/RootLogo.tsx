'use client'

import Link from 'next/link'

import LogoIcon from '@/assets/logo.svg'
import LogoSymbol from '@/assets/logo-symbol.svg'
import useMediaQuery from '@/hooks/useMediaQuery'

import { HeaderProps } from './RootHeader'

export default function RootLogo({ theme }: HeaderProps) {
  const mode = useMediaQuery()
  const fill = theme === 'dark' ? '#ffffff' : '#5534DA'

  return (
    <section className='flex h-full w-full items-center justify-center md:justify-start'>
      <Link href={'/'}>
        {mode === 'mobile' ? (
          <LogoSymbol fill={fill} />
        ) : (
          <LogoIcon fill={fill} />
        )}
      </Link>
    </section>
  )
}
