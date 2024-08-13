import cn from 'classnames'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import Bullet from '/public/icons/bullet.svg'
import Setting from '/public/icons/settings.svg'
import ColumnEditForm from '@/app/dashboard/[id]/components/ColumnEditForm'
import api from '@/app/utils/axiosInstance'
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

  // const taskCard = {
  //   id: 0,
  //   title: '새로운 일정 관리 Taskify',
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus nibh arcu, quis consequat ante cursus eget. Cras mattis, nulla non laoreet porttitor, diam justo laoreet eros, vel aliquet diam elit at leo.',
  //   tags: ['프로젝트', '일반', '백엔드', '상'],
  //   dueDate: '2024.09.11 19:00',
  //   assignee: {
  //     profileImageUrl: 'string',
  //     nickname: '배유철',
  //     id: 0,
  //   },
  //   imageUrl:
  //     'https://i.namu.wiki/i/DIWQPMFg_xE7JxIv0-4M5PbXco2d-BynsivSWqt6enqDgXOKw0nuZznBUGV-7FtJilQEY7zxodg1kZcYlQXDJw.webp',
  //   teamId: '7-2',
  //   columnId: 0,
  //   createdAt: '2024-08-10T16:55:52.421Z',
  //   updatedAt: '2024-08-10T16:55:52.421Z',
  // }

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

        {/* <TaskCard card={taskCard} columnTitle={title} /> */}
        {cards.map(card => (
          <li key={card.id}>
            <TaskCard card={card} columnTitle={title} />
          </li>
        ))}
      </div>
    </div>
  )
}
