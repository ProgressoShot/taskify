import Image from 'next/image'
import Link from 'next/link'

import IconFacebook from '/public/icons/facebook.svg'
import IconInsta from '/public/icons/instagram.svg'
import IconMail from '/public/icons/mail.svg'
import RootHeader from '@/layouts/RootHeader'

import { Providers } from './providers'

export default function Home() {
  return (
    <>
      <Providers>
        <RootHeader>
          <RootHeader.Features>
            <div className='flex gap-9'>
              <Link href={'/auth/login'}>로그인</Link>
              <Link href={'/auth/sign'}>회원가입</Link>
            </div>
          </RootHeader.Features>
        </RootHeader>
        <main className='flex min-h-screen flex-col items-center justify-between gap-24 p-[40px] dark:bg-black dark:text-white'>
          <Image
            src='/images/banner.svg'
            width={722}
            height={423}
            alt='사람들이 회의하는 모습'
            className='mx-16 h-[423px] w-[722px]'
            priority={true}
          />

          <h1 className='mt-10 text-center text-[76px] font-bold leading-[100px]'>
            새로운 일정 관리{' '}
            <span className='font-montserrat text-[90px] font-bold leading-[65px] text-indigo-600'>
              Taskify
            </span>
          </h1>

          <Link
            href=''
            className='mb-44 flex h-[54px] w-auto items-center justify-center gap-[6px] rounded-lg bg-custom-violet px-[101px] py-[9px] text-center text-lg font-medium text-white disabled:bg-custom-gray-200 disabled:text-white md:gap-2'
          >
            로그인하기
          </Link>

          <section className='flex h-[600px] w-full max-w-screen-xl gap-24 rounded-lg bg-[#F1EFFD] dark:bg-custom-black-300'>
            <div className='ml-16 basis-1/2'>
              <div className='mb-24 mt-28 text-[22px] font-medium text-gray-400'>
                Point 1
              </div>
              <h2 className='break-keep text-5xl font-bold leading-[64px]'>
                일의 우선순위를 <br /> 관리하세요
              </h2>
            </div>
            <div className='justify-right flex basis-1/2 items-end'>
              <Image
                className='h-[497px] w-[594px] object-contain object-bottom'
                src='/images/landing-01.svg'
                width={594}
                height={497}
                alt='대시보드 캡쳐 화면'
              />
            </div>
          </section>
          <section className='flex h-[600px] w-full max-w-screen-xl flex-row-reverse gap-24 rounded-lg bg-[#F1EFFD] dark:bg-custom-black-300'>
            <div className='basis-1/2'>
              <div className='mb-24 mt-28 text-[22px] font-medium text-gray-400'>
                Point 2
              </div>
              <h2 className='break-keep text-5xl font-bold leading-[64px]'>
                해야 할 일을 <br />
                등록하세요
              </h2>
            </div>
            <div className='flex basis-1/2 items-end justify-center'>
              <Image
                className='h-[502px] w-[436px] object-contain'
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
                <div className='flex h-[260px] items-center justify-center bg-custom-violet dark:bg-neutral-600'>
                  <Image
                    className='h-[124px] w-[300px] object-contain'
                    src='/images/landing-03.png'
                    alt='대시보드 캡쳐 화면'
                    width={300}
                    height={124}
                  />
                </div>

                <div className='bg-[#F1EFFD] p-8 dark:bg-custom-black-300'>
                  <h4 className='mb-4 text-lg font-bold text-custom-violet'>
                    대시보드 설정
                  </h4>
                  <p className='font-base text-medium'>
                    대시보드 사진과 이름을 변경할 수 있어요.
                  </p>
                </div>
              </li>
              <li className='w-full overflow-hidden rounded-lg'>
                <div className='flex h-[260px] items-center justify-center bg-custom-violet dark:bg-neutral-600'>
                  <Image
                    className='h-[231px] w-[300px] object-contain'
                    src='/images/landing-04.png'
                    alt='초대 캡쳐 화면'
                    width={300}
                    height={231}
                  />
                </div>
                <div className='bg-[#F1EFFD] p-8 dark:bg-custom-black-300'>
                  <h4 className='mb-4 text-lg font-bold text-custom-violet'>
                    초대
                  </h4>
                  <p className='font-base text-medium'>
                    새로운 팀원을 초대할 수 있어요.
                  </p>
                </div>
              </li>
              <li className='w-full overflow-hidden rounded-lg'>
                <div className='flex h-[260px] items-center justify-center bg-custom-violet dark:bg-neutral-600'>
                  <Image
                    className='h-[195px] w-[300px] object-contain'
                    src='/images/landing-05.png'
                    alt='구성원 목록 캡쳐 화면'
                    width={300}
                    height={195}
                  />
                </div>
                <div className='bg-[#F1EFFD] p-8 dark:bg-custom-black-300'>
                  <h4 className='mb-4 text-lg font-bold text-custom-violet'>
                    구성원
                  </h4>
                  <p className='font-base text-medium'>
                    구성원을 초대하고 내보낼 수 있어요.
                  </p>
                </div>
              </li>
            </ul>
          </section>
        </main>
        <footer className='text-custom-black-100 dark:bg-black dark:text-custom-black-100'>
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
            <div className='flex items-center gap-4'>
              <Link href='mailto:' className='p-2' aria-label='이메일 링크'>
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
      </Providers>
    </>
  )
}
