'use server'

import axios from 'axios'
import { cookies } from 'next/headers'

const api = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/7-2',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.request.use(
  config => {
    console.log('interceptor')
    const token = cookies().get('Authorization')

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
