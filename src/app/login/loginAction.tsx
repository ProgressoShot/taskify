'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import api from '@/lib/axiosInstance'

import { LoginFormValue } from './components/LoginForm'

export default async function loginAction(data: LoginFormValue) {
  // 백엔드 요청
  try {
    const response = await fetch(
      'https://sp-taskify-api.vercel.app/7-2/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )

    const responsedData = await response.json()
    if (responsedData.message) {
      throw new Error(responsedData.message)
    }
    const { accessToken, user } = responsedData

    // 가져온 json token 쿠키 설정 하기
    cookies().set('Authorization', accessToken, {
      secure: true,
      httpOnly: true,
      expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
      path: '/',
      sameSite: 'strict',
    })
  } catch (error: any) {
    return error.message
  }

  // 로그인 여부에 따라 redirect
  redirect('/mydashboard')
}
