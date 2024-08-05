'use client'

import cn from 'classnames'
import { useEffect } from 'react'

import useModalStore from '@/store/useModalStore'

interface ModalProps {
  className?: string
}

export default function Modal({ className }: ModalProps) {
  const { isOpen, content, closeModal } = useModalStore()

  useEffect(() => {
    if (isOpen) {
      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          closeModal()
        }
      }
      window.addEventListener('keydown', handleEsc)
      return () => {
        window.removeEventListener('keydown', handleEsc)
      }
    }
  }, [isOpen, closeModal])

  if (!isOpen) return null

  const modalClass = cn('rounded-lg bg-white', className)
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 px-6'>
      <div className={modalClass}>{content}</div>
    </div>
  )
}
