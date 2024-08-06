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

  return (
    <div
      className={cn(
        'mr-[6px] flex rounded-md px-[6px] py-[2px] text-[14px] font-normal',
        bgColor,
        textColor
      )}
    >
      <span className=''>{children}</span>
    </div>
  )
}
