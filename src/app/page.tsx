'use client'
import Link from 'next/link'
import { useState } from 'react'

import RootHeader from '@/layouts/RootHeader'
import useAuthStore from '@/store/authSampleStore'

export default function LandingPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { isAuthenticated, login, user } = useAuthStore()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login(username, password)
    setUsername('')
    setPassword('')
  }
  return (
    <>
      <RootHeader theme='dark'>
        <RootHeader.Features theme='dark'>
          <div className='flex gap-9'>
            <Link href={'/login'}>로그인</Link>
            <Link href={'/sign'}>회원가입</Link>
          </div>
        </RootHeader.Features>
      </RootHeader>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        {isAuthenticated ? `is login - ${user?.username}` : 'is logout'}

        <p>
          id:user, pw:password를 입력하면 zustand의 store데이터가 변경됩니다
        </p>

        {!isAuthenticated && (
          <form onSubmit={handleLogin}>
            <input
              type='text'
              placeholder='사용자명'
              value={username}
              className='border'
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type='password'
              placeholder='비밀번호'
              value={password}
              className='border'
              onChange={e => setPassword(e.target.value)}
            />
            <button className='border' type='submit'>
              로그인
            </button>
          </form>
        )}
      </main>
    </>
  )
}
