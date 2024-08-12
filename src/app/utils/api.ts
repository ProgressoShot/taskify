import api from '@/app/utils/axiosInstance'
import {Dashboard, Invitations, ListDashboardInvitationsResponse} from '@/types/types'

export async function getDashboard(id: number): Promise<Dashboard> {
  try {
    const response = await api.get(`/dashboards/${id}`)
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
    const response = await api.put(`/dashboards/${id}`, body)
    return response.data
  } catch (error: any) {
    return error.message
  }
}

export async function listDashboardInvitations(id: number): Promise<ListDashboardInvitationsResponse> {
  try {
    const response = await api.get(`/dashboards/${id}/invitations`)
    return response.data
  } catch (error: any) {
    return error.message
  }
}
