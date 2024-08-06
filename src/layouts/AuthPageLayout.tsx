import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import LogoMain from '/public/images/logo-main.svg'

interface AuthLayout {
  children: ReactNode
}

export default function AuthPageLayout({ children }: AuthLayout) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-custom-gray-100 px-3 py-16 text-custom-black-200'>
      <LogoMain className='mb-2' />
      <span className='mb-9 text-lg font-medium md:mb-[30px] md:text-xl'>
        오늘도 만나서 반가워요!
      </span>
      {children}
      <span className='mt-6 text-base font-normal'>
        회원이 아니신가요?{' '}
        <Link className='text-custom-violet underline' href='/auth/signup'>
          회원가입하기
        </Link>
      </span>
    </div>
  )
}
