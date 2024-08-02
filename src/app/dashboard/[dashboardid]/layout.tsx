'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import DashboardLayout from '@/layouts/DashboardLayout'
import RootHeader from '@/layouts/RootHeader'

export default function DashboardIdLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { dashboardid } = useParams()

  return (
    <DashboardLayout>
      <RootHeader border>
        <RootHeader.Title>대시보드 ID: {dashboardid}</RootHeader.Title>
        <RootHeader.Features>
          <div className='flex gap-9 px-6'>
            <Link href={`/dashboard/${dashboardid}/edit`}>관리</Link>
            <button>초대하기</button>
          </div>
          <div className='flex gap-2 border-l-[1px] border-[#d9d9d9] px-6'>
            <p>아바타</p>
            <span>이름</span>
          </div>
        </RootHeader.Features>
      </RootHeader>
      <DashboardLayout.Container>
        <DashboardLayout.Sidebar>aside</DashboardLayout.Sidebar>
        <DashboardLayout.Content>{children}</DashboardLayout.Content>
      </DashboardLayout.Container>
    </DashboardLayout>
  )
}
