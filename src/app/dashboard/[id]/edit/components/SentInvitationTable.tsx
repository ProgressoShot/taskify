import { useEffect, useState } from 'react'

import ImageEmptyInvitation from '/public/images/not-invited.svg'
import { listDashboardInvitations } from '@/lib/api'
import { Invitation } from '@/types/types'

import SentInvitation from './SentInvitation'

const ITEM_PER_PAGE: number = 4

export default function SentInvitationTable({
  dashboardId,
}: {
  dashboardId: number
}) {
  const [page, setPage] = useState<number>(1)
  const [dashboardInvitations, setDashboardInvitations] = useState<
    Invitation[] | null
  >(null)

  type ParametersType = Parameters<typeof listDashboardInvitations>

  const fetchDashboardInvitations = async ([
    size = ITEM_PER_PAGE,
    page = 1,
    dashboardId = 1,
  ]: ParametersType) => {
    const response = await listDashboardInvitations(dashboardId, page, size)
    const newInvitations = response.invitations ?? [] // response.invitations가 null이면 빈 배열을 반환
    setDashboardInvitations(newInvitations)
    if (newInvitations?.length) {
      setDashboardInvitations(prev =>
        prev !== null ? [...prev, ...newInvitations] : newInvitations // prev가 null이 아닐 경우, 기존 목록에 새로운 초대 목록을 추가
      )
      setPage(page + 1) // 페이지를 증가시킴
    }
  }

  useEffect(() => {
    if (dashboardInvitations === null)
      fetchDashboardInvitations([ITEM_PER_PAGE])
    fetchDashboardInvitations([ITEM_PER_PAGE, page, dashboardId])
  }, [dashboardId])

  if (dashboardInvitations) {
    const notAcceptedInvitations = dashboardInvitations.filter(
      (item: Invitation) => !item.inviteAccepted
    )
    const count = notAcceptedInvitations.length

    if (count === 0) {
      return (
        <div className='flex h-80 flex-col items-center justify-center p-6'>
          <ImageEmptyInvitation className='' />
          <p className='mb-10 p-6 text-center text-lg font-normal text-custom-gray-400'>
            아직 초대한 멤버가 없어요
          </p>
        </div>
      )
    }

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
