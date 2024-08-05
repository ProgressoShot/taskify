import cn from 'classnames'
import { ReactNode } from 'react'
import Chip from '@/components/Chip'
import Calendar from '../../public/icons/calendar.svg'
import Exam from '../../public/images/example-01.svg'

interface CardProps {
  children: ReactNode
}

export default function TaskCard({ children }: CardProps) {
  return (
    <div className='w-80 rounded-md border-[1px] border-solid border-custom-gray-300 bg-white px-5 py-4'>
      <div className='w-[274px] pb-4'>
        <Exam className='size-full' />
      </div>
      <div className='pb-2.5 text-base font-medium'>{children}</div>
      <div className='flex pb-2'>
        <Chip>2</Chip>
        <Chip>태그1</Chip>
      </div>
      <div className='flex'>
        <Calendar
          className='mr-[6px] h-[15px] w-[15px] text-custom-gray-500'
          viewBox='0 0 18 18'
        />
        <span className='text-[12px] text-custom-gray-500'>2022.12.31</span>
      </div>
    </div>
  )
}
