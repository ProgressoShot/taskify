import cn from 'classnames'
import { ReactNode } from 'react'

interface ChipProps {
  children: ReactNode
}

export default function Chip({ children }: ChipProps) {
  return (
    <div className='flex h-7 w-14 items-center justify-center gap-1.5 rounded-md bg-[#F9EEE3] px-6 py-4 text-sm font-normal'>
      <span>{children}</span>
    </div>
  )
}
