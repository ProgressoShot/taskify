import axios from 'axios'

const api = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/2',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
  // timeout: 10000, // 요청 제한 시간 설정 (밀리초)
})

let accessToken: string = ''

export const setAccessToken = (token: string) => {
  accessToken = token
}

api.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default api
