'use client'

import cn from 'classnames'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import api from '@/app/utils/axiosInstance'
import useUserStore from '@/store/useUserStore'

import Dropdown from './Dropdown'
import UserAvatar from './UserAvatar'

export default function UserProfile() {
  const router = useRouter()
  const { user, setUser } = useUserStore()

  const getUser = async () => {
    try {
      const response = await api.get('users/me')
      setUser(response.data)
    } catch (error) {
      throw error
    }
  }

  const moveMyDashboard = () => router.push('/mydashboard')

  const moveMyPage = () => router.push('/mypage')

  const handleLogout = () => {
    router.push('/login')
    setUser(null)
    sessionStorage.clear()
  }

  useEffect(() => {
    if (user === null) getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const classNames = cn(
    'relative',
    'flex justify-center items-center',
    'w-full h-8',
    'transition-all duration-200',
    'hover:bg-custom-light-violet hover:text-custom-violet'
  )

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <div className='flex items-center gap-3 px-9'>
          <UserAvatar name={user?.nickname[0] || ''} />
          <p className='text-nowrap'>{user?.nickname}</p>
        </div>
      </Dropdown.Trigger>
      <div className='relative left-1/2 ml-5 w-32 -translate-x-1/2'>
        <Dropdown.Menu className='w-full'>
          <Dropdown.Item onClick={moveMyDashboard} className={classNames}>
            내 대시보드
          </Dropdown.Item>
          <Dropdown.Item onClick={moveMyPage} className={classNames}>
            계정 관리
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogout} className={classNames}>
            로그아웃
          </Dropdown.Item>
        </Dropdown.Menu>
      </div>
    </Dropdown>
  )
}
