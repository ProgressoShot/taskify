import { PropsWithChildren } from 'react'

import DashboardLayout from '@/layouts/DashboardLayout'

export default function MyDashboardLayout({ children }: PropsWithChildren) {
  return (
    <DashboardLayout
      title='내 대시보드'
      className='pd-10 grid max-w-5xl gap-4 p-6 md:p-10'
    >
      {children}
    </DashboardLayout>
  )
}
