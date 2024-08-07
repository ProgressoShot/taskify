import cn from 'classnames'
import { ReactNode } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

import EyeClosed from '/public/icons/eye-closed.svg'
import EyeOpen from '/public/icons/eye-open.svg'

interface BasicProps {
  children: ReactNode
  className?: string
}

interface FormProps extends BasicProps {
  onSubmit: (data: any) => void
  formId: string
}

interface LabelProps extends BasicProps {}

type InputType = 'email' | 'password' | 'text'

interface InputProps {
  className?: string
  type: InputType
  required?: boolean
  placeholder?: string
  register?: ReturnType<UseFormRegister<FieldValues>>
  hasError?: boolean
  autoComplete?: string
}

interface TextAreaProps {
  className?: string
  required?: boolean
  placeholder?: string
  register?: ReturnType<UseFormRegister<FieldValues>>
}

interface EyeButtonProps {
  className?: string
  isOpen: boolean
  onClick: () => void
}

export default function Form({
  children,
  className,
  onSubmit,
  formId,
}: FormProps) {
  const formClass = cn('w-full max-w-[520px]', className)
  return (
    <form id={formId} className={formClass} onSubmit={onSubmit}>
      {' '}
      {children}{' '}
    </form>
  )
}

function Label({ children, className }: LabelProps) {
  const labelClass = cn('flex flex-col gap-2', className)
  return <label className={labelClass}> {children} </label>
}

function LabelHeader({ children, className }: LabelProps) {
  const headerClass = cn(
    'text-base font-normal text-custom-black-200',
    className
  )
  return <h3 className={headerClass}> {children} </h3>
}
function Input({
  className,
  type,
  required,
  placeholder,
  register,
  hasError,
  autoComplete,
}: InputProps) {
  const inputClass = cn(
    'rounded-container block w-full px-4 py-3 text-custom-black-200 outline-none placeholder:text-custom-gray-400 focus:border-custom-violet',
    {
      'border-custom-red focus:border-custom-red': hasError,
    },
    className
  )
  return (
    <input
      className={inputClass}
      {...register}
      type={type}
      required={required}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
  )
}

function TextArea({ className, required, placeholder }: TextAreaProps) {
  const textAreaClass = cn(
    'rounded-container block h-[126px] w-full resize-none px-4 py-3 text-custom-black-200 outline-custom-violet placeholder:text-custom-gray-400',
    className
  )
  return (
    <textarea
      className={textAreaClass}
      required={required}
      placeholder={placeholder}
    />
  )
}

function Error({ children, className }: BasicProps) {
  const errorClasee = cn('text-sm font-normal text-custom-red', className)
  return <span className={errorClasee}>{children}</span>
}

function EyeButton({ className, isOpen, onClick }: EyeButtonProps) {
  const eyeButtonClass = cn(
    'absolute bottom-[13px] right-4 text-custom-gray-400',
    className
  )
  return (
    <button className={eyeButtonClass} onClick={onClick} type='button'>
      {isOpen ? <EyeOpen /> : <EyeClosed />}
    </button>
  )
}

Form.Label = Label
Form.LabelHeader = LabelHeader
Form.Input = Input
Form.TextArea = TextArea
Form.Error = Error
Form.EyeButton = EyeButton
