import cn from 'classnames'
import { ReactNode } from 'react'

interface ChipProps {
  children: ReactNode
}

type Colors = 'orange' | 'green' | 'pink' | 'blue'
const colors: Colors[] = ['orange', 'green', 'pink', 'blue']

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length)
  const randomColor = colors[randomIndex]
  const bgColor = `bg-custom-tag-${randomColor}-100`
  const textColor = `text-custom-tag-${randomColor}-200`
  return { bgColor, textColor }
}

export default function Chip({ children }: ChipProps) {
  const { bgColor, textColor } = getRandomColor()
  const chipClass = cn(
    'mr-[6px] flex rounded-[4px] px-[6px] py-[2px] text-sm font-normal',
    bgColor,
    textColor
  )
  return <div className={chipClass}>{children}</div>
}
