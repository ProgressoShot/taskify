import styles from './ResponsiveLayout.module.css'
import RootLogo from './RootLogo'

type HeaderContextProps = {
  theme?: 'dark' | 'light'
  border?: boolean
}

export type HeaderProps = HeaderContextProps & { children?: any }

function RootHeader({ theme, border, children }: HeaderProps) {
  return (
    <header
      className={`grid h-[70px] w-screen ${styles['ResponsiveLayoutLeft']} ${theme === 'dark' ? '#000000' : 'bg-[#ffffff]'}`}
    >
      <div
        className={`h-full w-full overflow-hidden px-4 py-4 md:px-6 ${border ? 'border-r-[1px] border-[#d9d9d9]' : ''}`}
      >
        <RootLogo theme={theme} />
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
