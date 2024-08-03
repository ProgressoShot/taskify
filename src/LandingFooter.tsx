'use client'

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
    <footer className='items:center flex flex-col justify-center overflow-hidden text-custom-black-100 dark:bg-black dark:text-custom-black-100 sm:flex-row'>
      <div className='mt-28 flex h-auto w-full flex-col items-center sm:mx-36 sm:h-[100px] sm:flex-row sm:justify-between'>
        <div className='items-center'>©codeit - 2023</div>
        <div className='flex h-auto items-center sm:gap-4'>
          <Link href='' className='p-2'>
            Privacy Policy
          </Link>
          <Link href='' className='p-2'>
            FAQ
          </Link>
        </div>
        <div className='mb-20 flex items-center gap-4 sm:mb-0'>
          <Link href='mailto:' className='p-2' aria-label='이메일 링크'>
            <IconMail fill={theme === 'dark' ? '#fff' : '#333'} />
          </Link>
          <Link
            href=''
            className='p-2 text-custom-light-violet'
            aria-label='페이스북 링크'
          >
            <IconFacebook fill={theme === 'dark' ? '#fff' : '#333'} />
          </Link>
          <Link href='' className='p-2' aria-label='인스타그램 링크'>
            <IconInsta fill={theme === 'dark' ? '#fff' : '#333'} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
