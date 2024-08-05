import cn from 'classnames'
import { ReactNode } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

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
type InputName = 'email' | 'nickname' | 'password' | 'passwordConfirm'

interface InputProps {
  children?: ReactNode
  className?: string
  type: InputType
  name: InputName
  required?: boolean
  placeholder?: string
  register?: ReturnType<UseFormRegister<FieldValues>>
  hasError?: boolean
}

interface TextAreaProps {
  children?: ReactNode
  className?: string
  name: InputName
  required?: boolean
  placeholder?: string
  register?: ReturnType<UseFormRegister<FieldValues>>
}

export default function Form({
  children,
  className,
  onSubmit,
  formId,
}: FormProps) {
  const formClass = cn('max-w-[520px]', className)
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
  children,
  className,
  name,
  type,
  required,
  placeholder,
  register,
  hasError,
}: InputProps) {
  const inputClass = cn(
    'block w-full rounded-lg border border-custom-gray-300 px-4 py-3 text-custom-black-200 outline-none placeholder:text-custom-gray-400 focus:border-custom-violet',
    {
      'border-custom-red focus:border-custom-red': hasError,
    },
    className
  )
  return (
    <div className='relative'>
      {children}
      <input
        className={inputClass}
        {...register}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
      />
    </div>
  )
}

function TextArea({
  children,
  className,
  name,
  required,
  placeholder,
}: TextAreaProps) {
  const textAreaClass = cn(
    'block h-[126px] w-full resize-none rounded-lg border border-custom-gray-300 px-4 py-3 text-custom-black-200 outline-custom-violet placeholder:text-custom-gray-400',
    className
  )
  return (
    <div className='relative'>
      {children}
      <textarea
        className={textAreaClass}
        name={name}
        required={required}
        placeholder={`${placeholder}을/를 입력해주세요`}
      />
    </div>
  )
}

function Error({ children, className }: BasicProps) {
  const errorClasee = cn('text-sm font-normal text-custom-red', className)
  return <span className={errorClasee}>{children}</span>
}

Form.Label = Label
Form.LabelHeader = LabelHeader
Form.Input = Input
Form.TextArea = TextArea
Form.Error = Error
