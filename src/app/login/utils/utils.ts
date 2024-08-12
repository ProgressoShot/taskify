import type { LoginFormValue } from '@/app/login/components/LoginForm'
import taskifyApi from '@/lib/axiosInstance'

export const login = async (data: LoginFormValue) => {
  try {
    const response = await taskifyApi.post('auth/login', data)
    const { accessToken, user } = response.data
    return { accessToken, user }
  } catch (error) {
    throw error
  }
}

export const fetchDashboards = async () => {
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
