import { useEffect, useRef, useState } from 'react'

import Member from '@/app/dashboard/[id]/edit/components/Member'
import {
  listDashboardMembers,
} from '@/lib/dashboardsApi'
import { DashboardMember } from '@/types/types'

const ITEM_PER_PAGE: number = 4

export default function MemberList({ dashboardId }: { dashboardId: number }) {
  const [list, setList] = useState<DashboardMember[] | null>(null)
  const [page, setPage] = useState<number>(1)

  type ParametersType = Parameters<typeof listDashboardMembers>

  const getDashboardMember = async ([
    size = ITEM_PER_PAGE,
    page = 1,
    dashboardId = 1,
  ]: ParametersType) => {
    const response = await listDashboardMembers(dashboardId, page, size)
    setList(prev =>
      Boolean(response.members?.length) && prev !== null
        ? [...prev, ...response.members]
        : response.members
    )
    if (response.members?.length) setPage(page + 1)
  }

  useEffect(() => {
    if (list === null) getDashboardMember([ITEM_PER_PAGE])
  })

  useEffect(() => {
    getDashboardMember([ITEM_PER_PAGE, page, dashboardId])
  }, [dashboardId])

  return (
    <>
      <Member>
        {list &&
          list.map((item: DashboardMember) => {
            return (
              <Member.Item
                key={`dashboard-member-${item.id}`}
                dashboardId={dashboardId}
                page={page}
                size={ITEM_PER_PAGE}
                member={item}
                callBackFunction={getDashboardMember}
              />
            )
          })}
      </Member>
    </>
  )
}
