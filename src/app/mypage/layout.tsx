import { PropsWithChildren } from 'react'

import DashboardLayout from '@/layouts/DashboardLayout'

export default function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <DashboardLayout title='계정관리' className='p-10'>
      {children}
    </DashboardLayout>
  )
}
