'use client'

import { useParams } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'

import useRedirect from '@/hooks/useRedirect'
import DashboardLayout from '@/layouts/DashboardLayout'
import useDashboardStore from '@/store/useDashboardStore'

/**
 * @todo
 * 선택된 대시보드의 이름 가져오기
 * 주스탠드에 저장된 대시보드 목록에서 dashboardid 로 title 가져올 수 잇을 듯
 */
export default function UserDashboardLayout({ children }: PropsWithChildren) {
  useRedirect({ requireAuth: true })

  const { id } = useParams()
  const { dashboards, dashboard, setDashboard } = useDashboardStore()

  useEffect(() => {
    dashboards?.find(dashboard => {
      console.log(dashboard.id, Number(id))
      if (dashboard.id === Number(id)) {
        setDashboard(dashboard)
      }
    })
  }, [id, setDashboard, dashboards])

  return (
    <DashboardLayout
      title={dashboard.title ? dashboard.title : ''}
      className='flex h-full w-full flex-col flex-nowrap lg:flex-row'
    >
      {children}
    </DashboardLayout>
  )
}
