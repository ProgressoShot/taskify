import { useEffect } from 'react'

import ImageEmptyInvitation from '/public/images/not-invited.svg'
import { listDashboardInvitations } from '@/lib/api'
import { useDashboardInvitationStore } from '@/store/useInvitationStore'
import { Invitation } from '@/types/types'

import SentInvitation from './SentInvitation'

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
  dashboardId: number
}) {
  const { dashboardInvitations, setDashboardInvitations } =
    useDashboardInvitationStore()

  useEffect(() => {
    async function fetchInvitations() {
      const res = await listDashboardInvitations(dashboardId)
      setDashboardInvitations(res.invitations ? res.invitations : [])
    }
  }, [dashboardId, setDashboardInvitations])

  if (dashboardInvitations) {
    const notAcceptedInvitations = dashboardInvitations.filter(
      (item: Invitation) => !item.inviteAccepted
    )
    const count = notAcceptedInvitations.length

    if (count === 0) return <EmptyInvitationList />

    return (
      <>
        <SentInvitation>
          {notAcceptedInvitations.map((item: Invitation) => {
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
