import cn from 'classnames'
import Link from 'next/link'

import { Dashboard, DashboardCardType } from '@/types/types'

import Button from './Button'
import DashboardName from './DashboardName'

interface DashboardCardProps extends Dashboard {
  active?: boolean
  type: DashboardCardType
  href?: string
  onClick?: () => void
}

export default function DashboardCard({
  children,
  color = 'green',
  createdByMe = false,
  active,
  type,
  href = '',
  onClick,
}: React.PropsWithChildren & DashboardCardProps) {
  const classNames: string = cn(
    'block rounded-lg transition',
    type === 'side' && active
      ? 'bg-custom-light-violet'
      : 'hover:bg-custom-gray-100',
    type === 'side'
      ? 'py-3 px-4'
      : 'round-container h-full w-full border border-custom-gray-300 bg-white p-5'
  )

  const Element = type === 'add' ? Button : Link

  return (
    <Element href={href} onClick={onClick} className={classNames}>
      <DashboardName type={type} color={color} createdByMe={createdByMe}>
        {children}
      </DashboardName>
    </Element>
  )
}
