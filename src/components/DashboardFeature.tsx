'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import IconAddBox from '/public/icons/add-box.svg'
import IconSettings from '/public/icons/settings.svg'
import useModalStore from '@/store/useModalStore'

/**
 * @todo
 * 버튼 스타일 수정: 피그마 참조
 * 대시보드 ID로 관리, 초대하기 기능 구현
 */

const BUTTON_CLASSNAME =
  'flex h-10 items-center justify-between gap-2 rounded-lg border border-custom-gray-300 px-4 text-base text-custom-gray-500'

export default function DashboardFeature() {
  const { dashboardid } = useParams()
  const { openModal } = useModalStore()

  const createByMe = dashboardid

  if (!createByMe) return null

  return (
    <div className='flex gap-4 border-r border-custom-gray-300 pr-9'>
      <Link
        href={`/dashboard/${dashboardid}/edit`}
        className={BUTTON_CLASSNAME}
      >
        <IconSettings />
        <p>관리</p>
      </Link>
      <button
        onClick={() =>
          openModal(<p className='text-custom-black-300'>초대하기 모달</p>)
        }
        className={BUTTON_CLASSNAME}
      >
        <IconAddBox />
        <p>초대하기</p>
      </button>
    </div>
  )
}
