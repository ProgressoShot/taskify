import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  className?: string
  type?: ButtonType
  color?: ButtonColor
  isDisabled?: boolean
}

type ButtonType = 'submit' | 'button'
type ButtonColor = 'primary' | 'secondary'

export default function Button({
  children,
  className = '',
  type = 'button',
  color = 'primary',
  isDisabled = false,
}: ButtonProps) {
  const buttonColorStyle = styleByColor[color]
  return (
    <button
      className={`disabled:bg-custom-gray-200 flex items-center justify-center gap-[6px] rounded-lg font-medium disabled:text-white md:gap-2 ${buttonColorStyle}`}
      type={type}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

const styleByColor: Record<ButtonColor, string> = {
  primary: 'bg-custom-violet text-white',
  secondary:
    'bg-white text-custom-violet border border-solid border-custom-gray-200',
}
