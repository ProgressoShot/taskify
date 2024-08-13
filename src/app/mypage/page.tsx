'use client'
import CaretLeft from '/public/icons/caret-left.svg'
import useGoBack from '@/hooks/useGoBack'
import useRedirect from '@/hooks/useRedirect'

import PasswordEditForm from './components/PasswordEditForm'
import ProfileEditForm from './components/ProfileEditForm'

export default function MyPagePage() {
  useRedirect({ requireAuth: true })

  const handleGoBack = useGoBack()

  return (
    <>
      <button
        className='mb-[6px] flex items-center gap-2 text-sm font-medium text-custom-black-200 md:mb-[30px] md:text-base'
        type='button'
        onClick={handleGoBack}
      >
        <CaretLeft className='h-[18px] w-[18px] md:h-5 md:w-5' /> 돌아가기
      </button>
      <section className='mb-4 max-w-[672px] rounded-lg bg-white p-4 md:mb-6 md:rounded-2xl md:p-6'>
        <h2 className='mb-10 text-lg font-bold md:mb-6 md:text-2xl'>프로필</h2>
        <ProfileEditForm />
      </section>
      <section className='max-w-[672px] rounded-lg bg-white p-4 md:mb-6 md:rounded-2xl md:p-6'>
        <h2 className='mb-10 text-lg font-bold md:mb-6 md:text-2xl'>
          비밀번호 변경
        </h2>
        <PasswordEditForm />
      </section>
    </>
  )
}
