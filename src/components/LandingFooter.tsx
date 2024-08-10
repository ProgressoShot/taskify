'use client'
import cn from 'classnames'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import IconFacebook from '/public/icons/facebook.svg'
import IconInsta from '/public/icons/instagram.svg'
import IconMail from '/public/icons/mail.svg'

export default function LandingFooter() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return ''
  }

  return (
    <footer
      className={
        'flex flex-col items-center justify-center overflow-hidden dark:bg-black dark:text-custom-black-100 sm:flex-row xl:px-10'
      }
    >
      <div className='mt-16 flex h-auto w-full flex-col items-center sm:mt-28 sm:h-[100px] sm:max-w-screen-xl sm:flex-row sm:justify-between'>
        <div className='items-center'>©codeit - 2023</div>
        <div className='flex h-auto items-center sm:gap-4'>
          <Link href='' className='p-2'>
            Privacy Policy
          </Link>
          <Link href='' className='p-2'>
            FAQ
          </Link>
        </div>
        <div className={'mb-20 mt-12 flex items-center gap-4 sm:mb-0 sm:mt-0'}>
          <Link
            href='mailto:support@codeit.kr'
            className='p-2'
            aria-label='이메일 링크'
          >
            <IconMail fill={theme === 'dark' ? '#fff' : '#333'} />
          </Link>
          <Link
            href='https://www.facebook.com/codeit.kr/'
            className='p-2 text-custom-light-violet'
            aria-label='페이스북 링크'
          >
            <IconFacebook fill={theme === 'dark' ? '#fff' : '#333'} />
          </Link>
          <Link
            href='https://www.instagram.com/codeit_kr/'
            className='p-2'
            aria-label='인스타그램 링크'
          >
            <IconInsta fill={theme === 'dark' ? '#fff' : '#333'} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
