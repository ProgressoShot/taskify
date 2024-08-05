import { Link } from 'next/navigation'

import DashboardLayout from '@/layouts/DashboardLayout'
import RootHeader from '@/layouts/RootHeader'

export default function MyPagePage() {
  return (
    <DashboardLayout>
      <RootHeader border>
        <RootHeader.Title>계정 관리</RootHeader.Title>
        <RootHeader.Features>
          <div className='flex gap-2 border-l-[1px] border-[#d9d9d9] px-6'>
            <p>아바타</p>
            <span>이름</span>
          </div>
        </RootHeader.Features>
      </RootHeader>
      <DashboardLayout.Container>
        <DashboardLayout.Sidebar>aside</DashboardLayout.Sidebar>
        <DashboardLayout.Content>
          <Link hr>돌아가기</Link>
          <div>프로필 Modal</div>
          <div>비밀번호 변경 Modal</div>
        </DashboardLayout.Content>
      </DashboardLayout.Container>
    </DashboardLayout>
  )
}
