import taskifyApi from '@/lib/axiosInstance'
import {Dashboard, ListDashboardInvitationsResponse} from '@/lib/types'

/**
 * @function convertURL
 * @param {String} url - The server URL.
 * @param {Object} params - Query parameters as key-value pairs.
 * @returns {String} - URL String with Query parameters.
 * @throws Will throw an error with the URL is empty.
 */

const convertURL = (url: string, params: Record<string, string>): string => {
  if (!url) throw new Error('URL is Empty')
  const query = params ? '?' + new URLSearchParams(params).toString() : ''
  return url + query
}

// column

interface listColumnsProps {
  dashboardId: string
}

export const listColumns = async ({ dashboardId }: listColumnsProps) => {
  try {
    const res = await taskifyApi.get(`columns?dashboardId=${dashboardId}`)
    const { data } = res
    return data
  } catch (error) {
    throw error
  }
}

// dashboard

export const listDashboards = async () => {
  const params: {
    navigationMethod: 'infiniteScroll' | 'pagination'
    page: number
    size: number
  } = {
    navigationMethod: 'infiniteScroll',
    page: 0,
    size: 10,
  }
  try {
    const response = await taskifyApi.get(
      'dashboards?navigationMethod=infiniteScroll&page=1&size=10'
    )
    const { dashboards } = response.data
    return dashboards
  } catch (error) {
    throw error
  }
}

export async function getDashboard(id: number): Promise<Dashboard> {
  try {
    const response = await taskifyApi.get(`/dashboards/${id}`)
    return response.data
  } catch (error: any) {
    return error.message
  }
}

export async function updateDashboard(
  id: number,
  body: { title: string; color: string }
) {
  try {
    const response = await taskifyApi.put(`/dashboards/${id}`, body)
    return response.data
  } catch (error: any) {
    return error.message
  }
}

export async function listDashboardInvitations(id: number): Promise<ListDashboardInvitationsResponse> {
  try {
    const response = await taskifyApi.get(`/dashboards/${id}/invitations`)
    return response.data
  } catch (error: any) {
    return error.message
  }
}

// invitation

export const listReceivedInvitiations = async (
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
    const response = await taskifyApi.get(convertURL('invitations', params))
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
    const response = await taskifyApi.put(`invitations/${id}`, {
      inviteAccepted: inviteAccepted,
    })
    return response.data
  } catch (error) {
    throw error
  }
}