import cn from 'classnames'
import { ReactNode } from 'react'

import Button from '@/components/Button'

interface BasicProps {
  children: ReactNode
  className: string
}

interface FormProps extends BasicProps {
  formId: string
}
interface LabelProps extends BasicProps {}

type InputType = 'email' | 'password' | 'text'

interface InputProps {
  children?: ReactNode
  className: string
  type?: InputType
  required?: boolean
}

interface SubmitProps extends BasicProps {}

export default function Form({ children, className, formId }: FormProps) {
  const formClass = cn('max-w-[520px]', className)
  return <form className={formClass}> {children} </form>
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

function Input({ children, className, type, required }: InputProps) {
  const inputClass = cn(
    'block w-full rounded-lg border border-custom-gray-200 px-4 py-3 placeholder:text-custom-gray-200',
    className
  )
  return (
    <div className='relative'>
      {children}
      <input
        className={inputClass}
        type={type}
        required={required}
        placeholder={`${type} 을/를 입력해주세요`}
      />
    </div>
  )
}

function Submit({ children, className }: SubmitProps) {
  const submitClass = cn('h-[50px] w-full', className)
  return (
    <Button className={submitClass} type='submit'>
      {children}
    </Button>
  )
}

Form.Label = Label
Form.LabelHeader = LabelHeader
Form.Input = Input
Form.Submit = Submit
