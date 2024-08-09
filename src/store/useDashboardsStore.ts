import { create } from 'zustand'

import type { Dashboards } from '@/types/types'

interface DashboardStore {
  dashboards: Dashboards
  setDashboards: (data: Dashboards) => void
}

const useDashboardStore = create<DashboardStore>(set => ({
  dashboards: null,
  setDashboards: (data: Dashboards) => set(state => ({ dashboards: data })),
}))

export default useDashboardStore
