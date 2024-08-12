'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/Button'
import Form from '@/components/Form'

interface PasswordEditValue {
  password: string
  newPassword: string
  newPasswordConfirm: string
}

const PASSWORD_LENGTH = 8

export default function PasswordEditForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading },
  } = useForm<PasswordEditValue>()

  const newPassword = watch('newPassword')
  const isDisabled = !!(
    errors.password ||
    errors.newPassword ||
    errors.newPasswordConfirm
  )
  const onSubmit = async (data: PasswordEditValue) => {
    const { password, newPassword } = data
    const formData = { password, newPassword }
    console.log(formData)
  }

  return (
    <Form
      formId='passwordEditForm'
      className='mx-auto max-w-full'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Label className='mb-4'>
        <Form.LabelHeader>현재 비밀번호</Form.LabelHeader>

        <Form.Input
          register={register('password', {
            required: { value: true, message: '현재 비밀번호를 입력해주세요.' },
          })}
          hasError={!!errors.password}
          type='password'
          placeholder='현재 비밀번호를 입력해주세요.'
          required
          autoComplete='current-password'
        />
        {errors.password && <Form.Error>{errors.password.message}</Form.Error>}
      </Form.Label>
      <Form.Label className='mb-4'>
        <Form.LabelHeader>새 비밀번호</Form.LabelHeader>
        <Form.Input
          register={register('newPassword', {
            required: {
              value: true,
              message: '새 비밀번호를 입력해주세요.',
            },
            minLength: {
              value: PASSWORD_LENGTH,
              message: `비밀번호는 ${PASSWORD_LENGTH}자 이상 입력해주세요`,
            },
          })}
          hasError={!!errors.newPassword}
          type='password'
          placeholder='새 비밀번호를 입력해 주세요'
          required
          autoComplete='new-password'
        />
        {errors.newPassword && (
          <Form.Error>{errors.newPassword.message}</Form.Error>
        )}
      </Form.Label>
      <Form.Label className='mb-6'>
        <Form.LabelHeader>새 비밀번호 확인</Form.LabelHeader>
        <Form.Input
          register={register('newPasswordConfirm', {
            required: {
              value: true,
              message: '새 비밀번호를 한번 더 입력해주세요.',
            },
            validate: value =>
              value === newPassword || '비밀번호가 일치하지 않습니다.',
          })}
          hasError={!!errors.newPasswordConfirm}
          type='password'
          placeholder='새 비밀번호를 한번 더 입력해 주세요'
          required
          autoComplete='new-password'
        />
        {errors.newPasswordConfirm && (
          <Form.Error>{errors.newPasswordConfirm.message}</Form.Error>
        )}
      </Form.Label>
      <Button
        isDisabled={isDisabled}
        form='passwordEditForm'
        type='submit'
        className='h-[50px] w-full'
      >
        저장
      </Button>
    </Form>
  )
}
