'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import api from '@/app/utils/axiosInstance'
import DashboardCard from '@/components/DashboardCard'
import DashboardCol from '@/layouts/DashboardCol'
import { getColumnList } from '@/lib/api'
import type { Column } from '@/types/types'
/**
 * @todo
 * 대시보드의 칼럼 데이터 API 요청해서 <DashboardCol title={title} /> 생성하기
 * {dashboard.column.map((item) => <DashboardCol title={item.title} />)}
 */
export default function DashboardPage() {
  const { id: dashboardId } = useParams()
  console.log(dashboardId)
  const [columns, setColumns] = useState<Column[]>([])
  useEffect(() => {
    // const nextColumns = getColumnList({ dashboardId: dashboardId })
    // setColumns([])
  }, [])
  return (
    <>
      <DashboardCol title='To Do' />
      <DashboardCol title='On Progress' />
      <DashboardCol title='Done' />
      <section className='h-auto w-full flex-none overflow-hidden border-r border-custom-gray-200 lg:h-full lg:w-[354px]'>
        <div className='p-5 lg:py-16'>
          <p>대시보드 ID: {dashboardId}</p>
          <DashboardCard type='add'>새로운 칼럼 추가하기</DashboardCard>
        </div>
      </section>
    </>
  )
}
