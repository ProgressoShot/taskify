import api from '@/app/utils/axiosInstance'

export async function getDashboardInfo(dashboardId: number) {
  try {
    const response = await api.get(`/dashboards/${dashboardId}`)
    return response.data
  } catch (error) {
    return error.message
  }
}

export async function updateDashboardTitle(id: number, title: string) {
  try {
    const response = await api.put(`/dashboards/${id}`, {
      title,
    })
    return response.data
  } catch (error) {
    return error.message
  }
}

export async function updateDashboardInfo(
  id: number,
  title: string,
  color: string
) {
  try {
    const response = await api.put(`/dashboards/${id}`, {
      title,
      color,
    })
    return response.data
  } catch (error: any) {
    return error.message
  }
}

export async function getDashboardInvitationById(id: number) {
  try {
    const response = await api.get(`/dashboards/${id}/invitations`)
    return response.data
  } catch (error) {
    return error.message
  }
}
