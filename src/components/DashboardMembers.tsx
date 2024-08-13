'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { getDashboardMemberList } from '@/app/utils/dashboardsApi'
import useMediaQuery from '@/hooks/useMediaQuery'
import { DashboardMembersType } from '@/types/types'

import Dropdown from './Dropdown'
import UserAvatar from './UserAvatar'

type Mode = keyof MemberSizeType
type MemberSizeType = {
  mobile: number
  tablet: number
  desktop: number
}

const MEMBER_SIZES: MemberSizeType = {
  desktop: 4,
  tablet: 2,
  mobile: 2,
}

export default function DashboardMembers() {
  const { id } = useParams()
  const mode: Mode = useMediaQuery()
  const [members, setMembers] = useState<DashboardMembersType[] | null>(null)
  const [allMembers, setAllMembers] = useState<DashboardMembersType[] | null>(
    null
  )
  const [totalCount, setTotalCount] = useState<number | null>(null)

  type getDashboardMemberListTypes = Parameters<typeof getDashboardMemberList>
  const getDashboardMembers = async ([
    dashboardId,
    page,
    size,
  ]: getDashboardMemberListTypes) => {
    const data = await getDashboardMemberList(dashboardId, page, size)
    if (size === totalCount) {
      setAllMembers(data.members)
    } else {
      setTotalCount(data.totalCount)
      setMembers(data.members)
    }
  }

  useEffect(() => {
    getDashboardMembers([Number(id), 1, MEMBER_SIZES[mode]])
  }, [id, mode])

  const handleClick = async () => {
    const data = await getDashboardMembers([Number(id), 1, totalCount || 0])
  }

  if (!id) return null

  return (
    <Dropdown className='border-r border-custom-gray-300'>
      <Dropdown.Trigger onClick={handleClick} className='px-9'>
        <div className='flex items-center'>
          {members &&
            members
              .slice(0, Math.min(MEMBER_SIZES[mode], members.length))
              .map((member, index) => {
                let gap
                if (index) gap = '-ml-2'
                return (
                  <UserAvatar
                    key={`dashboard-member-${member.id}`}
                    className={gap}
                    name={member.nickname[0]}
                  />
                )
              })}

          {totalCount && totalCount > MEMBER_SIZES[mode] && (
            <UserAvatar
              className='-ml-2'
              name={`+${totalCount - MEMBER_SIZES[mode]}`}
            />
          )}
        </div>
      </Dropdown.Trigger>
      <div className='relative left-1/2 ml-6 min-w-32 -translate-x-1/2'>
        <Dropdown.Menu className='w-auto'>
          {allMembers &&
            allMembers.map(member => {
              return (
                <div
                  key={`dashboard-all-member-${member.id}`}
                  className='flex items-center gap-3 py-0.5 pl-2 pr-4'
                >
                  <UserAvatar name={member.nickname[0]} />
                  <p className='text-nowrap'>{member.nickname}</p>
                </div>
              )
            })}
        </Dropdown.Menu>
      </div>
    </Dropdown>
  )
}
