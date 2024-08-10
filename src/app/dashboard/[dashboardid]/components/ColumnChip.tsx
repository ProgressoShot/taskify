import { ReactNode } from 'react'

import Bullet from '/public/icons/bullet.svg'

interface ColumnChipProps {
  children: ReactNode
}
export default function ColumnChip({ children }: ColumnChipProps) {
  return (
    <div className='flex h-[26px] items-center justify-between gap-[6px] rounded-2xl bg-custom-light-violet px-2 text-xs font-normal text-custom-violet md:h-8 md:px-[10px] md:text-sm'>
      <Bullet />
      {children}
    </div>
  )
}
