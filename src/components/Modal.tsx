'use client'

import cn from 'classnames'
import { useEffect } from 'react'

import useModalStore from '@/store/useModalStore'

export default function Modal() {
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

  return (
    <div className='fixed inset-0 flex items-center justify-center overflow-y-scroll bg-black bg-opacity-70 p-6 scrollbar-hide'>
      {content}
    </div>
  )
}
