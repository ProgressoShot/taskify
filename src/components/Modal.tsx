import cn from 'classnames'
import { ReactNode } from 'react'

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

function Alert({ children, className }: ModalProps) {
  const alertClass = cn(className)
  return (
    <div className='flex w-full items-center justify-center rounded-lg bg-white px-16 py-10 md:w-auto'>
      {children}
    </div>
  )
}

function Message({ children, className }: ModalProps) {
  const messageClass = cn(className)
  return (
    <h2 className='text-lg font-medium text-custom-black-200 md:text-xl'>
      {children}
    </h2>
  )
}

Modal.Message = Message
Modal.Alert = Alert
