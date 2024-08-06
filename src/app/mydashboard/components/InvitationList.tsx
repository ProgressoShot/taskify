import ImageEmptyInvitation from '../../../../public/images/not-invited.svg'
import Invitation from './Invitation'

type Dashboard = {
  id: number
  title: string
}

type User = {
  id: number
  email: string
  nickname: string
}

type Invited = {
  id: number
  dashboard: Dashboard
  teamId: string
  inviter: User
  invitee: User
  inviteAccepted: boolean
  createdAt: string
  updatedAt: string
}

/**
 * @JuhyeokC
 * TEST용 더미 배열 생성
 */
const TEMP_INVITE_DASHBOARD_LIST: Array<Invited> = [
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

export default function InvitationList() {
  const INVITE_DASHBOARD_LIST = TEMP_INVITE_DASHBOARD_LIST
  const length: number = INVITE_DASHBOARD_LIST.length && 0

  if (length === 0) return <EmptyInvitationList />

  return (
    <>
      <article className='mt-8 rounded-md border border-custom-gray-300 p-2'>
        <label>
          <span>검색 폼 컴포넌트</span>
        </label>
        <input
          type='text'
          name='dashboardSearch'
          value='value'
          placeholder='검색'
          onChange={() => console.log('test')}
        />
      </article>
      <Invitation>
        {TEMP_INVITE_DASHBOARD_LIST.map((item: Invited) => {
          const { id, inviter, dashboard, invitee, inviteAccepted } = item
          return (
            <Invitation.Item
              key={`invite-dashboard-${id}`}
              dashboardTitle={dashboard.title}
              inviter={inviter.nickname}
              inviteAccepted={inviteAccepted}
            />
          )
        })}
      </Invitation>
    </>
  )
}
