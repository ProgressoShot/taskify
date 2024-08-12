import cn from 'classnames'
import { PropsWithChildren } from 'react'

import Button from '@/components/Button'
import { listDashboards, putResponseInvitiation } from '@/lib/api'
import useDashboardStore from '@/store/useDashboardStore'

import { ReceivedInvitiationType } from './ReceivedInvitiationList'

const classNames = {
  inner: {
    default: 'px-4 md:px-8 md:grid md:grid-cols-3',
    item: 'border-b border-b-custom-gray-200 py-3.5',
    mobile: 'flex w-full flex-col items-center',
  },
  cols: {
    default: 'grid w-full md:flex',
    style: {
      gridTemplateColumns: '64px auto',
    },
  },
  label: {
    default: 'px-2 text-custom-gray-400 text-nowrap',
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

function Item({
  invitation,
  callBackFunction,
}: {
  invitation: ReceivedInvitiationType
  callBackFunction: Function
}) {
  const { setDashboards } = useDashboardStore()

  const getDashboard = async () => {
    const data = await listDashboards()
    setDashboards(data)
  }

  const handleClick = async (id: number, value: boolean) => {
    await putResponseInvitiation(id, value).then(() => {
      getDashboard()
      callBackFunction([])
    })
  }

  return (
    <div
      className={cn(
        classNames.inner.default,
        classNames.inner.item,
        classNames.inner.mobile
      )}
    >
      <div
        className={cn(classNames.cols.default)}
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
        <p className={cn(classNames.value.default)}>
          {invitation.dashboard.title}
        </p>
      </div>
      <div
        className={cn(classNames.cols.default)}
        style={classNames.cols.style}
      >
        <p
          className={cn(
            classNames.label.default,
            classNames.label.mobile,
            'text-sm'
          )}
        >
          초대자
        </p>
        <p className={cn(classNames.value.default)}>
          {invitation.inviter.nickname}
        </p>
      </div>
      <div
        className={cn(
          classNames.value.default,
          'mt-3.5 grid w-full flex-none grid-cols-2 gap-2.5 md:m-auto md:flex md:flex-auto'
        )}
      >
        <Button
          className={cn(classNames.button.default)}
          color='primary'
          onClick={() => handleClick(invitation.id, true)}
        >
          수락
        </Button>
        <Button
          className={cn(classNames.button.default)}
          color='secondary'
          onClick={() => handleClick(invitation.id, false)}
        >
          거절
        </Button>
      </div>
    </div>
  )
}

function Foot({ children }: PropsWithChildren) {
  return (
    <div className='flex items-center justify-end px-4 pt-3.5 md:px-8'>
      {children}
    </div>
  )
}

function ReceivedInvitiation({ children }: PropsWithChildren) {
  return (
    <div className='py-4 md:py-8'>
      <div className={cn(classNames.inner.default, 'hidden')}>
        <p className={cn(classNames.label.default, 'text-base')}>이름</p>
        <p className={cn(classNames.label.default, 'text-base')}>초대자</p>
        <p className={cn(classNames.label.default, 'text-base')}>수락여부</p>
      </div>
      {children}
    </div>
  )
}

ReceivedInvitiation.Item = Item
ReceivedInvitiation.Foot = Foot

export default ReceivedInvitiation
