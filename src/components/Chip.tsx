import cn from 'classnames'
import { ReactNode } from 'react'

interface ChipProps {
  children: ReactNode
}

// tailwind.config.ts 파일의 tag 색상 값을 Chip 컴포넌트 내에 정의
const tagColors = {
  orange: {
    100: 'bg-[#F9EEE3]',
    200: 'bg-[#D58D49]',
  },
  green: {
    100: 'bg-[#E7F7DB]',
    200: 'bg-[#86D549]',
  },
  pink: {
    100: 'bg-[#F7DBF0]',
    200: 'bg-[#D549B6]',
  },
  blue: {
    100: 'bg-[#DBE6F7]',
    200: 'bg-[#4981D5]',
  },
}

function getRandomColor() {
  const colorCategories = Object.keys(tagColors)
  const randomCategory =
    colorCategories[Math.floor(Math.random() * colorCategories.length)]
  const colors = tagColors[randomCategory]
  const colorShades = Object.keys(colors)
  const randomShade =
    colorShades[Math.floor(Math.random() * colorShades.length)]
  return {
    bgColor: colors[randomShade],
    textColor:
      randomCategory === 'orange' || randomCategory === 'pink'
        ? 'text-black'
        : 'text-white',
  }
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
      <span>{children}</span>
    </div>
  )
}
