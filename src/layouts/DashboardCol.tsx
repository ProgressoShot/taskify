import cn from 'classnames'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import Bullet from '/public/icons/bullet.svg'
import Setting from '/public/icons/settings.svg'
import ColumnEditForm from '@/app/dashboard/[id]/components/ColumnEditForm'
import api from '@/lib/axiosInstance'
import AddTaskModal from '@/components/AddTaskModal'
import NewTaskButton from '@/components/NewTaskButton'
import TaskCard from '@/components/TaskCard'
import { useTaskCards } from '@/hooks/useTaskCards'
import useModalStore from '@/store/useModalStore'
import type { Column, TaskCard as CardType } from '@/types/types'

interface DashboardColProps {
  column: Column
}

export default function DashboardCol({ column }: DashboardColProps) {
  const { id: columnId, title, dashboardId } = column
  const { taskCards, totalCount, loading, error } = useTaskCards(columnId)
  const { openModal } = useModalStore()

  const [cards, setCards] = useState<CardType[]>([])
  useEffect(() => {
    const TaskData = async () => {
      try {
        const response = await api.get(`cards?size=10&columnId=${columnId}`)
        setCards(response.data.cards)
      } catch {
        console.log('error발생', error?.message)
      }
    }
    TaskData()
  }, [setCards])

  return (
    <div className='h-auto w-full flex-none overflow-hidden border-b border-custom-gray-200 lg:h-full lg:w-[354px] lg:border-r'>
      <div className='h-full w-full overflow-auto px-5'>
        <div className='mb-[25px] mt-[22px] flex'>
          <div className='flex items-center'>
            <Bullet className='text-2 mr-2 text-custom-violet' />
            <div className='mr-3 text-lg font-bold'>{title}</div>
            <span className='flex h-5 w-5 items-center justify-center rounded bg-custom-gray-200 text-[12px]'>
              {totalCount}
            </span>
          </div>
          <button
            className='ml-auto'
            type='button'
            onClick={() => {
              openModal(<ColumnEditForm title={title} columnId={columnId} />)
            }}
          >
            <Setting className='h-[22px] w-[22px] text-custom-gray-500 md:h-6 md:w-6' />
          </button>
        </div>
        <NewTaskButton
          onClick={() =>
            openModal(
              <AddTaskModal dashboardId={dashboardId} columnId={columnId} />
            )
          }
        />

        {cards.map(card => (
          <li key={card.id}>
            <TaskCard
              card={card}
              columnTitle={title}
              dashboardId={dashboardId}
              columnId={columnId}
            />
          </li>
        ))}
      </div>
    </div>
  )
}
