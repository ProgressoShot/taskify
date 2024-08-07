export interface Dashboard {
  id: string
  title: string
  color: string
  createdAt: Date
  updatedAt: Date
  createdByMe: boolean
  userId: string
}
export interface User {
  createdAt: Date
  email: string
  id: string
  nickname: string
  profileImageUrl: string | null
  updatedAt: Date
}

export type Dashboards = Dashboard[] | null
