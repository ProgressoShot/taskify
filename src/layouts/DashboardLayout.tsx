import { ReactElement } from 'react'

import styles from './ResponsiveLayout.module.css'
import RootSidebar from './RootSidebar'

export type ChildrenProp = {
  children: React.PropsWithChildren | any
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
    <div className='h-full w-full overflow-hidden bg-[#fafafa] text-custom-black-200'>
      <div className='h-full w-full overflow-auto'>
        <article className='p-10'>{children}</article>
      </div>
    </div>
  )
}

DashboardLayout.Container = Container
DashboardLayout.Sidebar = RootSidebar
DashboardLayout.Content = Content

export default DashboardLayout
