import cn from 'classnames'
import { ReactNode } from 'react'

import Chip from '@/components/Chip'

import Calendar from '../../public/icons/calendar.svg'

interface CardProps {
  children: ReactNode
  imageSrc?: string
}

export default function Card({ children, imageSrc }: CardProps) {
  return (
    <div className='mb-4 w-80 rounded-md border-[1px] border-solid border-custom-gray-300 bg-white px-5 py-4'>
      {imageSrc && (
        <div className='w-[274px] pb-4'>
          <img src={imageSrc} alt='TaskCard 이미지' className='size-full' />
        </div>
      )}
      <div className='pb-2.5 text-base font-medium'>{children}</div>
      <div className='flex pb-3'>
        <Chip>2</Chip>
        <Chip>태그1</Chip>
      </div>
      <div className='flex'>
        <div className='flex'>
          <Calendar
            className='mr-[6px] h-[15px] w-[15px] text-custom-gray-500'
            viewBox='0 0 18 18'
          />
          <span className='text-[12px] text-custom-gray-500'>2022.12.31</span>
        </div>
        <span className='text-4 ml-auto mt-[-3px] flex h-6 w-6 justify-center rounded-[50%] bg-custom-green text-white'>
          B
        </span>
      </div>
    </div>
  )
}
