import AddBoxIcon from '/public/icons/add-box2.svg'
import BulletIcon from '/public/icons/bullet.svg'
import CaretRightIcon from '/public/icons/caret-right.svg'
import CrownIcon from '/public/icons/crown.svg'

type Colors = 'violet' | 'red' | 'green' | 'purple' | 'orange' | 'blue' | 'pink'

const COLOR_PRESET: Record<Colors, string> = {
  violet: 'text-custom-violet',
  red: 'text-custom-red',
  green: 'text-custom-green',
  purple: 'text-custom-purple',
  orange: 'text-custom-orange',
  blue: 'text-custom-blue',
  pink: 'text-custom-pink',
}

type DashboardCardType = 'card' | 'side' | 'add'

export interface DashboardCardTypeProp {
  type: DashboardCardType
}

export default function DashboardName({
  children,
  type,
}: React.PropsWithChildren & DashboardCardTypeProp) {
  /**
   * @todo
   * 1. BulletIcon fill 색상 color 받아오기
   * 2. CrownIcon 출력조건 createByMe 받아오기
   */
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

  const color: Colors = 'blue'

  return (
    <article className={`flex items-center ${classNames.wrap}`}>
      <section className={`flex items-center ${classNames.gap}`}>
        {type !== 'add' && (
          <BulletIcon className={`${COLOR_PRESET[color]} ${classNames.mr}`} />
        )}
        <p className={`whitespace-nowrap ${classNames.txt}`}>{children}</p>
        {type === 'add' && <AddBoxIcon />}
        {type !== 'add' && /* createdByMe */ true && (
          <CrownIcon fill='#FDD446' className={`${classNames.crown}`} />
        )}
      </section>
      {type === 'card' && <CaretRightIcon />}
    </article>
  )
}
