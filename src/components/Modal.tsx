import cn from 'classnames'
import { ReactNode } from 'react'

import Button from '@/components/Button'

interface ModalProps {
  className?: string
  children: ReactNode
  onClick?: () => void
}

export default function Modal({ children, className }: ModalProps) {
  const modalClass = cn('px-4 py-6 rounded-lg bg-white md:px-6', className)
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 px-6'>
      <div className={modalClass}>{children}</div>
    </div>
  )
}
