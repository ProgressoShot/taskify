'use client'

import axios from 'axios'
import { useForm } from 'react-hook-form'

import Button from '@/components/Button'
import Form from '@/components/Form'

interface LoginFormValue {
  email: string
  password: string
}

const EMAIL_PATTERN = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const PASSWORD_LENGTH = 8

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading },
  } = useForm<LoginFormValue>()

  const onSubmit = async (data: LoginFormValue) => {
    await axios
      .post('https://sp-taskify-api.vercel.app/7-2/auth/login', data)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error) // 404 존재하지 않는 유저. 모달창 띄워야 함
      })
  }

  const isDisabled = !!(errors.email || errors.password || isLoading)

  return (
    <Form
      formId='loginForm'
      className='mx-auto'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Label className='mb-4'>
        <Form.LabelHeader>이메일</Form.LabelHeader>
        <Form.Input
          register={register('email', {
            required: { value: true, message: '이메일을 입력해주세요' },
            pattern: {
              value: EMAIL_PATTERN,
              message: '이메일 형식으로 작성해주세요.',
            },
          })}
          hasError={!!errors.email}
          type='email'
          name='email'
          placeholder='이메일'
          required
        />
        {errors.email && <Form.Error>{errors.email.message}</Form.Error>}
      </Form.Label>
      <Form.Label className='mb-6'>
        <Form.LabelHeader>비밀번호</Form.LabelHeader>
        <Form.Input
          register={register('password', {
            required: { value: true, message: '비밀번호를 입력해주세요.' },
            minLength: {
              value: PASSWORD_LENGTH,
              message: `${PASSWORD_LENGTH}자 이상 작성해 주세요.`,
            },
          })}
          hasError={!!errors.password}
          type='password'
          name='password'
          placeholder='비밀번호'
          required
        />
        {errors.password && <Form.Error>{errors.password.message}</Form.Error>}
      </Form.Label>
      <Button
        isDisabled={isDisabled}
        form='loginForm'
        type='submit'
        className='h-[50px] w-full'
      >
        로그인
      </Button>
    </Form>
  )
}
