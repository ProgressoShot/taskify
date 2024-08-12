'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/Button'
import Form from '@/components/Form'
import type { User } from '@/types/types'

interface ProfileEditValue {
  nickname: User['nickname']
  profileImageUrl: User['profileImageUrl']
}

export default function ProfileEditForm() {
  const [mount, setMount] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    setValue,
  } = useForm<ProfileEditValue>()

  useEffect(() => {
    setMount(true)
  }, [])
  if (!mount) return null
  const user: User = JSON.parse(String(sessionStorage.getItem('user')))

  setValue('nickname', user.nickname)
  setValue('profileImageUrl', user.profileImageUrl)

  return (
    <Form
      formId='profileEditForm'
      className='mx-auto max-w-full'
      onSubmit={handleSubmit((data: ProfileEditValue) => {
        console.log(data)
      })}
    >
      <Form.Label className='mb-2 md:mb-4'>
        <Form.LabelHeader>이메일</Form.LabelHeader>
        <Form.Input type='email' placeholder={user.email} isDisabled />
      </Form.Label>
      <Form.Label className='mb-4 md:mb-6'>
        <Form.LabelHeader>닉네임</Form.LabelHeader>
        <div className='relative'>
          <Form.Input
            type='text'
            register={register('nickname', {
              required: { value: true, message: '닉네임을 입력해주세요' },
            })}
            placeholder='닉네임을 입력해주세요.'
            required
          ></Form.Input>
        </div>
      </Form.Label>
      <Button
        isDisabled={false}
        form='profileEditForm'
        type='submit'
        className='h-[50px] w-full'
      >
        저장
      </Button>
    </Form>
  )
}
