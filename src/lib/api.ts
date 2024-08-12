import api from '@/app/utils/axiosInstance'

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
