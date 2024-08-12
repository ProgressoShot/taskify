import cn from 'classnames'

interface UserAvatarProps {
  name: string
}

type Colors = 'orange' | 'green' | 'pink' | 'blue'
const colors: Colors[] = ['orange', 'green', 'pink', 'blue']

export default function UserAvatar({ name }: UserAvatarProps) {
  const randomIndex = Math.floor(Math.random() * colors.length)
  const randomColor = colors[randomIndex]
  const bgColor = `bg-custom-tag-${randomColor}-100`
  const textColor = `text-custom-tag-${randomColor}-200`

  return (
    <div
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-full border-2 border-white',
        bgColor,
        textColor
      )}
    >
      {name[0]}
    </div>
  )
}
