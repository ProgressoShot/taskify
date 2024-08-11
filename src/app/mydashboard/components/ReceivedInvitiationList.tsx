import { useState } from 'react'

import IconSearch from '/public/icons/search.svg'
import ImageEmptyInvitation from '/public/images/not-invited.svg'
import { Invitation } from '@/types/types'

import ReceivedInvitiation from './ReceivedInvitiation'

type Dashboard = {
  id: number
  title: string
}

type User = {
  id: number
  email: string
  nickname: string
}

/**
 * @JuhyeokC
 * TEST용 더미 배열 생성
 */
const TEMP_INVITE_DASHBOARD_LIST: Array<Invitation> = [
  {
    id: 0,
    inviter: {
      nickname: 'inviter-1inviter-1inviter-1inviter-1inviter-1inviter-1',
      email: 'inviter-1@이메일',
      id: 0,
    },
    teamId: '팀이름-1',
    dashboard: {
      title: '대시보드명-1',
      id: 0,
    },
    invitee: {
      nickname: 'invitee-1',
      email: 'invitee-1@이메일',
      id: 0,
    },
    inviteAccepted: true,
    createdAt: '2024-08-05T07:14:21.086Z',
    updatedAt: '2024-08-05T07:14:21.086Z',
  },
  {
    id: 1,
    inviter: {
      nickname: 'inviter-2',
      email: 'inviter-2@이메일',
      id: 1,
    },
    teamId: '팀이름-2',
    dashboard: {
      title:
        '대시보드명-2대시보드명-2대시보드명-2대시보드명-2대시보드명-2대시보드명-2대시보드명-2',
      id: 1,
    },
    invitee: {
      nickname: 'invitee-2',
      email: 'invitee-2@이메일',
      id: 1,
    },
    inviteAccepted: false,
    createdAt: '2024-08-05T07:14:21.086Z',
    updatedAt: '2024-08-05T07:14:21.086Z',
  },
  {
    id: 2,
    inviter: {
      nickname: 'inviter-3',
      email: 'inviter-3@이메일',
      id: 2,
    },
    teamId: '팀이름-3',
    dashboard: {
      title: '대시보드명-3',
      id: 2,
    },
    invitee: {
      nickname: 'invitee-3',
      email: 'invitee-3@이메일',
      id: 2,
    },
    inviteAccepted: false,
    createdAt: '2024-08-05T07:14:21.086Z',
    updatedAt: '2024-08-05T07:14:21.086Z',
  },
]

function EmptyInvitationList() {
  return (
    <div className='flex h-80 flex-col items-center justify-center p-6'>
      <ImageEmptyInvitation className='' />
      <p className='mb-10 p-6 text-center text-lg font-normal text-custom-gray-400'>
        아직 초대받은 대시보드가 없어요
      </p>
    </div>
  )
}

export default function ReceivedInvitiationList() {
  const [value, setValue] = useState('')

  const INVITE_DASHBOARD_LIST = TEMP_INVITE_DASHBOARD_LIST
  const length: number = INVITE_DASHBOARD_LIST.length

  if (length === 0) return <EmptyInvitationList />

  return (
    <>
      <div className='px-6 md:px-8'>
        <article className='relative'>
          <label
            htmlFor='dashboardSearchInput'
            className='flex h-10 w-full items-center justify-start gap-1 rounded-md border border-custom-gray-300 px-4 text-custom-black-200 outline-none placeholder:text-custom-gray-400 focus:border-custom-violet'
          >
            <IconSearch className='flex-none' />
            <input
              type='text'
              name='dashboardSearch'
              id='dashboardSearchInput'
              value={value}
              placeholder='검색'
              onChange={e => setValue(e.target.value)}
              className='h-full flex-1'
            />
          </label>
        </article>
      </div>
      <ReceivedInvitiation>
        {TEMP_INVITE_DASHBOARD_LIST.map((item: Invitation) => {
          const { id, inviter, dashboard, invitee, inviteAccepted } = item
          return (
            <ReceivedInvitiation.Item
              key={`invite-dashboard-${id}`}
              dashboardTitle={dashboard.title ? dashboard.title : ''}
              inviter={inviter.nickname}
              inviteAccepted={inviteAccepted}
            />
          )
        })}
      </ReceivedInvitiation>
    </>
  )
}
