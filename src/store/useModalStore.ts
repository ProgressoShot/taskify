import { ReactNode } from 'react'
import { create } from 'zustand'

const useModalStore = create(set => ({
  isOpen: false,
  content: null,
  openModal: (content: ReactNode | null) => set({ isOpen: true, content }),
  closeModal: () => set({ isOpen: false, content: null }),
}))

export default useModalStore
