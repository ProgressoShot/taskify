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
  console.log(bgColor)
  console.log(textColor)
  const chipClass = cn(
    'mr-[6px] flex rounded-[4px] px-[6px] py-[2px] text-sm font-normal',
    bgColor,
    textColor
  )
  return (
    <div className={chipClass}>
      {children}
      <span className='hidden bg-custom-tag-blue-100 bg-custom-tag-green-100 bg-custom-tag-orange-100 bg-custom-tag-pink-100 text-custom-tag-blue-200 text-custom-tag-green-200 text-custom-tag-orange-200 text-custom-tag-pink-200'></span>
    </div>
  )
}
