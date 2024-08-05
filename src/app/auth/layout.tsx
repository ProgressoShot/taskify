import { ReactNode } from 'react'

interface AuthLayout {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayout) {
  return <div className='bg-custom-gray-100'>{children}</div>
}
