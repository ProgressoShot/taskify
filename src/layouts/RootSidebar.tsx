'use client'

import { useEffect, useRef } from 'react'

import AddIcon from '/public/icons/add-box.svg'
import DashboardCard from '@/components/DashboardCard'
import { Color } from '@/components/DashboardName'

import { HEADER_HEIGHT } from './RootHeader'

type Dashboard = {
  id: number
  title: string
  color: Color
  createdAt: string
  updatedAt: string
  createdByMe: boolean
  userId?: number
}

const Colors: Array<Color> = ['green', 'purple', 'orange', 'blue', 'pink']

const TEMP_createdByMe = [false, false, true, false, false]

export const DUMMY_DATA_DASHBOARD_LIST: Array<Dashboard> = Array.from(
  { length: 32 },
  (_, index) => {
    return {
      id: index,
      title: `대시보드-${index}`,
      color: Colors[index % 5],
      createdAt: '2024-08-07T08:23:37.509Z',
      updatedAt: '2024-08-07T08:23:37.509Z',
      createdByMe: TEMP_createdByMe[index % 5],
    }
  }
)

/**
 * @todo
 * 주스탠드에서 대시보드 목록 불러오기
 * 선택된 대시보드 ON 효과 적용하기
 */
export default function RootSidebar() {
  const ListElement = useRef<HTMLElement>(null)

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
        <button className='p-0.5'>
          <AddIcon className='text-custom-gray-500' />
        </button>
      </section>
      <section
        ref={ListElement}
        className='flex flex-col gap-2 overflow-auto p-2 pb-6 text-slate-800'
        style={{
          height: 'calc(100% - 4rem)',
        }}
      >
        {DUMMY_DATA_DASHBOARD_LIST.map((item, index) => {
          return (
            <DashboardCard
              key={`dashboard-side-${index}`}
              href={`/dashboard/${item.id}`}
              type='side'
              color={item.color}
              createdByMe={item.createdByMe}
            >
              {item.title}
            </DashboardCard>
          )
        })}
      </section>
    </div>
  )
}
