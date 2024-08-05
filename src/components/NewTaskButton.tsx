import cn from 'classnames'
import { ReactNode } from 'react'
import AddButton from '../../public/icons/add-box2.svg'

interface NewTaskButtonProps {
  onClick?: () => void
}

export default function NewTaskButton({ onClick }: NewTaskButtonProps) {
  return (
    <button
      onClick={onClick}
      className='mb-4 flex w-80 justify-center rounded-md border-[1px] border-solid border-custom-gray-300 bg-white py-[9px] hover:bg-custom-gray-100'
    >
      <AddButton className='h-[22px] w-[22px]' />
    </button>
  )
}

// TODO: onClick시, 할일 생성 모달이 열려야 합니다.
