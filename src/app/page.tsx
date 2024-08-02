'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import IconFacebook from '/public/icons/facebook.svg'
import IconInsta from '/public/icons/instagram.svg'
import IconMail from '/public/icons/mail.svg'
import Button from '@/components/Button'
import RootHeader from '@/layouts/RootHeader'

export default function Home() {
  return (
    <>
      <RootHeader theme='dark'>
        <RootHeader.Features theme='dark'>
          <div className='flex gap-9'>
            <Link href={'/auth/login'}>로그인</Link>
            <Link href={'/auth/sign'}>회원가입</Link>
          </div>
        </RootHeader.Features>
      </RootHeader>
      <main className='flex min-h-screen flex-col items-center justify-between gap-24 bg-black p-[40px] text-white'>
        <Image
          src='/images/banner.svg'
          width={722}
          height={422}
          alt='사람들이 회의하는 모습'
          className='mx-16'
        />

        <h1 className='mt-10 text-center text-[76px] font-bold leading-[100px]'>
          새로운 일정 관리{' '}
          <span className='font-montserrat text-[90px] font-bold leading-[65px] text-indigo-600'>
            Taskify
          </span>
        </h1>

        <Button className='mb-44 inline-flex h-[54px] w-72 items-center justify-center gap-2.5 rounded-lg px-[101px] py-[9px] text-center text-[18px] font-medium'>
          로그인하기
        </Button>

        <section className='flex h-[600px] w-full max-w-screen-xl gap-24 rounded-lg bg-custom-black-300'>
          <div className='ml-16 basis-1/2'>
            <div className='mb-24 mt-28 text-[22px] font-medium text-gray-400'>
              Point 1
            </div>
            <h2 className='break-keep text-5xl font-bold leading-[64px]'>
              일의 우선순위를 관리하세요
            </h2>
          </div>
          <div className='justify-right flex basis-1/2 align-bottom'>
            <Image
              className='object-contain object-bottom'
              src='/images/landing-01.svg'
              width={594}
              height={497}
              alt='대시보드 캡쳐 화면'
            />
          </div>
        </section>
        <section className='flex h-[600px] w-full max-w-screen-xl flex-row-reverse gap-24 rounded-lg bg-custom-black-300'>
          <div className='basis-1/2'>
            <div className='mb-24 mt-28 text-[22px] font-medium text-gray-400'>
              Point 2
            </div>
            <h2 className='break-keep text-5xl font-bold leading-[64px]'>
              해야 할 일을 등록하세요
            </h2>
          </div>
          <div className='flex basis-1/2 justify-center align-bottom'>
            <Image
              className='justify-center object-contain object-bottom'
              src='/images/landing-02.svg'
              width={436}
              height={502}
              alt='할 일 생성 캡쳐 화면'
            />
          </div>
        </section>
        <section className='w-full max-w-screen-xl'>
          <h3 className='mb-8 w-full text-left text-[28px] font-bold'>
            생산성을 높이는 다양한 설정 ⚡
          </h3>
          <ul className='flex w-full justify-center gap-8'>
            <li className='w-full overflow-hidden rounded-lg'>
              <div className='flex h-[260px] justify-center bg-neutral-600 align-middle'>
                <Image
                  className='object-contain'
                  src='/images/landing-03.png'
                  alt='대시보드 캡쳐 화면'
                  width={300}
                  height={124}
                />
              </div>

              <div className='bg-custom-black-300 p-8'>
                <h4 className='text-lg font-bold'>대시보드 설정</h4>
                <p className='font-base text-medium'>
                  대시보드 사진과 이름을 변경할 수 있어요.
                </p>
              </div>
            </li>
            <li className='w-full overflow-hidden rounded-lg'>
              <div className='flex h-[260px] justify-center bg-neutral-600 align-middle'>
                <Image
                  className='object-contain'
                  src='/images/landing-04.png'
                  alt='초대 캡쳐 화면'
                  width={300}
                  height={231}
                />
              </div>
              <div className='bg-custom-black-300 p-8'>
                <h4 className='text-lg font-bold'>초대</h4>
                <p className='font-base text-medium'>
                  새로운 팀원을 초대할 수 있어요.
                </p>
              </div>
            </li>
            <li className='w-full overflow-hidden rounded-lg'>
              <div className='flex h-[260px] justify-center bg-neutral-600 align-middle'>
                <Image
                  className='object-contain'
                  src='/images/landing-05.png'
                  alt='구성원 목록 캡쳐 화면'
                  width={300}
                  height={195}
                />
              </div>
              <div className='bg-custom-black-300 p-8'>
                <h4 className='text-lg font-bold'>구성원</h4>
                <p className='font-base text-medium'>
                  구성원을 초대하고 내보낼 수 있어요.
                </p>
              </div>
            </li>
          </ul>
        </section>
      </main>
      <footer className='bg-black text-custom-black-100'>
        <div className='mx-36 flex h-[100px] place-content-between items-center'>
          <div className='flex items-center'>©codeit - 2023</div>
          <div className='flex h-auto items-center gap-4'>
            <Link href='' className='p-2'>
              Privacy Policy
            </Link>
            <Link href='' className='p-2'>
              FAQ
            </Link>
          </div>
          <div className='flex gap-4'>
            <Link href='' className='p-2' aria-label='이메일 링크'>
              <IconMail />
            </Link>
            <Link href='' className='p-2' aria-label='페이스북 링크'>
              <IconFacebook />
            </Link>
            <Link href='' className='p-2' aria-label='인스타그램 링크'>
              <IconInsta />
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
