import { PropsWithChildren } from 'react'

import DashboardLayout from '@/layouts/DashboardLayout'

export default function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <DashboardLayout title='계정관리' className='px-3 py-4 md:px-4'>
      {children}
    </DashboardLayout>
  )
}
