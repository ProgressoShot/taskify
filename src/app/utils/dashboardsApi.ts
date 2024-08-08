import api from '@/app/utils/axiosInstance'

export const getDashboardList = async () => {
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
    const response = await api.get(
      'dashboards?navigationMethod=infiniteScroll&page=1&size=10'
    )
    const { dashboards } = response.data
    return dashboards
  } catch (error) {
    throw error
  }
}

export const getInvitations = async () => {
  const params: {
    size: number
    cursorId: number
    title: string // 검색어
  } = {
    size: 10,
    cursorId: 0,
    title: 'title',
  }
  try {
    const response = await api.get('invitations?size=10')
    const { invitations } = response.data
    return invitations
  } catch (error) {
    throw error
  }
}
