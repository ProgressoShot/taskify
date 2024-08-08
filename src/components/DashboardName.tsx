import { ReactNode } from 'react'

import AddBoxIcon from '/public/icons/add-box2.svg'
import BulletIcon from '/public/icons/bullet.svg'
import CaretRightIcon from '/public/icons/caret-right.svg'
import CrownIcon from '/public/icons/crown.svg'
import { Dashboard, DashboardCardType } from '@/types/types'

interface DashboarNameProp extends Dashboard {
  children: ReactNode
  type: DashboardCardType
}

export default function DashboardName({
  color = 'green',
  createdByMe = false,
  children,
  type,
}: DashboarNameProp) {
  const classNames: Record<string, string> = {
    wrap:
      type === 'add'
        ? 'justify-center'
        : type === 'side'
          ? 'justify-center md:justify-between'
          : 'justify-between',
    gap: type === 'side' ? 'gap-1.5' : 'gap-2',
    mr: type === 'side' ? 'mr-0.5' : 'mr-1',
    txt:
      type === 'side'
        ? 'text-lg text-custom-gray-500 hidden md:block'
        : 'text-base text-custom-black-200',
    crown: type === 'side' ? 'scale-90 hidden md:block' : 'scale-100',
  }

  return (
    <article className={`flex items-center ${classNames.wrap}`}>
      <section className={`flex items-center ${classNames.gap}`}>
        {type !== 'add' && (
          <BulletIcon className={classNames.mr} style={{ color: color }} />
        )}
        <p className={`whitespace-nowrap ${classNames.txt}`}>{children}</p>
        {type === 'add' && <AddBoxIcon />}
        {type !== 'add' && createdByMe && (
          <CrownIcon
            style={{ color: '#FDD446' }}
            className={classNames.crown}
          />
        )}
      </section>
      {type === 'card' && <CaretRightIcon />}
    </article>
  )
}
