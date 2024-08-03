import Image from 'next/image'
import Link from 'next/link'

import LandingFooter from '@/LandingFooter'
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
        <main className='flex min-h-screen flex-col items-center justify-between gap-16 p-4 dark:bg-black dark:text-white xl:gap-24 xl:p-[40px]'>
          <Image
            src='/images/banner.svg'
            width={722}
            height={423}
            alt='사람들이 회의하는 모습'
            className='mx-16 mt-24 h-auto w-full max-w-[540px] xl:h-[423px] xl:w-[722px] xl:max-w-[722px]'
            priority={true}
          />

          <h1 className='mt-10 text-center text-[40px] font-bold sm:text-[70px] xl:text-[76px] xl:leading-[100px]'>
            새로운 일정 관리{' '}
            <span className='font-montserrat text-[42px] font-bold text-indigo-600 sm:text-[70px] xl:text-[90px] xl:leading-[65px]'>
              Taskify
            </span>
          </h1>

          <Link
            href=''
            className='mb-44 flex h-[54px] w-auto items-center justify-center gap-[6px] rounded-lg bg-custom-violet px-[101px] py-[9px] text-center text-lg font-medium text-white disabled:bg-custom-gray-200 disabled:text-white md:gap-2'
          >
            로그인하기
          </Link>

          <section className='w-full max-w-[664px] gap-24 rounded-lg bg-[#F1EFFD] dark:bg-custom-black-300 xl:flex xl:h-[600px] xl:max-w-screen-xl'>
            <div className='basis-1/2 sm:ml-16'>
              <div className='mb-20 mt-14 text-center text-[22px] font-medium text-gray-400 sm:text-left xl:mb-24 xl:mt-28'>
                Point 1
              </div>
              <h2 className='leading-break-keep mb-40 text-center text-[36px] font-bold leading-snug sm:mb-72 sm:text-left xl:text-5xl'>
                일의 우선순위를 <br /> 관리하세요
              </h2>
            </div>
            <div className='justify-right flex basis-1/2 items-end pl-12'>
              <Image
                className='object-contain object-bottom sm:ml-auto xl:h-[497px] xl:w-[594px]'
                src='/images/landing-01.svg'
                width={594}
                height={497}
                alt='대시보드 캡쳐 화면'
              />
            </div>
          </section>
          <section className='w-full max-w-[664px] flex-row-reverse gap-24 rounded-lg bg-[#F1EFFD] dark:bg-custom-black-300 xl:flex xl:h-[600px] xl:max-w-screen-xl'>
            <div className='basis-1/2 sm:ml-16'>
              <div className='mb-20 mt-14 text-center text-[22px] font-medium text-gray-400 sm:text-left xl:mb-24 xl:mt-28'>
                Point 2
              </div>
              <h2 className='leading-break-keep mb-40 text-center text-[36px] font-bold leading-snug sm:mb-72 sm:text-left xl:text-5xl'>
                해야 할 일을 <br />
                등록하세요
              </h2>
            </div>
            <div className='flex basis-1/2 items-end justify-center px-16'>
              <Image
                className='h-auto w-auto object-contain xl:h-[502px] xl:w-[436px]'
                src='/images/landing-02.svg'
                width={436}
                height={502}
                alt='할 일 생성 캡쳐 화면'
              />
            </div>
          </section>
          <section className='w-full max-w-screen-xl'>
            <h3 className='mb-8 mt-16 w-full text-center text-[28px] font-bold xl:text-left'>
              생산성을 높이는 다양한 설정 ⚡
            </h3>
            <ul className='mx-auto flex w-full max-w-96 flex-col items-center justify-center gap-8 xl:max-w-full xl:flex-row'>
              <li className='w-full overflow-hidden rounded-lg'>
                <div className='flex h-[260px] items-center justify-center bg-custom-violet px-10 dark:bg-neutral-600'>
                  <Image
                    className='h-[124px] w-[300px] object-contain'
                    src='/images/landing-03.png'
                    alt='대시보드 캡쳐 화면'
                    width={300}
                    height={124}
                  />
                </div>

                <div className='bg-[#F1EFFD] p-8 dark:bg-custom-black-300'>
                  <h4 className='mb-4 text-lg font-bold text-custom-violet dark:text-white'>
                    대시보드 설정
                  </h4>
                  <p className='font-base text-medium'>
                    대시보드 사진과 이름을 변경할 수 있어요.
                  </p>
                </div>
              </li>
              <li className='w-full overflow-hidden rounded-lg'>
                <div className='flex h-[260px] items-center justify-center bg-custom-violet px-10 dark:bg-neutral-600'>
                  <Image
                    className='h-[231px] w-[300px] object-contain'
                    src='/images/landing-04.png'
                    alt='초대 캡쳐 화면'
                    width={300}
                    height={231}
                  />
                </div>
                <div className='bg-[#F1EFFD] p-8 dark:bg-custom-black-300'>
                  <h4 className='mb-4 text-lg font-bold text-custom-violet dark:text-white'>
                    초대
                  </h4>
                  <p className='font-base text-medium'>
                    새로운 팀원을 초대할 수 있어요.
                  </p>
                </div>
              </li>
              <li className='w-full overflow-hidden rounded-lg'>
                <div className='flex h-[260px] items-center justify-center bg-custom-violet px-10 dark:bg-neutral-600'>
                  <Image
                    className='h-[195px] w-[300px] object-contain'
                    src='/images/landing-05.png'
                    alt='구성원 목록 캡쳐 화면'
                    width={300}
                    height={195}
                  />
                </div>
                <div className='bg-[#F1EFFD] p-8 dark:bg-custom-black-300'>
                  <h4 className='mb-4 text-lg font-bold text-custom-violet dark:text-white'>
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
        <div className='hidden h-auto flex-col items-center sm:mx-36 sm:mt-0 sm:h-[100px] sm:flex-row sm:justify-between'></div>
        <LandingFooter />
      </Providers>
    </>
  )
}
