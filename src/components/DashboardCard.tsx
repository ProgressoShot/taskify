import cn from 'classnames'

import DashboardName, {
  DashboardCardTypeProp,
} from '@/components/DashboardName'

interface DashboardCardProps extends DashboardCardTypeProp {
  id?: number
  title?: string
  color?: string
  createdAt?: Date
  updatedAt?: Date
  createdByMe?: Boolean
  userId?: number
  onClick?: () => void
}

export default function DashboardCard({
  children,
  type,
  onClick,
}: React.PropsWithChildren & DashboardCardProps) {
  const selected: boolean = false // 선택된 대시보드

  const classNames: string = cn(
    'rounded-lg transition',
    type === 'side' && selected
      ? 'bg-custom-light-violet'
      : 'hover:bg-custom-gray-100',
    type === 'side'
      ? 'py-3 px-4'
      : 'round-container h-full w-full border border-custom-gray-300 bg-white p-5'
  )

  return (
    <button onClick={onClick} className={classNames}>
      <DashboardName type={type}>{children}</DashboardName>
    </button>
  )
}
