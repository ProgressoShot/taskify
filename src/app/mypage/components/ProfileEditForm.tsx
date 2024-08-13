'use client'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Edit from '/public/icons/edit.svg'
import Plus from '/public/icons/plus.svg'
import { imageUpload } from '@/app/utils/api'
import api from '@/app/utils/axiosInstance'
import Button from '@/components/Button'
import ConfirmModalContent from '@/components/ConfirmModalContent'
import Form from '@/components/Form'
import useModalStore from '@/store/useModalStore'
import type { User } from '@/types/types'

interface ProfileEditValue {
  nickname: User['nickname']
  profileImageUrl: User['profileImageUrl']
  file: File[]
}

export default function ProfileEditForm() {
  const [mount, setMount] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading },
    setValue,
  } = useForm<ProfileEditValue>()
  const { openModal } = useModalStore()

  useEffect(() => {
    setMount(true)
  }, [])
  if (!mount) return null
  const user: User = JSON.parse(String(sessionStorage.getItem('user')))

  setValue('nickname', user.nickname)
  setValue('profileImageUrl', user.profileImageUrl)

  let fileURL = ''
  const file = watch('file')
  if (file && file.length > 0) {
    fileURL = URL.createObjectURL(file[0])
    setValue('profileImageUrl', fileURL)
  }

  const isDisabled = !!(errors.nickname || errors.profileImageUrl)

  const onSubmit = async (data: ProfileEditValue) => {
    let modalMessage = ''
    let { nickname, profileImageUrl, file } = data

    try {
      const res = await imageUpload({ type: 'profile', image: file[0] })
      profileImageUrl = res.profileImageUrl
    } catch (error) {
      modalMessage = '이미지 업로드 실패'
    }

    try {
      await api.put('users/me', { nickname, profileImageUrl })
      const updatedUser = { ...user, nickname, profileImageUrl }
      sessionStorage.setItem('user', JSON.stringify(updatedUser))
      setValue('nickname', updatedUser.nickname)
      setValue('profileImageUrl', updatedUser.profileImageUrl)
      modalMessage = '프로필 변경에 성공하였습니다.'
    } catch (error) {
      if (axios.isAxiosError(error)) {
        modalMessage = error.response?.data.message
      } else {
        modalMessage =
          '서버에 문제가 있는거 같아요. 잠시 후에 다시 시도해보시겠어요?'
      }
    } finally {
      openModal(<ConfirmModalContent message={modalMessage} />)
    }
  }

  return (
    <Form
      formId='profileEditForm'
      className='mx-auto flex max-w-full flex-col gap-10 md:flex-row'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='h-[100px] w-[100px] md:h-[182px] md:w-[182px]'>
        {fileURL ? (
          <label className='relative flex h-full w-full cursor-pointer items-center justify-center'>
            <Image
              className='rounded-md object-cover opacity-60'
              fill
              src={fileURL}
              alt='프로필 사진'
            />
            <Edit className='z-10 h-5 w-5 md:h-[30px] md:w-[30px]' />
            <Form.Input
              register={register('file')}
              type='file'
              className='hidden'
            />
          </label>
        ) : (
          <label className='flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-gray-100 text-custom-violet'>
            <Plus className='h-5 w-5 md:h-[30px] md:w-[30px]' />
            <Form.Input
              register={register('file')}
              type='file'
              className='hidden'
            />
          </label>
        )}
      </div>
      <div className='flex-1'>
        <Form.Label className='mb-4'>
          <Form.LabelHeader>이메일</Form.LabelHeader>
          <Form.Input type='email' placeholder={user.email} isDisabled />
        </Form.Label>
        <Form.Label className='mb-6'>
          <Form.LabelHeader>닉네임</Form.LabelHeader>
          <Form.Input
            type='text'
            register={register('nickname', {
              required: { value: true, message: '닉네임을 입력해주세요' },
            })}
            placeholder='닉네임을 입력해주세요.'
            required
          ></Form.Input>
        </Form.Label>
        <Button
          isDisabled={isDisabled}
          form='profileEditForm'
          type='submit'
          className='h-[50px] w-full'
        >
          저장
        </Button>
      </div>
    </Form>
  )
}
