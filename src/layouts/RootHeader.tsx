import cn from 'classnames'
import Link from 'next/link'

import LogoIcon from '../../public/logo/logo.svg'
import LogoSymbol from '../../public/logo/logo-symbol.svg'
import styles from './ResponsiveLayout.module.css'

export const HEADER_HEIGHT = 70

type Theme = 'dark' | 'light'
interface ThemeProp {
  theme?: Theme
}

interface BorderProp {
  border?: boolean
}

interface HeaderProps extends ThemeProp, BorderProp {}

function Logo({ theme }: ThemeProp) {
  const fill: string = theme === 'dark' ? 'text-white' : 'text-custom-violet'
  const classNames: Record<string, string> = {
    icon: cn('hidden md:block', fill),
    symbol: cn('block md:hidden', fill),
  }

  return (
    <section className='flex h-full w-full items-center justify-center md:justify-start'>
      <Link href={'/'}>
        <LogoIcon className={classNames.icon} />
        <LogoSymbol className={classNames.symbol} />
      </Link>
    </section>
  )
}

function Title({ children, theme }: React.PropsWithChildren & ThemeProp) {
  const classNames: string = cn(
    'flex flex-1 h-full items-center',
    theme === 'dark' ? 'text-white' : 'text-custom-black-200'
  )

  return <section className={classNames}>{children}</section>
}

function Features({ children, theme }: React.PropsWithChildren & ThemeProp) {
  const classNames: string = cn(
    'flex h-full items-center',
    theme === 'dark' ? 'text-white' : 'text-custom-black-200'
  )

  return <section className={classNames}>{children}</section>
}

function RootHeader({
  children,
  theme,
  border,
}: React.PropsWithChildren & ThemeProp & BorderProp) {
  const classNames: Record<string, string> = {
    wrap: cn(
      `grid h-[${HEADER_HEIGHT}px] w-full`,
      styles['ResponsiveLayoutLeft'],
      theme !== 'dark' && 'bg-white'
    ),
    left: cn(
      'h-full w-full overflow-hidden px-4 py-4 md:px-6',
      border && 'border-r border-custom-gray-300'
    ),
    right: cn(
      'h-full w-full overflow-hidden px-10 py-4',
      border && 'border-b border-custom-gray-300'
    ),
  }

  return (
    <header className={classNames.wrap}>
      <div className={classNames.left}>
        <Logo theme={theme} />
      </div>
      <div className={classNames.right}>
        <section className='relative flex h-full w-full items-center justify-end'>
          {children}
        </section>
      </div>
    </header>
  )
}

RootHeader.Title = Title
RootHeader.Features = Features

export default RootHeader
