import cn from 'classnames'
import Link from 'next/link'

import DashboardName, {
  Color,
  DashboardCardType,
} from '@/components/DashboardName'

interface DashboardCardProps {
  id?: number
  title?: string
  color?: Color
  createdAt?: Date
  updatedAt?: Date
  createdByMe?: boolean
  userId?: number
  onClick?: () => void
  href?: string
  type: DashboardCardType
}

export default function DashboardCard({
  children,
  color = 'green',
  type,
  href = '',
  createdByMe = false,
}: React.PropsWithChildren & DashboardCardProps) {
  const selected: boolean = false // 선택된 대시보드

  const classNames: string = cn(
    'block rounded-lg transition',
    type === 'side' && selected
      ? 'bg-custom-light-violet'
      : 'hover:bg-custom-gray-100',
    type === 'side'
      ? 'py-3 px-4'
      : 'round-container h-full w-full border border-custom-gray-300 bg-white p-5'
  )

  return (
    <Link href={href} className={classNames}>
      <DashboardName type={type} color={color} createdByMe={createdByMe}>
        {children}
      </DashboardName>
    </Link>
  )
}
