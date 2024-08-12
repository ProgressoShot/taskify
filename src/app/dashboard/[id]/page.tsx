'use client'
import { useParams } from 'next/navigation'

import ColumnCreateForm from '@/app/dashboard/[id]/components/ColumnCreateForm'
import DashboardCard from '@/components/DashboardCard'
import { useColumns } from '@/hooks/useColumns'
import DashboardCol from '@/layouts/DashboardCol'
import useModalStore from '@/store/useModalStore'

export default function DashboardPage() {
  const { openModal } = useModalStore()
  const { id } = useParams()
  const dashboardId = Number(id)
  const { columns, loading, error } = useColumns(dashboardId)

  if (loading) {
    return <div>로딩중...</div>
  }

  if (error) return <div>에러...</div>
  const columnTitles = columns.map(column => column.title)
  return (
    <>
      {columns.map(column => (
        <li key={column.id}>
          <DashboardCol column={column} />
        </li>
      ))}

      <section className='h-auto w-full flex-none overflow-hidden border-r border-custom-gray-200 lg:h-full lg:w-[354px]'>
        <div className='p-5 lg:py-16'>
          <DashboardCard
            type='add'
            onClick={() =>
              openModal(
                <ColumnCreateForm
                  dashboardId={dashboardId}
                  columnTitles={columnTitles}
                />
              )
            }
          >
            새로운 칼럼 추가하기
          </DashboardCard>
        </div>
      </section>
    </>
  )
}
