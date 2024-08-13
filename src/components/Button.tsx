import cn from 'classnames'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  className?: string
  color?: ButtonColor
  type?: ButtonType
  form?: string
  onClick?: any
  isDisabled?: boolean
}

type ButtonType = 'submit' | 'button'
type ButtonColor = 'primary' | 'secondary' | 'tertiary'

export default function Button({
  children,
  className = '',
  color = 'primary',
  type = 'button',
  form,
  onClick,
  isDisabled = false,
}: ButtonProps) {
  const buttonColorStyle = styleByColor[color]
  const buttonClass = cn(buttonBaseStyle, buttonColorStyle, className)
  return (
    <button
      className={buttonClass}
      type={type}
      form={form}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

const buttonBaseStyle =
  'flex h-8 w-[84px] items-center justify-center gap-[6px] rounded-lg text-sm font-medium disabled:cursor-not-allowed disabled:bg-custom-gray-400 disabled:text-white md:gap-2'

const styleByColor: Record<ButtonColor, string> = {
  primary: 'bg-custom-violet text-white',
  secondary:
    'bg-white text-custom-violet border border-solid border-custom-gray-300',
  tertiary: 'bg-custom-red border-solid text-white',
}
