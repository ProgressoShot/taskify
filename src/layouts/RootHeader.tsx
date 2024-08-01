import Link from 'next/link'

import LogoIcon from '@/assets/logo.svg'
import LogoSymbol from '@/assets/logo-symbol.svg'

type HeaderContextProps = {
  size?: 'large' | 'medium' | 'small'
  theme?: 'dark' | 'light'
  border?: boolean
}

type HeaderProps = HeaderContextProps & { children?: any }

function RootHeader({ theme, border, children }: HeaderProps) {
  return (
    <header
      className={`grid h-[70px] w-screen ${theme === 'dark' ? '#000000' : 'bg-[#ffffff]'}`}
      style={{
        gridTemplateColumns: '300px auto',
      }}
    >
      <div
        className={`h-full w-full overflow-hidden px-6 py-4 ${border ? 'border-r-[1px] border-[#d9d9d9]' : ''}`}
      >
        <LogoSection theme={theme} />
      </div>
      <div
        className={`h-full w-full overflow-hidden px-10 py-4 ${border ? 'border-b-[1px] border-[#d9d9d9]' : ''}`}
      >
        <section className='relative flex h-full w-full items-center justify-end'>
          {children}
        </section>
      </div>
    </header>
  )
}

/**
 * @todo 반응형 작업: 모바일일 때 LogoSymbol
 */
function LogoSection({ theme }: HeaderProps) {
  const fill = theme === 'dark' ? '#ffffff' : '#5534DA'

  return (
    <section className='flex h-full w-full items-center'>
      <Link href={'/'}>
        <LogoIcon fill={fill} />
        {/* <LogoSymbol fill={fill} /> */}
      </Link>
    </section>
  )
}

function Title({ theme, children }: HeaderProps) {
  const classNames = `flex flex-1 h-full items-center ${theme === 'dark' ? 'text-[#ffffff]' : 'text-[#333236]'}`
  return <section className={classNames}>{children}</section>
}

function Features({ theme, children }: HeaderProps) {
  const classNames = `flex h-full items-center ${theme === 'dark' ? 'text-[#ffffff]' : 'text-[#333236]'}`
  return <section className={classNames}>{children}</section>
}

RootHeader.Title = Title
RootHeader.Features = Features

export default RootHeader
