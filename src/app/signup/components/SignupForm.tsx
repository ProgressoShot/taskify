'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import Button from '@/components/Button'
import ConfirmModalContent from '@/components/ConfirmModalContent'
import Form from '@/components/Form'
import useToggle from '@/hooks/useToggle'
import taskifyApi from '@/lib/axiosInstance'
import useModalStore from '@/store/useModalStore'

interface SignupFormValue {
  email: string
  nickname: string
  password: string
  passwordConfirm: string
}

const EMAIL_PATTERN = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const PASSWORD_LENGTH = 8

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading },
  } = useForm<SignupFormValue>()

  const router = useRouter()
  const { openModal } = useModalStore()

  const [pwdVisible, togglePwd] = useToggle(false)
  const [pwdConfirmVisible, togglePwdConfirm] = useToggle(false)
  const passwordType = pwdVisible ? 'text' : 'password'
  const passwordConfirmType = pwdConfirmVisible ? 'text' : 'password'

  const onSubmit = async (data: SignupFormValue) => {
    await taskifyApi
      .post('users', data)
      .then(function (response) {
        const message = `가입이 완료되었습니다!`
        openModal(<ConfirmModalContent message={message} />)
        router.push('/login')
      })
      .catch(function (error) {
        openModal(<ConfirmModalContent message={error.response.data.message} />)
      })
  }

  const password = watch('password')

  const isDisabled = !!(
    errors.email ||
    errors.nickname ||
    errors.password ||
    errors.passwordConfirm ||
    isLoading
  )

  return (
    <Form
      formId='signupForm'
      className='mx-auto'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Label className='mb-2 md:mb-4'>
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
          placeholder='이메일을 입력해주세요'
          required
          autoComplete='email'
        />
        {errors.email && <Form.Error>{errors.email.message}</Form.Error>}
      </Form.Label>
      <Form.Label className='mb-2 md:mb-4'>
        <Form.LabelHeader>닉네임</Form.LabelHeader>
        <Form.Input
          register={register('nickname', {
            required: { value: true, message: '닉네임을 입력해주세요' },
          })}
          hasError={!!errors.nickname}
          type='text'
          placeholder='닉네임을 입력해주세요'
          required
          autoComplete='username'
        />
        {errors.nickname && <Form.Error>{errors.nickname.message}</Form.Error>}
      </Form.Label>
      <Form.Label className='mb-2 md:mb-4'>
        <Form.LabelHeader>비밀번호</Form.LabelHeader>
        <div className='relative'>
          <Form.Input
            register={register('password', {
              required: { value: true, message: '비밀번호를 입력해주세요.' },
              minLength: {
                value: PASSWORD_LENGTH,
                message: `${PASSWORD_LENGTH}자 이상 작성해 주세요.`,
              },
            })}
            hasError={!!errors.password}
            type={passwordType}
            placeholder='비밀번호를 입력해주세요.'
            required
            autoComplete='new-password'
          />
          <Form.EyeButton isOpen={pwdVisible} onClick={togglePwd} />
        </div>
        {errors.password && <Form.Error>{errors.password.message}</Form.Error>}
      </Form.Label>
      <Form.Label className='mb-2 md:mb-4'>
        <Form.LabelHeader>비밀번호 확인</Form.LabelHeader>
        <div className='relative'>
          <Form.Input
            register={register('passwordConfirm', {
              required: {
                value: true,
                message: '비밀번호를 한번 더 입력해주세요.',
              },
              validate: value =>
                value === password || '비밀번호가 일치하지 않습니다.',
            })}
            hasError={!!errors.passwordConfirm}
            type={passwordConfirmType}
            placeholder='비밀번호를 한번 더 입력해 주세요'
            required
            autoComplete='new-password'
          />
          <Form.EyeButton
            isOpen={pwdConfirmVisible}
            onClick={togglePwdConfirm}
          />
        </div>
        {errors.passwordConfirm && (
          <Form.Error>{errors.passwordConfirm.message}</Form.Error>
        )}
      </Form.Label>
      <Button
        isDisabled={isDisabled}
        form='signupForm'
        type='submit'
        className='h-[50px] w-full'
      >
        가입하기
      </Button>
    </Form>
  )
}
