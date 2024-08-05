import cn from 'classnames'
import { ReactNode } from 'react'
import AddButton from '../../public/icons/add-box2.svg'

export default function NewTaskButton() {
  return (
    <div className='mb-4 flex w-80 justify-center rounded-md border-[1px] border-solid border-custom-gray-300 bg-white py-[9px]'>
      <AddButton className='h-[22px] w-[22px]' />
    </div>
  )
}
