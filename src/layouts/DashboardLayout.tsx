import { ReactElement } from 'react'

import styles from './ResponsiveLayout.module.css'
import RootSidebar from './RootSidebar'

export type ChildrenProp = {
  children: ReactElement | any
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

function Content({ children }: ChildrenProp) {
  return (
    <div className='h-full w-full overflow-hidden bg-[#fafafa]'>
      <div className='h-full w-full overflow-auto'>
        <article>{children}</article>
      </div>
    </div>
  )
}

DashboardLayout.Container = Container
DashboardLayout.Sidebar = RootSidebar
DashboardLayout.Content = Content

export default DashboardLayout
