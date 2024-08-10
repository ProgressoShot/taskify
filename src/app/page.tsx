'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import LandingFooter from '@/components/LandingFooter'
import useAutotyping from '@/hooks/useAutotyping'
import useMediaQuery from '@/hooks/useMediaQuery'
import RootHeader from '@/layouts/RootHeader'

import { Providers } from './providers'

type Mode = keyof TypeTextWidth
type TypeTextWidth = {
  mobile: number
  tablet: number
  desktop: number
}
export default function Home() {
  const { currentText } = useAutotyping('Taskify')
  const mode: Mode = useMediaQuery()

  const textWidth: TypeTextWidth = {
    mobile: 32,
    tablet: 32,
    desktop: 42,
  }
  return (
    <>
      <Providers>
        <RootHeader>
          <RootHeader.Features>
            <div className='flex gap-9'>
              <Link href={'/login'}>로그인</Link>
              <Link href={'/signup'}>회원가입</Link>
            </div>
          </RootHeader.Features>
        </RootHeader>
        <main className='flex min-h-screen flex-col items-center justify-between gap-16 p-4 dark:bg-black dark:text-white xl:gap-24 xl:p-[40px]'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className='relative mx-auto mt-24 h-auto w-full max-w-[540px] overflow-hidden rounded-lg bg-black xl:h-[423px] xl:w-[722px] xl:max-w-[722px]'>
              <Image
                src='/images/banner-01.png'
                width={722}
                height={423}
                alt=''
                className='relative'
                priority={true}
              />
              <motion.div
                initial={{ x: 0, y: 200 }}
                animate={{ x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Image
                  style={{ width: 'calc(100% + 10px)' }}
                  src='/images/banner-02.png'
                  width={732}
                  height={184}
                  alt='사람들이 회의하는 모습'
                  className='absolute bottom-0 left-[-5px] right-[-5px] top-auto max-w-none'
                  priority={true}
                />
              </motion.div>
            </div>
          </motion.div>

          <h1 className='mt-10 text-center text-[40px] font-bold sm:text-[70px] xl:text-[76px] xl:leading-[100px]'>
            새로운 일정 관리{' '}
            <div className='relative inline-block pr-2 font-montserrat text-[42px] font-bold text-indigo-600 sm:text-[70px] xl:text-[90px] xl:leading-[65px]'>
              <span className='absolute inline after:inline-block after:h-10 after:w-1 after:animate-[blink_1s_ease-in-out_infinite] sm:after:h-16'>
                {currentText}
              </span>
              <span className='relative left-0 top-0 text-transparent'>
                Taskify
              </span>
            </div>
          </h1>

          <Link
            href=''
            className='mb-44 flex h-[54px] w-auto items-center justify-center gap-[6px] rounded-lg bg-custom-violet px-[101px] py-[9px] text-center text-lg font-medium text-white disabled:bg-custom-gray-200 disabled:text-white md:gap-2'
          >
            로그인하기
          </Link>

          <section className='w-full max-w-[664px] rounded-lg bg-custom-gray-100 dark:bg-custom-black-300 xl:flex xl:h-[600px] xl:max-w-screen-xl'>
            <div className='basis-1/2 sm:ml-16'>
              <div className='mb-20 mt-14 text-center text-[22px] font-medium text-gray-400 sm:text-left xl:mb-24 xl:mt-28'>
                Point 1
              </div>
              <h2 className='leading-break-keep mb-40 text-center text-[36px] font-bold leading-snug sm:mb-72 sm:text-left xl:text-5xl'>
                일의{' '}
                <motion.div
                  style={{ display: 'inline-block' }}
                  initial={{ x: textWidth[mode] * -2, y: 0 }}
                  whileInView={{
                    x: [textWidth[mode] * 2, textWidth[mode], 0, 0],
                    y: [0, 0, 0, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.5,
                    ease: 'easeInOut',
                  }}
                >
                  우
                </motion.div>
                <motion.div
                  style={{ display: 'inline-block' }}
                  initial={{ x: textWidth[mode] * -1, y: 0 }}
                  whileInView={{
                    x: [textWidth[mode] * -1, textWidth[mode] * -1, 0, 0],
                    y: [0, 0, 0, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.5,
                    ease: 'easeInOut',
                  }}
                >
                  선
                </motion.div>
                <motion.div
                  style={{ display: 'inline-block' }}
                  initial={{ x: textWidth[mode] * -1, y: 0 }}
                  whileInView={{
                    x: [textWidth[mode] * -1, 0, 0, 0],
                    y: [0, 0, 0, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.5,
                    ease: 'easeInOut',
                  }}
                >
                  순
                </motion.div>
                <motion.div style={{ display: 'inline-block' }}>위</motion.div>
                를 <br /> 관리하세요
              </h2>
            </div>
            <div className='justify-right flex basis-1/2 items-end pl-12'>
              <Image
                className='object-contain object-bottom sm:ml-0 xl:h-[497px] xl:w-[594px]'
                src='/images/landing-01.svg'
                width={594}
                height={497}
                alt='대시보드 캡쳐 화면'
              />
            </div>
          </section>
          <section className='w-full max-w-[664px] flex-row-reverse rounded-lg bg-custom-gray-100 dark:bg-custom-black-300 xl:flex xl:h-[600px] xl:max-w-screen-xl'>
            <div className='basis-1/2 sm:ml-16'>
              <div className='mb-20 mt-14 text-center text-[22px] font-medium text-gray-400 sm:text-left xl:mb-24 xl:mt-28'>
                Point 2
              </div>
              <h2 className='leading-break-keep mb-40 text-center text-[36px] font-bold leading-snug sm:mb-72 sm:text-left xl:text-5xl'>
                해야 할 일을 <br />
                <motion.div
                  style={{ display: 'inline-block' }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5,
                    ease: 'easeOut',
                  }}
                >
                  등
                </motion.div>
                <motion.div
                  style={{ display: 'inline-block' }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.7,
                    ease: 'easeOut',
                  }}
                >
                  록
                </motion.div>
                하세요
              </h2>
            </div>
            <div className='flex basis-1/2 items-end justify-center pr-16'>
              <Image
                className='h-auto w-auto object-contain sm:ml-16 xl:h-[502px] xl:w-[436px]'
                src='/images/landing-02.svg'
                width={436}
                height={502}
                alt='할 일 생성 캡쳐 화면'
              />
            </div>
          </section>
          <section className='w-full max-w-screen-xl'>
            <h3 className='mb-8 mt-16 w-full text-center text-[28px] font-bold xl:text-left'>
              생산성을 높이는 다양한 설정{' '}
              <motion.div
                style={{ display: 'inline-block' }}
                whileInView={{ rotateY: [0, 180, 360] }} // 스크롤 시 flip 애니메이션
                transition={{
                  duration: 1,
                  delay: 1,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeIn',
                }}
              >
                ⚡
              </motion.div>
            </h3>
            <ul className='mx-auto flex w-full max-w-96 flex-col items-center justify-center gap-8 xl:max-w-full xl:flex-row'>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0,
                }}
              >
                <li className='w-full overflow-hidden rounded-lg'>
                  <div className='flex h-[260px] items-center justify-center bg-custom-gray-200 px-10 dark:bg-neutral-600'>
                    <Image
                      className='h-[124px] w-[300px] object-contain'
                      src='/images/landing-03.png'
                      alt='대시보드 캡쳐 화면'
                      width={300}
                      height={124}
                    />
                  </div>
                  <div className='bg-custom-gray-100 p-8 dark:bg-custom-black-300'>
                    <h4 className='mb-4 text-lg font-bold text-custom-violet dark:text-white'>
                      대시보드 설정
                    </h4>
                    <p className='font-base text-medium'>
                      대시보드 사진과 이름을 변경할 수 있어요.
                    </p>
                  </div>
                </li>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                }}
              >
                <li className='w-full overflow-hidden rounded-lg'>
                  <div className='flex h-[260px] items-center justify-center bg-custom-gray-200 px-10 dark:bg-neutral-600'>
                    <Image
                      className='h-[231px] w-[300px] object-contain'
                      src='/images/landing-04.png'
                      alt='초대 캡쳐 화면'
                      width={300}
                      height={231}
                    />
                  </div>
                  <div className='bg-custom-gray-100 p-8 dark:bg-custom-black-300'>
                    <h4 className='mb-4 text-lg font-bold text-custom-violet dark:text-white'>
                      초대
                    </h4>
                    <p className='font-base text-medium'>
                      새로운 팀원을 초대할 수 있어요.
                    </p>
                  </div>
                </li>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4,
                }}
              >
                <li className='w-full overflow-hidden rounded-lg'>
                  <div className='flex h-[260px] items-center justify-center bg-custom-gray-200 px-10 dark:bg-neutral-600'>
                    <Image
                      className='h-[195px] w-[300px] object-contain'
                      src='/images/landing-05.png'
                      alt='구성원 목록 캡쳐 화면'
                      width={300}
                      height={195}
                    />
                  </div>
                  <div className='bg-custom-gray-100 p-8 dark:bg-custom-black-300'>
                    <h4 className='mb-4 text-lg font-bold text-custom-violet dark:text-white'>
                      구성원
                    </h4>
                    <p className='font-base text-medium'>
                      구성원을 초대하고 내보낼 수 있어요.
                    </p>
                  </div>
                </li>
              </motion.div>
            </ul>
          </section>
        </main>
        <div className='mt-28 hidden h-auto flex-col items-center dark:text-custom-black-100 sm:mx-10 sm:mb-0 sm:mt-0 sm:h-[100px] sm:flex-row sm:justify-between lg:mx-36'></div>
        <LandingFooter />
      </Providers>
    </>
  )
}
