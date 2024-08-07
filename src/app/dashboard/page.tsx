'use client'

import DashboardCard from '@/components/DashboardCard'
import DashboardCol from '@/layouts/DashboardCol'

export default function Dashboard() {
  /**
   * @todo
   * [dashboardid] page.tsx 에서
   * 대시보드의 칼럼 데이터로 <DashboardCol title={title} /> 생성하기
   * {dashboard.column.map((item) => <DashboardCol title={item.title} />)}
   */

  return (
    <div className='p-5'>
      <p>대시보드를 선택해주세요.</p>
    </div>
  )
}
