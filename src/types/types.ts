import { PropsWithChildren, ReactNode } from 'react'

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

export interface User {
  createdAt?: Date
  email: string
  id: number
  nickname: string
  profileImageUrl?: string
  updatedAt?: Date
}

export interface Invitation {
  id: number
  dashboard: Dashboard
  teamId: string
  inviter: User
  invitee: User
  inviteAccepted: boolean
  createdAt: string
  updatedAt: string
}

export type Invitations = Invitation[] | null

export interface ListDashboardInvitationsResponse {
  totalCount: number
  invitations: Invitations
}

export interface ListCursorIDInvitationsResponse {
  cursorID: number
  invitations: Invitations
}

export interface Dashboard {
  id?: number
  title?: string
  color?: string
  createdAt?: Date
  updatedAt?: Date
  createdByMe?: boolean
  userId?: number
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

export type DashboardCardType = 'card' | 'side' | 'add'

export interface TaskCard {
  id: number
  title: string
  description: string
  tags: string[]
  dueDate: string
  assignee: {
    profileImageUrl: string
    nickname: string
    id: number
  }
  imageUrl: string
  teamId: string
  columnId: number
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  cardId: number
  author: {
    profileImageUrl: string
    nickname: string
    id: number
  }
}

export type StrictPropsWithChildren<P = unknown> = P & {
  children: ReactNode
}
