import cn from 'classnames'
import Image from 'next/image'

import { Comment, DashboardMembersType, TaskCard, User } from '@/types/types'

type Colors = 'orange' | 'green' | 'pink' | 'blue'
const colors: Colors[] = ['orange', 'green', 'pink', 'blue']

interface UserAvatarProps {
  className?: string
  user?: User
  member?: DashboardMembersType
  count?: string
  card?: TaskCard
  comment?: Comment
}

export default function UserAvatar({
  className,
  user,
  member,
  count,
  comment,
  card,
}: UserAvatarProps) {
  const randomIndex = Math.floor(Math.random() * colors.length)
  const randomColor = colors[randomIndex]
  const bgColor = `bg-custom-tag-${randomColor}-100`
  const textColor = `text-custom-tag-${randomColor}-200`

  const url: string =
    user?.profileImageUrl ||
    member?.profileImageUrl ||
    comment?.author.profileImageUrl ||
    card?.assignee.profileImageUrl ||
    ''

  const name: string =
    user?.nickname ||
    member?.nickname ||
    comment?.author.nickname ||
    card?.assignee.nickname ||
    ''

  const classNames = {
    default:
      'relative h-8 w-8 md:h-10 md:w-10 rounded-full border-2 border-white',
    image: 'overflow-hidden',
    text: 'flex justify-center items-center text-sm md:text-base',
  }

  const textStyle = cn(
    classNames.default,
    classNames.text,
    bgColor,
    textColor,
    className
  )

  const imageStyle = cn(classNames.default, classNames.image, className)

  if (count) return <div className={textStyle}>{count}</div>

  if (url)
    return (
      <div className={imageStyle}>
        <Image fill src={url} alt={name} />
      </div>
    )

  return <div className={textStyle}>{name[0]}</div>
}
