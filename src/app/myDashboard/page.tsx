import { DashboardName, DashboardNameProps } from '@/components/DashboardName'
import DashboardLayout, { ChildrenProp } from '@/layouts/DashboardLayout'
import RootHeader from '@/layouts/RootHeader'

type DashboardInfo = {
  id: number
  title: string
  color: string
  createdAt: Date
  updatedAt: Date
  createdByMe: Boolean
  userId: number
}

interface DashboardCardProps extends DashboardNameProps {
  onClick?: () => void
}

function DashboardCard({ type, children, onClick }: DashboardCardProps) {
  const classNames =
    type === 'side'
      ? 'py-3 px-4'
      : 'round-container h-full w-full border border-custom-gray-300 bg-white p-5'

  return (
    <button
      onClick={onClick}
      className={`rounded-lg transition hover:bg-custom-gray-100 ${classNames}`}
    >
      <DashboardName type={type}>{children}</DashboardName>
    </button>
  )
}

function DashboardCardList({ children }: ChildrenProp) {
  return (
    <section
      className='grid gap-4'
      style={{
        gridTemplateColumns: 'repeat(3, 1fr)',
      }}
    >
      <DashboardCard type='add'>새로운 대시보드</DashboardCard>
      {children}
    </section>
  )
}

const DASHBOARD_TEMP_ARRAY = Array.from(
  { length: 5 },
  (_, index) => `대시보드-${index + 1}`
)

export default function MyDashboard() {
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
          <DashboardCardList>
            {DASHBOARD_TEMP_ARRAY.map((item, index) => {
              return (
                <DashboardCard type='card' key={`dashboard-card-${index}`}>
                  {item}
                </DashboardCard>
              )
            })}
          </DashboardCardList>
        </DashboardLayout.Content>
      </DashboardLayout.Container>
    </DashboardLayout>
  )
}
