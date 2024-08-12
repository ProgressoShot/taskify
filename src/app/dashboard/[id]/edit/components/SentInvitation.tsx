import cn from 'classnames'
import { PropsWithChildren } from 'react'

import Button from '@/components/Button'

const classNames = {
  inner: {
    default: 'px-4 md:px-8 lg:px-16 md:grid md:grid-cols-3',
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

function Item({ inviteeEmail }: {inviteeEmail: string}) {
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
          이메일
        </p>
        <p className={cn(classNames.value.default)}>{inviteeEmail}</p>
      </div>
      <div
        className={cn(classNames.cols.default)}
        style={classNames.cols.style}
      >
        <Button className={cn(classNames.button.default)} color={'secondary'}>
          취소
        </Button>
      </div>
    </div>
  )
}

function SentInvitation({ children }: PropsWithChildren) {
  return (
    <div className='pb-8'>
      <div className={cn(classNames.inner.default, 'hidden')}>
        <p className={cn(classNames.label.default, 'text-base')}>이메일</p>
      </div>
      {children}
    </div>
  )
}

SentInvitation.Item = Item

export default SentInvitation
