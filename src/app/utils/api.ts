import api from '@/app/utils/axiosInstance'

export async function getDashboardInfoById(id: number) {
  const response = await api.get(`/dashboards/${id}`)
  return response.data
}
