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
