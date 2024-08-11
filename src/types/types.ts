export type Color =
  | 'violet'
  | 'red'
  | 'green'
  | 'purple'
  | 'orange'
  | 'blue'
  | 'pink'

export const COLOR_CLASSNAME: Record<Color, string> = {
  violet: 'text-custom-violet',
  red: 'text-custom-red',
  green: 'text-custom-green',
  purple: 'text-custom-purple',
  orange: 'text-custom-orange',
  blue: 'text-custom-blue',
  pink: 'text-custom-pink',
}

export type DashboardCardType = 'card' | 'side' | 'add'

export interface Dashboard {
  id?: number
  title?: string
  color?: string
  createdAt?: Date
  updatedAt?: Date
  createdByMe?: boolean
  userId?: string
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

export interface Column {
  id: number
  title: string
  teamId: string
  dashboardId: number
  createdAt: Date
  updatedAt: Date
}

export interface TaskCard {
  id: string
  title: string
  description: string
  tags: string[]
  dueDate: string
  assignee: {
    profileImageUrl: string
    nickname: string
    id: string
  }
  imageUrl: string
  teamId: string
  columnId: string
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  cardId: string
  author: {
    profileImageUrl: string
    nickname: string
    id: string
  }
}
