import cn from 'classnames'
import Image from 'next/image'
import { ReactNode } from 'react'

import Calendar from '/public/icons/calendar.svg'
import TaskCardContent from '@/app/dashboard/[id]/components/TaskCardContent'
import Chip from '@/components/Chip'
import useModalStore from '@/store/useModalStore'
import type { TaskCard } from '@/types/types'

interface CardProps {
  card: TaskCard
  columnTitle: string
}

export default function TaskCard({ card, columnTitle }: CardProps) {
  const {
    id: taskCardId,
    title,
    description,
    tags,
    dueDate,
    assignee,
    imageUrl,
    createdAt,
  } = card
  const { openModal } = useModalStore()
  return (
    <button
      type='button'
      onClick={() => {
        openModal(<TaskCardContent card={card} columnTitle={columnTitle} />)
      }}
      className='mb-4 w-full rounded-md border-[1px] border-solid border-custom-gray-300 bg-white px-5 py-4 text-left'
    >
      {imageUrl && (
        <div className='h-40 w-[274px] pb-4'>
          <img
            src={imageUrl}
            alt='TaskCard 이미지'
            className='size-full rounded-md object-cover object-top'
          />
        </div>
      )}
      <div className='pb-2.5 text-base font-medium'>hi</div>
      <div className='flex pb-3'>
        {tags.map(tag => (
          <li key={tag}>
            <Chip>{tag}</Chip>
          </li>
        ))}
      </div>
      <div className='flex'>
        <div className='flex'>
          <Calendar className='mr-[6px] h-[15px] w-[15px] text-custom-gray-500' />
          <span className='text-[12px] text-custom-gray-500'>{createdAt}</span>
        </div>
        {/* 여기는 Profile 컴포넌트가 들어오겠네요
        <Profile profile={assignee} />
        */}
      </div>
    </button>
  )
}
