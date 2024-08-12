import { create } from 'zustand'

import type { Dashboard } from '@/types/types'

interface DashboardStore {
  title: string
  setTitle: (data: string) => void
  dashboard: Dashboard
  setDashboard: (data: Dashboard) => void
  dashboards: Dashboard[] | null
  setDashboards: (data: Dashboard[] | null) => void
}

const useDashboardStore = create<DashboardStore>(set => ({
  title: '',
  setTitle: (data: string) => set(state => ({ title: data })),
  dashboard: {} as Dashboard,
  setDashboard: (data: Dashboard) => set(state => ({ dashboard: data })),
  dashboards: null,
  setDashboards: (data: Dashboard[] | null) =>
    set(state => ({ dashboards: data })),
}))

export default useDashboardStore
