import ImageEmptyInvitation from '/public/images/not-invited.svg'
import { getDashboardInvitationById } from '@/app/utils/api'

import SentInvitation from './SentInvitation'

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

function EmptyInvitationList() {
  return (
    <div className='flex h-80 flex-col items-center justify-center p-6'>
      <ImageEmptyInvitation className='' />
      <p className='mb-10 p-6 text-center text-lg font-normal text-custom-gray-400'>
        아직 초대한 멤버가 없어요
      </p>
    </div>
  )
}

export default function SentInvitationList({
  dashboardId,
}: {
  dashboardId: string
}) {
  const { invitaions } = getDashboardInvitationById(dashboardId).then

  if (invitaions) {
    const notAcceptedInvitations = invitations.filter(
      (item: Invited) => !item.inviteAccepted
    )
    const count = notAcceptedInvitations.length

    if (count === 0) return <EmptyInvitationList />

    return (
      <>
        <SentInvitation>
          {notAcceptedInvitations.map((item: Invited) => {
            const { id, invitee } = item
            return (
              <SentInvitation.Item
                key={`sentInvitation-${id}`}
                inviteeEmail={invitee.email}
              />
            )
          })}
        </SentInvitation>
      </>
    )
  }
}
