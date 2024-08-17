'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import api from '@/lib/axiosInstance'

import { LoginFormValue } from './components/LoginForm'

export default async function loginAction(data: LoginFormValue) {
  // 폼에서 데이터 가져오기 = data
  // 백엔드 요청
  // 가져온 json token 쿠키 설정 하기
  // 로그인 여부에 따라 redirect

  return { message: 'test' }
}
