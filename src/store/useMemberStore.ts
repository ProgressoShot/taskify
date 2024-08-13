import { create } from 'zustand'

import { DashboardMember, DashboardMembers } from '@/types/types'

interface MemberStore {
  member: DashboardMember
  setMember: (member: DashboardMember) => void
  members: DashboardMembers
  setMembers: (members: DashboardMembers) => void
  totalCount: number
  setTotalCount: (totalCount: number) => void
}

export const useMemberStore = create<MemberStore>(set => ({
  member: {} as DashboardMember,
  setMember: (member: DashboardMember) =>
      set(state => ({ member: member })),
  members: [],
  setMembers: (members: DashboardMembers) =>
      set(state => ({ members: members })),
  totalCount: 0,
  setTotalCount: (totalCount: number) => set(state => ({ totalCount: totalCount })),
}))
