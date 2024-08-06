import axios from 'axios'

const api = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/7-2/',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
  // timeout: 10000, // 요청 제한 시간 설정 (밀리초)
})

export default api
