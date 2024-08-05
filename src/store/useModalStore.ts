import { ReactNode } from 'react'
import { create } from 'zustand'

interface ModalState {
  isOpen: boolean
  content: ReactNode | null
  openModal: (content: ReactNode) => void
  closeModal: () => void
}

const useModalStore = create<ModalState>(set => ({
  isOpen: false,
  content: null,
  openModal: content =>
    set(state => {
      if (!state.isOpen) {
        return { isOpen: true, content }
      }
      return state
    }),
  closeModal: () =>
    set(state => {
      if (state.isOpen) {
        return { isOpen: false, content: null }
      }
      return state
    }),
}))

export default useModalStore
