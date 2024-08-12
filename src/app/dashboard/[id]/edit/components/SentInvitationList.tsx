import ImageEmptyInvitation from '/public/images/not-invited.svg'
import { listDashboardInvitations } from '@/app/utils/api'
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
  const { invitations, setInvitations } = useDashboardInvitationStore()

  // useEffect
  // listDashboardInvitations(dashboardId).then()
  // setInvitations()

  if (invitations) {
    const notAcceptedInvitations = invitations.filter(
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
