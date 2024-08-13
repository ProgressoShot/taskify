'use client'

import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import AddIcon from '/public/icons/add-box.svg'
import { getDashboardList } from '@/app/utils/dashboardsApi'
import CreateDashboardModal from '@/components/CreateDashboardModal'
import DashboardCard from '@/components/DashboardCard'
import useDashboardStore from '@/store/useDashboardStore'
import useModalStore from '@/store/useModalStore'

import { HEADER_HEIGHT } from './RootHeader'

export default function RootSidebar() {
  const { id: dashboardId } = useParams()
  const { dashboards, setDashboards } = useDashboardStore()
  const { openModal } = useModalStore()

  const ListElement = useRef<HTMLElement>(null)

  const getDashboard = async () => {
    const data = await getDashboardList()
    setDashboards(data)
  }

  useEffect(() => {
    if (dashboards === null) getDashboard()
  })

  useEffect(() => {
    // 무한스크롤 구현을 위한 대시보드 목록 높이 확인용
    const areaHeight =
      ListElement?.current?.offsetHeight ||
      window.innerHeight - HEADER_HEIGHT - 64
    // console.log(Math.round((areaHeight - 32) / 60) + 1)
  }, [])

  return (
    <div className='h-full w-full overflow-hidden border-r border-custom-gray-300'>
      <section className='flex h-16 items-center justify-center px-6 md:justify-between'>
        <p className='hidden whitespace-nowrap text-xs font-semibold text-custom-gray-500 md:block'>
          Dash Boards
        </p>
        <button
          className='p-0.5'
          onClick={() => openModal(<CreateDashboardModal />)}
        >
          <AddIcon className='text-custom-gray-500' />
        </button>
      </section>
      <section
        ref={ListElement}
        className='flex flex-col gap-2 overflow-auto px-2 pb-6 text-slate-800'
        style={{
          height: 'calc(100% - 4rem)',
        }}
      >
        {dashboards &&
          dashboards.map((item, index) => {
            return (
              <DashboardCard
                key={`dashboard-side-${index}`}
                href={`/dashboard/${item.id}`}
                type='side'
                color={item.color}
                createdByMe={item.createdByMe}
                active={item.id === Number(dashboardId)}
              >
                {item.title}
              </DashboardCard>
            )
          })}
      </section>
    </div>
  )
}
