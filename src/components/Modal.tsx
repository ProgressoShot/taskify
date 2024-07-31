import cn from 'classnames'
import { ReactNode } from 'react'

import Button from '@/components/Button'

interface ModalProps {
  className?: string
  children: ReactNode
}

export default function Modal({ children }: ModalProps) {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 px-6'>
      {children}
    </div>
  )
}

function Confirm({ children, className }: ModalProps) {
  const alertClass = cn(className)
  return (
    <div className='flex flex-col items-center justify-center gap-8 rounded-lg bg-white px-10 py-8 md:px-16 md:py-10'>
      {children}
    </div>
  )
}

function Message({ children, className }: ModalProps) {
  const messageClass = cn(className)
  return (
    <h2 className='text-base font-medium text-custom-black-200 md:text-xl'>
      {children}
    </h2>
  )
}

function ConfirmButton({ children, className }: ModalProps) {
  const buttonClass = cn(className)
  return (
    <Button className='h-[42px] w-48 text-sm font-semibold md:h-12 md:w-60 md:text-base'>
      {children}
    </Button>
  )
}

Modal.Confirm = Confirm
Modal.Message = Message
Modal.ConfirmButton = ConfirmButton
