import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import LogoMain from '/public/images/logo-main.svg'

type Page = 'login' | 'signup'

interface AuthLayout {
  children: ReactNode
  page: Page
}

export default function AuthPageLayout({ children, page }: AuthLayout) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-custom-gray-100 px-3 py-16 text-custom-black-200'>
      <LogoMain className='mb-2' />
      <span className='mb-9 text-lg font-medium md:mb-[30px] md:text-xl'>
        {message[page].header}
      </span>
      {children}
      <span className='mt-6 text-base font-normal'>
        {message[page].footer}{' '}
        <Link
          className='text-custom-violet underline'
          href={message[page].linkPath}
        >
          {message[page].footerLink}
        </Link>
      </span>
    </div>
  )
}

const message = {
  login: {
    header: '오늘도 만나서 반가워요',
    footer: '회원이 아니신가요?',
    footerLink: '회원가입하기',
    linkPath: '/signup',
  },
  signup: {
    header: '첫 방문을 환영합니다!',
    footer: '이미 회원이신가요?',
    footerLink: '로그인하기',
    linkPath: '/login',
  },
}
