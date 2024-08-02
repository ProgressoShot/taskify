import DashboardLayout from '@/layouts/DashboardLayout'
import RootHeader from '@/layouts/RootHeader'
import { DashboardCard } from './components/DashboardCard'

const DASHBOARD_TEMP_ARRAY = Array.from(
  { length: 5 },
  (_, index) => `대시보드-${index + 1}`
)

export default function MyDashboardPage() {
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
          {DASHBOARD_TEMP_ARRAY.map((item, index) => {
            return (
              <DashboardCard type='side' key={`dashboard-side-${index}`}>
                {item}
              </DashboardCard>
            )
          })}
        </DashboardLayout.Sidebar>
        <DashboardLayout.Content>
          {/**
           * @JuhyeokC
           * @todo
           * 나의 대시보드 컴포넌트 구현 필요
           */}

          <section
            className='grid gap-4'
            style={{
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
          >
            <DashboardCard type='add'>새로운 대시보드</DashboardCard>

            {DASHBOARD_TEMP_ARRAY.map((item, index) => {
              return (
                <DashboardCard type='card' key={`dashboard-card-${index}`}>
                  {item}
                </DashboardCard>
              )
            })}
          </section>
        </DashboardLayout.Content>
      </DashboardLayout.Container>
    </DashboardLayout>
  )
}
