import { ReactNode } from 'react'

import Left from '/public/icons/caret-left.svg'
import Right from '/public/icons/caret-right.svg'

interface PaginationProps {
  children: ReactNode
}
interface PrevProps {
  prevPage: () => void
  disabled: boolean
}
interface NextProps {
  nextPage: () => void
  disabled: boolean
}

export default function Pagination({ children }: PaginationProps) {
  return <div className='flex text-base text-custom-black-200'></div>
}

function Prev({ prevPage, disabled }: PrevProps) {
  return (
    <button
      className='flex h-10 w-10 items-center justify-center rounded-l-[4px] border border-custom-gray-300 bg-white disabled:cursor-not-allowed disabled:text-custom-gray-300'
      onClick={prevPage}
      disabled={disabled}
    >
      <Left />
    </button>
  )
}
function Next({ nextPage, disabled }: NextProps) {
  return (
    <button
      className='flex h-10 w-10 items-center justify-center rounded-r-[4px] border border-custom-gray-300 bg-white disabled:cursor-not-allowed disabled:text-custom-gray-300'
      onClick={nextPage}
      disabled={disabled}
    >
      <Right />
    </button>
  )
}

Pagination.Prev = Prev
Pagination.Next = Next
