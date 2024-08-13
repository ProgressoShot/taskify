'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import CrownIcon from '/public/icons/crown.svg'
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
  desktop: 5,
  tablet: 3,
  mobile: 3,
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

  const handleClick = async () => {
    const data = await getDashboardMembers([Number(id), 1, totalCount || 0])
  }

  useEffect(() => {
    if (id) getDashboardMembers([Number(id), 1, MEMBER_SIZES[mode]])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, mode])

  if (!id) return null

  return (
    <Dropdown className='border-r border-custom-gray-300 px-4 md:px-6 lg:px-9'>
      <Dropdown.Trigger onClick={handleClick} className=''>
        <div className='flex items-center'>
          {members &&
            members
              .slice(
                0,
                Math.min(
                  members.length,
                  totalCount && totalCount > MEMBER_SIZES[mode]
                    ? MEMBER_SIZES[mode] - 1
                    : MEMBER_SIZES[mode]
                )
              )
              .map((member: DashboardMembersType, index: number) => {
                let gap
                if (index) gap = '-ml-2'
                return (
                  <UserAvatar
                    key={`dashboard-member-${member.id}`}
                    className={gap}
                    member={member}
                  />
                )
              })}

          {totalCount && totalCount > MEMBER_SIZES[mode] && (
            <UserAvatar
              className='-ml-2'
              count={`+${totalCount - MEMBER_SIZES[mode] + 1}`}
            />
          )}
        </div>
      </Dropdown.Trigger>
      <div className='relative'>
        <Dropdown.Menu className='md:left-1/2 md:right-auto md:-translate-x-1/2'>
          {allMembers &&
            allMembers.map((member: DashboardMembersType) => {
              return (
                <div
                  key={`dashboard-all-member-${member.id}`}
                  className='flex items-center gap-3 py-0.5 pl-2 pr-4'
                >
                  <UserAvatar member={member} />
                  <p className='text-nowrap'>{member.nickname}</p>
                  {member.isOwner && <CrownIcon style={{ color: '#FDD446' }} />}
                </div>
              )
            })}
        </Dropdown.Menu>
      </div>
    </Dropdown>
  )
}
