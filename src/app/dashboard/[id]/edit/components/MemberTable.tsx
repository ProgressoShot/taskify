import { useEffect, useState } from 'react'

import MemberTableHeader from '@/app/dashboard/[id]/edit/components/MembersTableHeader'
import { listDashboardMembers } from '@/lib/dashboardsApi'
import { DashboardMember } from '@/types/types'

const ITEM_PER_PAGE: number = 4

export default function MemberTable({ dashboardId }: { dashboardId: number }) {
  const [page, setPage] = useState<number>(1)
  const [members, setMembers] = useState<DashboardMember[] | null>(null)

  type ParametersType = Parameters<typeof listDashboardMembers>

  const fetchDashboardMembers = async ([
    size = ITEM_PER_PAGE,
    page = 1,
    dashboardId = 1,
  ]: ParametersType) => {
    const response = await listDashboardMembers(dashboardId, page, size)
    setMembers(response.members)
    if (response.members?.length) setPage(page + 1)
  }

  useEffect(() => {
    if (members === null) fetchDashboardMembers([ITEM_PER_PAGE])
    fetchDashboardMembers([ITEM_PER_PAGE, page, dashboardId])
  }, [dashboardId])

  return (
    <>
      <MemberTableHeader>
        {members &&
          members.map((member: DashboardMember) => {
            return (
              <MemberTableHeader.Item
                key={`dashboard-member-${member.id}`}
                dashboardId={dashboardId}
                page={page}
                size={ITEM_PER_PAGE}
                member={member}
                callBackFunction={fetchDashboardMembers}
              />
            )
          })}
      </MemberTableHeader>
    </>
  )
}
