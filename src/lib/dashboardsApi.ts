import api from '@/lib/axiosInstance'
import { DashboardMember } from '@/types/types'

/**
 * @function convertURL
 * @param {String} url - The server URL.
 * @param {Object} params - Query parameters as key-value pairs.
 * @returns {String} - URL String with Query parameters.
 * @throws Will throw an error with the URL is empty.
 */

const convertURL = (url: string, params: Record<string, string>) => {
  if (!url) throw new Error('URL is Empty')
  const query = params ? '?' + new URLSearchParams(params).toString() : ''
  return url + query
}

export const createDashboard = async (title: string, color: string) => {
  const params: Record<string, string> = {
    title: title,
    color: color,
  }

  try {
    const response = await api.post('dashboards', params)
    return response.data
  } catch (error) {
    throw error
  }
}

export const listDashboards = async (): Promise<any> => {
  const params: {
    navigationMethod: 'infiniteScroll' | 'pagination'
    page?: number
    size?: number
  } = {
    navigationMethod: 'infiniteScroll',
    page: 0,
    size: 10,
  }

  try {
    const response = await api.get(convertURL('dashboards', params))
    const { dashboards } = response.data
    return dashboards
  } catch (error) {
    throw error
  }
}

export const deleteDashboard = async (id: number) => {
  try {
    const response = await api.delete(`dashboards/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getReceivedInvitiationList = async (
  size: number,
  cursorId?: number | null,
  title?: string
) => {
  const params: Record<string, string> = {
    size: String(size),
  }
  if (cursorId) params.cursorId = String(cursorId)
  if (title) params.title = title

  try {
    const response = await api.get(convertURL('invitations', params))
    return response.data
  } catch (error) {
    throw error
  }
}

export const putResponseInvitiation = async (
  id: number,
  inviteAccepted: boolean
) => {
  try {
    const response = await api.put(`invitations/${id}`, {
      inviteAccepted: inviteAccepted,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

interface listDashboardMembersResponse {
  members: DashboardMember[]
  totalCount: number
}

export const listDashboardMembers = async (
  dashboardId: number,
  page?: number,
  size?: number
): Promise<listDashboardMembersResponse> => {
  const params: Record<string, string> = {
    dashboardId: String(dashboardId),
    page: String(1),
    size: String(20),
  }
  if (page) params.page = String(page)
  if (size) params.size = String(size)

  try {
    const response = await api.get(convertURL('members', params))
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteDashboardMember = async (
  memberId: number
): Promise<void> => {
  try {
    await api.delete(`members/${memberId}`)
  } catch (error) {
    throw error
  }
}
