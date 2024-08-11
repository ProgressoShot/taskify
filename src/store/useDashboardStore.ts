import { create } from 'zustand'

import type {Dashboard} from '@/types/types'

interface DashboardStore {
  dashboard: Dashboard
  setDashboard: (data: Dashboard) => void
  dashboardList: Dashboard[] | null
  setDashboardList: (data: Dashboard[] | null) => void
}

const useDashboardStore = create<DashboardStore>(set => ({
  dashboard: {},
  setDashboard: (data: Dashboard) => set(state => ({ dashboard: data })),
  dashboardList: null,
  setDashboardList: (data: Dashboard[] | null) => set(state => ({ dashboardList: data })),
}))

export default useDashboardStore