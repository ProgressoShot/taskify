import api from '@/app/utils/axiosInstance'

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
