'use client'

import { useParams } from 'next/navigation'
import { PropsWithChildren } from 'react'

import DashboardLayout from '@/layouts/DashboardLayout'

/**
 * @todo
 * 선택된 대시보드의 이름 가져오기
 * 주스탠드에 저장된 대시보드 목록에서 dashboardid 로 title 가져올 수 잇을 듯
 */
export default function UserDashboardLayout({ children }: PropsWithChildren) {
  const { id: dashboardId } = useParams()

  return (
    <DashboardLayout
      title={`대시보드 타이틀: ${dashboardId}`}
      className='flex h-full w-full flex-col flex-nowrap lg:flex-row'
    >
      {children}
    </DashboardLayout>
  )
}
