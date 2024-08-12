'use client'

import { useState } from 'react'

import DashboardCard from '@/components/DashboardCard'
import Pagination from '@/components/Pagination'
import usePagination from '@/hooks/usePagination'
import useDashboardStore from '@/store/useDashboardStore'
import { Dashboards } from '@/types/types'

import ReceivedInvitiationList from './components/ReceivedInvitiationList'

type PaginationAction = 'prev' | 'next'

const ITEM_PER_PAGE = 5

export default function MyDashboard() {
  const { dashboards } = useDashboardStore()
  const [list, setList] = useState<Dashboards>(null)

  if (dashboards !== null && list === null)
    setList(dashboards?.slice(0, Math.min(5, dashboards.length)) || null)

  const { page, totalPages, prevPage, nextPage, noMorePrev, noMoreNext } =
    usePagination({
      totalItems: dashboards?.length || 0,
      itemsPerPage: ITEM_PER_PAGE,
    })

  const handlePagination = async (action: PaginationAction) => {
    let start: number, end: number
    switch (action) {
      case 'prev':
        start = (page - 2) * ITEM_PER_PAGE
        end = (page - 1) * ITEM_PER_PAGE
        setList(
          dashboards?.slice(start, Math.min(end, dashboards.length)) || null
        )
        prevPage()
        break
      default:
        start = page * ITEM_PER_PAGE
        end = (page + 1) * ITEM_PER_PAGE
        setList(
          dashboards?.slice(start, Math.min(end, dashboards.length)) || null
        )
        nextPage()
        break
    }
  }

  return (
    <>
      <section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <DashboardCard type='add' onClick={() => alert('대시보드 생성 모달')}>
          새로운 대시보드
        </DashboardCard>
        {list &&
          list.map((item, index) => {
            return (
              <DashboardCard
                href={`/dashboard/${item.id}`}
                type='card'
                key={`dashboard-card-${index}`}
                color={item.color}
                createdByMe={item.createdByMe}
              >
                {item.title}
              </DashboardCard>
            )
          })}
        <div
          className='flex items-center justify-end'
          style={{
            gridColumn: '1/-1',
            textAlign: 'right',
          }}
        >
          <Pagination>
            <Pagination.Pages>
              {totalPages} 페이지 중 {page}
            </Pagination.Pages>
            <Pagination.Prev
              prevPage={() => handlePagination('prev')}
              disabled={noMorePrev}
            ></Pagination.Prev>
            <Pagination.Next
              nextPage={() => handlePagination('next')}
              disabled={noMoreNext}
            ></Pagination.Next>
          </Pagination>
        </div>
      </section>

      <section className='rounded-lg bg-white'>
        <div className='p-6 md:p-8'>
          <h2 className='text-2xl font-semibold'>초대받은 대시보드</h2>
        </div>
        <ReceivedInvitiationList />
      </section>
    </>
  )
}
