import type { LoginFormValue } from '@/app/login/components/LoginForm'
import api from '@/app/utils/axiosInstance'

export const login = async (data: LoginFormValue) => {
  try {
    const response = await api.post('auth/login', data)
    const { accessToken, user } = response.data
    return { accessToken, user }
  } catch (error) {
    throw error
  }
}

export const fetchDashboards = async () => {
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
