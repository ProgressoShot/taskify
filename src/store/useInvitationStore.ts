import { create } from 'zustand'

import { Invitation, Invitations } from '@/lib/types'

interface DashboardInvitaionStore {
  invitation: Invitation
  setInvitation: (data: Invitation) => void
  invitations: Invitations
  setInvitations: (data: Invitations) => void
  totalCount: number
  setTotalCount: (data: number) => void
}

export const useDashboardInvitationStore = create<DashboardInvitaionStore>(set => ({
  invitation: {} as Invitation,
  setInvitation: (data: Invitation) =>
    set(state => ({ invitation: data })),
  invitations: [],
  setInvitations: (data: Invitations) =>
    set(state => ({ invitations: data })),
  totalCount: 0,
  setTotalCount: (data: number) => set(state => ({ totalCount: data })),
}))
