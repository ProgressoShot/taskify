import DashboardLayout from '@/layouts/DashboardLayout'
import RootHeader from '@/layouts/RootHeader'

export default function MyDashboard() {
  return (
    <DashboardLayout>
      <RootHeader border>
        <RootHeader.Title>대시보드 이름</RootHeader.Title>
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
        <DashboardLayout.Aside>
          {/**
           * @JuhyeokC
           * @todo
           * 사이드 컴포넌트 구현 필요
           */}
          aside
        </DashboardLayout.Aside>
        <DashboardLayout.Content>
          {/**
           * @JuhyeokC
           * @todo
           * 나의 대시보드 컴포넌트 구현 필요
           */}
          content
        </DashboardLayout.Content>
      </DashboardLayout.Container>
    </DashboardLayout>
  )
}
