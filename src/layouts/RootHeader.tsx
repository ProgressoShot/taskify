import cn from 'classnames'
import Link from 'next/link'

import LogoIcon from '../../public/logo/logo.svg'
import LogoSymbol from '../../public/logo/logo-symbol.svg'
import styles from './ResponsiveLayout.module.css'

export const HEADER_HEIGHT = 70

interface BorderProp {
  border?: boolean
}

function Logo() {
  return (
    <section className='flex h-full w-full items-center justify-center md:justify-start'>
      <Link href={'/'}>
        <LogoIcon className='hidden text-custom-violet dark:text-white md:block' />
        <LogoSymbol className='block text-custom-violet dark:text-white md:hidden' />
      </Link>
    </section>
  )
}

function Title({ children }: React.PropsWithChildren) {
  return (
    <section className='flex h-full flex-1 items-center text-custom-black-200 dark:text-white'>
      {children}
    </section>
  )
}

function Features({ children }: React.PropsWithChildren) {
  return (
    <section className='flex h-full items-center text-custom-black-200 dark:text-white'>
      {children}
    </section>
  )
}

function RootHeader({
  children,
  border,
}: React.PropsWithChildren & BorderProp) {
  const classNames: Record<string, string> = {
    wrap: cn(
      `grid h-[${HEADER_HEIGHT}px] w-full bg-white dark:bg-black`,
      styles['ResponsiveLayoutLeft']
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
        <Logo />
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
