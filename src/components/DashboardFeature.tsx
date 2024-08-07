'use client'

import { useParams } from 'next/navigation'

import Button from './Button'

/**
 * @todo
 * 버튼 스타일 수정: 피그마 참조
 * 대시보드 ID로 관리, 초대하기 기능 구현
 */
export default function DashboardFeature() {
  const { dashboardid } = useParams()

  const createByMe = dashboardid

  const handleClick = (event: any) => {
    alert(`대시보드 ID: ${dashboardid} ${event.target.innerText} 기능`)
  }

  if (!createByMe) return null

  return (
    <div className='flex gap-2 border-r border-custom-gray-300 px-4'>
      <Button color='secondary' onClick={handleClick}>
        관리
      </Button>
      <Button color='secondary' onClick={handleClick}>
        초대하기
      </Button>
    </div>
  )
}
