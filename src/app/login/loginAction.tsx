'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import api from '@/lib/axiosServer'

import { LoginFormValue } from './components/LoginForm'

export default async function loginAction(data: LoginFormValue) {
  // 백엔드 요청
  try {
    const response = await api.post('/auth/login', data, {})
    const { accessToken, user } = response.data

    // 가져온 json token 쿠키 설정 하기
    cookies().set('Authorization', accessToken, {
      secure: true,
      // httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 3),
      // path: '/',
      sameSite: 'strict',
    })
  } catch (error: any) {
    return error.response?.data?.message || error.message
  }

  // 로그인 여부에 따라 redirect
  redirect('/mydashboard')
}
