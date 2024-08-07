'use client'

import DashboardCard from '@/components/DashboardCard'

import ReceivedInvitiationList from './components/ReceivedInvitiationList'
import { DUMMY_DATA_DASHBOARD_LIST } from '@/layouts/RootSidebar'

const 임시리스트 = DUMMY_DATA_DASHBOARD_LIST.slice(0, 5)

export default function MyDashboard() {
  return (
    <>
      <section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <DashboardCard type='add'>새로운 대시보드</DashboardCard>

        {임시리스트.map((item, index) => {
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
          style={{
            gridColumn: '1/-1',
            textAlign: 'right',
          }}
        >
          <p>대시보드 리스트 페이지네이션 컴포넌트</p>
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
