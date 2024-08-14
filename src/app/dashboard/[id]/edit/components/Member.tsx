import cn from 'classnames'
import Image from 'next/image'
import { PropsWithChildren } from 'react'

import crownIcon from '/public/icons/crown.svg'
import Button from '@/components/Button'
import DeleteAlertModal from '@/components/DeleteAlertModal'
import UserAvatar from '@/components/UserAvatar'
import {
  deleteDashboardMember,
  listDashboardMembers,
} from '@/lib/dashboardsApi'
import { useMemberStore } from '@/store/useMemberStore'
import useUserStore from '@/store/useUserStore'
import useModalStore from '@/store/useModalStore'
import { DashboardMember } from '@/types/types'

const classNames = {
  inner: {
    default: 'w-full px-4 md:px-8 md:grid md:grid-cols-2',
    item: 'border-b border-b-custom-gray-200 py-3.5 w-full',
    mobile: 'flex w-full flex-col items-center',
  },
  cols: {
    default: 'grid w-full md:flex',
    style: {
      gridTemplateColumns: '64px auto',
    },
  },
  label: {
    default: 'px-2 text-custom-gray-400 text-nowrap w-full',
    mobile: 'block w-16 flex-none md:hidden',
  },
  value: {
    default:
      'px-2 text-custom-black-200 text-nowrap overflow-hidden text-ellipsis',
  },
  button: {
    default: 'w-full rounded-[4px] md:w-20',
    area: 'mt-3.5 grid w-full flex-none grid-cols-2 gap-2.5 md:flex md:flex-auto',
  },
}

export interface ItemProps {
  dashboardId: number
  page: number
  size: number
  member: DashboardMember
  callBackFunction: Function
}

function Item({
  dashboardId,
  page,
  size,
  member,
  callBackFunction,
}: ItemProps) {
  const handleDelete = async (id: number) => {
    await deleteDashboardMember(id).then(() => {
  const { openModal } = useModalStore()
  const { setMembers } = useMemberStore()
  const { user } = useUserStore()

  const fetchDashboardMembers = async () => {
    const res = await listDashboardMembers(dashboardId, page, size)
    setMembers(res.members)
  }

  const handleDeleteMember = async () => {
    await deleteDashboardMember(member.id).then(() => {
      listDashboardMembers(page, size)
      callBackFunction([])
    })
  }

  return (
    <div
      className={cn(
        classNames.inner.default,
        classNames.inner.item,
        'flex w-full justify-between'
      )}
    >
      <div
        className={cn(classNames.cols.default, 'flex w-full items-center')}
        style={classNames.cols.style}
      >
        <p
          className={cn(
            classNames.label.default,
            classNames.label.mobile,
            'text-sm'
          )}
        >
          이름
        </p>
        <UserAvatar member={member} />
        <p className={cn(classNames.value.default)}>{member.nickname}</p>
        {member.isOwner && (
          <Image
            src={crownIcon}
            alt={'대시보드 생성자'}
            width={20}
            height={20}
            style={{ color: '#FDD446' }}
          />
        )}
      </div>
      <div
        className={cn(
          classNames.value.default,
          'flex w-full items-center justify-end'
        )}
      >
        <Button
          className={cn(classNames.button.default)}
          color='secondary'
          type={'button'}
          onClick={() => {
            openModal(
              <DeleteAlertModal
                message={`${member.nickname}을 이 대시보드에서 삭제하시겠습니까?`}
                onDelete={handleDeleteMember}
              />
            )
          }}
        >
          삭제
        </Button>
      </div>
    </div>
  )
}

function Member({ children }: PropsWithChildren) {
  return (
    <div className='py-4 md:py-8'>
      <div className={cn(classNames.inner.default, 'hidden')}>
        <p className={cn(classNames.label.default, 'text-base')}>이름</p>
      </div>
      {children}
    </div>
  )
}

Member.Item = Item

export default Member
