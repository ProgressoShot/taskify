'use client'

import cn from 'classnames'
import { useParams } from 'next/navigation'
import { ReactNode } from 'react'

import CrownIcon from '/public/icons/crown.svg'
import DashboardFeature from '@/components/DashboardFeature'
import DashboardMembers from '@/components/DashboardMembers'
import UserProfile from '@/components/UserProfile'
import useDashboardStore from '@/store/useDashboardStore'

import styles from './ResponsiveLayout.module.css'
import RootHeader, { HEADER_HEIGHT } from './RootHeader'
import RootSidebar from './RootSidebar'

interface DashboardLayoutProp {
  title: string | any
  children: ReactNode
  className?: string
}

export default function DashboardLayout({
  title,
  children,
  className,
}: DashboardLayoutProp) {
  const { dashboard } = useDashboardStore()
  const { id } = useParams()
  const dashboardId = Number(id)

  return (
    <main className='h-screen w-screen'>
      <RootHeader
        border
        theme='light'
        className={cn(dashboard.id === dashboardId && 'md:!px-6')}
      >
        <RootHeader.Title
          className={cn(dashboard.id === dashboardId && 'hidden lg:flex')}
        >
          <p className='overflow-hidden text-ellipsis text-nowrap'>{title}</p>
          {dashboard.id === dashboardId && dashboard.createdByMe && (
            <CrownIcon className='ml-1' style={{ color: '#FDD446' }} />
          )}
        </RootHeader.Title>
        <RootHeader.Features>
          <DashboardFeature />
          <DashboardMembers />
          <UserProfile />
        </RootHeader.Features>
      </RootHeader>

      <section
        className={cn(
          'grid h-full w-full bg-white',
          styles['ResponsiveLayoutLeft']
        )}
        style={{
          maxHeight: `calc(100% - ${HEADER_HEIGHT}px)`,
        }}
      >
        <RootSidebar />
        <div className='h-full w-full overflow-hidden bg-custom-gray-100 text-custom-black-200'>
          <div className='h-full w-full overflow-auto'>
            <article className={className}>{children}</article>
          </div>
        </div>
      </section>
    </main>
  )
}
