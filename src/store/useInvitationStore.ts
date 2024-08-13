import { create } from 'zustand'

import { Invitation, Invitations } from '@/types/types'

interface DashboardInvitaionStore {
  invitation: Invitation
  setInvitation: (data: Invitation) => void
  dashboardInvitations: Invitations
  setDashboardInvitations: (data: Invitations) => void
  totalCount: number
  setTotalCount: (data: number) => void
}

export const useDashboardInvitationStore = create<DashboardInvitaionStore>(set => ({
  invitation: {} as Invitation,
  setInvitation: (data: Invitation) =>
    set(state => ({ invitation: data })),
  dashboardInvitations: [],
  setDashboardInvitations: (data: Invitations) =>
    set(state => ({ dashboardInvitations: data })),
  totalCount: 0,
  setTotalCount: (data: number) => set(state => ({ totalCount: data })),
}))
