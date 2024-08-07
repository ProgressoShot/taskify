export interface Dashboard {
  id: string
  title: string
  color: string
  createdAt: Date
  updatedAt: Date
  createdByMe: boolean
  userId: string
}

export type Dashboards = Dashboard[] | null
