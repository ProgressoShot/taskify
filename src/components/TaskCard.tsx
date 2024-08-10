import cn from 'classnames'
import { ReactNode } from 'react'

import Calendar from '/public/icons/calendar.svg'
import Chip from '@/components/Chip'
import type { TaskCard } from '@/types/types'

interface CardProps {
  card: TaskCard
}

export default function TaskCard({ card }: CardProps) {
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
  return (
    <div className='mb-4 w-full rounded-md border-[1px] border-solid border-custom-gray-300 bg-white px-5 py-4'>
      {imageUrl && (
        <div className='w-[274px] pb-4'>
          <img src={imageUrl} alt='TaskCard 이미지' className='size-full' />
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
    </div>
  )
}
