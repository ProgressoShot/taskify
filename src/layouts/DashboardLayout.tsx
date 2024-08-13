import cn from 'classnames'
import { ReactNode } from 'react'

import DashboardFeature from '@/components/DashboardFeature'
import UserProfile from '@/components/UserProfile'

import styles from './ResponsiveLayout.module.css'
import RootHeader, { HEADER_HEIGHT } from './RootHeader'
import RootSidebar from './RootSidebar'

interface DashboardLayoutProp {
  title: string
  children: ReactNode
  className?: string
}

/**
 * @todo
 * 유저 기능 컴포넌트 구현
 * 대시보드에 참여한 사용자 목록 컴포넌트 구현
 */
export default function DashboardLayout({
  title,
  children,
  className,
}: DashboardLayoutProp) {
  return (
    <main className='h-screen w-screen'>
      <RootHeader border>
        <RootHeader.Title>{title}</RootHeader.Title>
        <RootHeader.Features>
          <DashboardFeature />
          {/* 대시보드에 참여한 사용자 목록 컴포넌트 위치 */}
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
