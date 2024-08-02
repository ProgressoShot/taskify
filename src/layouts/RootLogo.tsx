import Link from 'next/link'

import LogoIcon from '@/assets/logo.svg'
import LogoSymbol from '@/assets/logo-symbol.svg'

import { HeaderProps } from './RootHeader'

export default function RootLogo({ theme }: HeaderProps) {
  const fill = theme === 'dark' ? '#ffffff' : '#5534DA'

  return (
    <section className='flex h-full w-full items-center justify-center md:justify-start'>
      <Link href={'/'}>
        <LogoSymbol fill={fill} className='block md:hidden' />
        <LogoIcon fill={fill} className='hidden md:block' />
      </Link>
    </section>
  )
}
