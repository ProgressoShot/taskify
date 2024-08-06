import cn from 'classnames'

import TaskCard from '../components/TaskCard'
import DashboardCol from './DashboardCol'
import styles from './ResponsiveLayout.module.css'
import { HEADER_HEIGHT } from './RootHeader'
import RootSidebar from './RootSidebar'

interface ClassNameProp {
  className?: string
}

function DashboardLayout({ children }: React.PropsWithChildren) {
  return <main className='h-screen w-screen'>{children}</main>
}

function Container({ children }: React.PropsWithChildren) {
  const classNames: string = cn(
    'grid h-full w-full bg-white',
    styles['ResponsiveLayoutLeft']
  )

  return (
    <section
      className={classNames}
      style={{
        maxHeight: `calc(100% - ${HEADER_HEIGHT}px)`,
      }}
    >
      {children}
    </section>
  )
}

function Content({
  children,
  className,
}: React.PropsWithChildren & ClassNameProp) {
  const classNames: string = cn(className)
  return (
    <div className='h-full w-full overflow-hidden bg-custom-gray-100 text-custom-black-200'>
      <div className='h-full w-full overflow-auto'>
        <article className={className}>{children}</article>
      </div>
    </div>
  )
}

DashboardLayout.Container = Container
DashboardLayout.Sidebar = RootSidebar
DashboardLayout.Content = Content

export default DashboardLayout
