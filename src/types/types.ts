import { ReactNode } from 'react'

export type DashboardColor = 'green' | 'purple' | 'orange' | 'blue' | 'pink'

export type DashboardColorHex =
  | '#7AC555' // green
  | '#760DDE' // purple
  | '#FFA500' // orange
  | '#76A5EA' // blue
  | '#E876EA' // pink

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

export interface DashboardFormValue {
  title?: string
  color?: string
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
export interface CardsResponse {
  cards: TaskCard[]
  totalCount: number
  cursorId: string | null
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

export interface DashboardMembersType {
  id: number
  email: string
  nickname: string
  profileImageUrl: string | null
  isOwner: boolean
  createdAt: string
  updatedAt: string
  userId: number
}
