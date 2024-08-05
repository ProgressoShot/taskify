'use client'

import DashboardCard from '@/components/DashboardCard'
import DashboardLayout from '@/layouts/DashboardLayout'
import RootHeader from '@/layouts/RootHeader'

const DASHBOARD_TEMP_ARRAY: string[] = Array.from(
  { length: 5 },
  (_: never, index: number) => `대시보드-${index + 1}`
)

const COLUMN_TEMP_ARRAY: string[] = Array.from(
  { length: 3 },
  (_: never, index: number) => `COL-${index + 1}`
)

export default function Dashboard() {
  return (
    <DashboardLayout>
      <RootHeader border>
        <RootHeader.Title>내 대시보드</RootHeader.Title>
        <RootHeader.Features>
          {/**
           * @JuhyeokC
           * @todo
           * 기능 컴포넌트 구현 필요
           */}
          <div className='flex gap-9 px-6'>
            <p>관리</p>
            <p>초대하기</p>
          </div>
          <div className='flex gap-2 border-l-[1px] border-[#d9d9d9] px-6'>
            <p>아바타</p>
            <span>이름</span>
          </div>
        </RootHeader.Features>
      </RootHeader>
      <DashboardLayout.Container>
        <DashboardLayout.Sidebar>
          {/**
           * @JuhyeokC
           * @todo
           * 사이드 컴포넌트 구현 필요
           */}
<<<<<<< HEAD
          {DASHBOARD_TEMP_ARRAY.map((item: string, index: number) => {
            return (
              <DashboardCard type='side' key={`dashboard-side-${index}`}>
                {item}
              </DashboardCard>
            )
          })}
        </DashboardLayout.Sidebar>
        <DashboardLayout.Content className='flex h-full w-full flex-col flex-nowrap lg:flex-row'>
          {/**
           * @JuhyeokC
           * @todo
           * 대시보드 컴포넌트 구현 필요
           */}
          {COLUMN_TEMP_ARRAY.map((item: string, index: number) => {
            return (
              <section
                key={`column-${index}`}
                className='h-auto w-full flex-none overflow-hidden border-b border-custom-gray-200 lg:h-full lg:w-[354px] lg:border-r'
              >
                <article className='h-full w-full overflow-auto px-5 py-6'>
                  <span className='block w-full'>{item}</span>
                </article>
              </section>
            )
          })}
          <section className='h-auto w-full flex-none overflow-hidden border-r border-custom-gray-200 lg:h-full lg:w-[354px]'>
            <div className='px-5 py-5 lg:py-16'>
              <DashboardCard type='add'>새로운 칼럼 추가하기</DashboardCard>
            </div>
          </section>
=======
          aside
        </DashboardLayout.Sidebar>
        <DashboardLayout.Content>
          {/**
           * @JuhyeokC
           * @todo
           * 나의 대시보드 컴포넌트 구현 필요
           */}
          content
>>>>>>> origin/feat/#13
        </DashboardLayout.Content>
      </DashboardLayout.Container>
    </DashboardLayout>
  )
}
