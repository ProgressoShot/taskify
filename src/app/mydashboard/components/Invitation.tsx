import cn from 'classnames'
import { PropsWithChildren } from 'react'

import Button from '@/components/Button'

interface InvitationProps {
  dashboardTitle: string
  inviter: string
  inviteAccepted: boolean
}

const classNames = {
  inner: {
    default: 'px-4 md:grid md:grid-cols-3',
    item: 'border-b border-b-custom-gray-200 py-3.5',
    mobile: 'flex w-full flex-col items-center',
  },
  cols: {
    default: 'flex w-full justify-start',
  },
  label: {
    default: 'text-custom-gray-400 text-nowrap',
    mobile: 'block w-16 flex-none md:hidden',
  },
  value: {
    default: 'text-custom-black-200 text-nowrap',
  },
  button: {
    default: 'full rounded-[4px] md:w-20',
    area: 'mt-3.5 grid w-full flex-none grid-cols-2 gap-2.5 md:flex md:flex-auto',
  },
}

function Item({ dashboardTitle, inviter, inviteAccepted }: InvitationProps) {
  return (
    <div
      className={cn(
        classNames.inner.default,
        classNames.inner.item,
        classNames.inner.mobile
      )}
    >
      <div className={cn(classNames.cols.default)}>
        <p
          className={cn(
            classNames.label.default,
            classNames.label.mobile,
            'text-sm'
          )}
        >
          이름
        </p>
        <p className={cn(classNames.value.default)}>{dashboardTitle}</p>
      </div>
      <div className={cn(classNames.cols.default)}>
        <p
          className={cn(
            classNames.label.default,
            classNames.label.mobile,
            'text-sm'
          )}
        >
          초대자
        </p>
        <p className={cn(classNames.value.default)}>{inviter}</p>
      </div>
      <div className='mt-3.5 grid w-full flex-none grid-cols-2 gap-2.5 md:flex md:flex-auto'>
        <Button
          className='w-full rounded-[4px] md:w-20'
          color={inviteAccepted ? 'primary' : 'secondary'}
        >
          수락
        </Button>
        <Button
          className='w-full rounded-[4px] md:w-20'
          color={!inviteAccepted ? 'primary' : 'secondary'}
        >
          거절
        </Button>
      </div>
    </div>
  )
}

function Invitation({ children }: PropsWithChildren) {
  return (
    <div className='pb-8'>
      <div className={cn(classNames.inner.default, 'hidden')}>
        <p className={cn(classNames.label.default, 'text-base')}>이름</p>
        <p className={cn(classNames.label.default, 'text-base')}>초대자</p>
        <p className={cn(classNames.label.default, 'text-base')}>수락여부</p>
      </div>
      {children}
    </div>
  )
}

Invitation.Item = Item

export default Invitation
