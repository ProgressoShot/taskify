import { create } from 'zustand'

import type { User } from '@/types/types'

interface UserStore {
  user: User | null
  setUser: (data: User) => void
}

const useUserStore = create<UserStore>(set => ({
  user: null,
  setUser: (data: User) => set(state => ({ user: data })),
}))

export default useUserStore
