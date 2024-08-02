import { DashboardName, DashboardNameProps } from '@/components/DashboardName'

type DashboardInfo = {
  id: number
  title: string
  color: string
  createdAt: Date
  updatedAt: Date
  createdByMe: Boolean
  userId: number
}

interface DashboardCardProps extends DashboardNameProps {
  onClick?: () => void
}

export function DashboardCard({ type, children, onClick }: DashboardCardProps) {
  const classNames =
    type === 'side'
      ? 'py-3 px-4'
      : 'round-container h-full w-full border border-custom-gray-300 bg-white p-5'

  return (
    <button
      onClick={onClick}
      className={`rounded-lg transition hover:bg-custom-gray-100 ${classNames}`}
    >
      <DashboardName type={type}>{children}</DashboardName>
    </button>
  )
}
