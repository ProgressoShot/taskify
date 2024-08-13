import api from '@/lib/axiosInstance'
import { Dashboard, ListDashboardInvitationsResponse } from '@/types/types'

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
): Promise<Dashboard> {
  try {
    const response = await api.put(`/dashboards/${id}`, body)
    return response.data
  } catch (error: any) {
    return error.message
  }
}

export async function listDashboardInvitations(
  id: number
): Promise<ListDashboardInvitationsResponse> {
  try {
    const response = await api.get(`/dashboards/${id}/invitations`)
    return response.data
  } catch (error: any) {
    return error.message
  }
}

type ImageUploadType = 'card' | 'profile'

interface ImageUpload {
  type: ImageUploadType
  columnId?: number
  image: any
}

export const imageUpload = async ({ type, columnId, image }: ImageUpload) => {
  let url
  switch (type) {
    case 'card':
      url = `columns/${columnId}/card-image`
      break
    default:
      url = 'users/me/image'
      break
  }

  const formData = new FormData()
  formData.append('image', image, image.name)

  try {
    const response = await api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: [
        function () {
          return formData
        },
      ],
    })
    return response.data
  } catch (error) {
    throw error
  }
}

interface GetColumnListProps {
  dashboardId: string
}

export const getColumnList = async ({ dashboardId }: GetColumnListProps) => {
  try {
    const res = await api.get(`columns?dashboardId=${dashboardId}`)
    const { data } = res
    return data
  } catch (error) {
    throw error
  }
}
