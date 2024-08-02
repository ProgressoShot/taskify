import { ReactElement } from 'react'

import styles from './ResponsiveLayout.module.css'
import RootSidebar from './RootSidebar'

export interface ChildrenProp {
  children?: React.PropsWithChildren | any
}

interface ContentProps extends ChildrenProp {
  className?: string
}

function DashboardLayout({ children }: ChildrenProp) {
  return <main>{children}</main>
}

function Container({ children }: ChildrenProp) {
  return (
    <section
      className={`grid h-screen w-screen bg-white ${styles['ResponsiveLayoutLeft']}`}
    >
      {children}
    </section>
  )
}

function Content({ children, className }: ContentProps) {
  const classNames = `p-10 ${className ? className : ''}`
  return (
    <div className='h-full w-full overflow-hidden bg-[#fafafa] text-custom-black-200'>
      <div className='h-full w-full overflow-auto'>
        <article className={classNames}>{children}</article>
      </div>
    </div>
  )
}

DashboardLayout.Container = Container
DashboardLayout.Sidebar = RootSidebar
DashboardLayout.Content = Content

export default DashboardLayout
