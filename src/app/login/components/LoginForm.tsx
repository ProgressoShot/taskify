'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import Button from '@/components/Button'
import ConfirmModalContent from '@/components/ConfirmModalContent'
import Form from '@/components/Form'
import useToggle from '@/hooks/useToggle'
import api from '@/lib/axiosInstance'
import { listDashboards } from '@/lib/dashboardsApi'
import useDashboardStore from '@/store/useDashboardStore'
import useModalStore from '@/store/useModalStore'

export interface LoginFormValue {
  email: string
  password: string
}

const EMAIL_PATTERN = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const PASSWORD_LENGTH = 8

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<LoginFormValue>()

  const router = useRouter()
  const { openModal } = useModalStore()
  const { setDashboards } = useDashboardStore()

  const [pwdVisible, togglePwd] = useToggle(false)
  const passwordType = pwdVisible ? 'text' : 'password'

  const onSubmit = async (data: LoginFormValue) => {
    try {
      const response = await api.post('auth/login', data)
      const { accessToken, user } = response.data
      sessionStorage.setItem('accessToken', accessToken)
      sessionStorage.setItem('user', JSON.stringify(user))
      const dashboards = await listDashboards()
      setDashboards(dashboards)
      router.push('/mydashboard')
    } catch (error) {
      let loginErrorMessage = ''
      if (axios.isAxiosError(error)) {
        loginErrorMessage = error.response?.data.message
      } else {
        loginErrorMessage =
          '서버에 문제가 있는거 같아요. 잠시 후에 다시 시도해보시겠어요?'
      }
      openModal(<ConfirmModalContent message={loginErrorMessage} />)
    }
  }

  const isDisabled = !!(errors.email || errors.password || isLoading)

  return (
    <Form
      formId='loginForm'
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
      <Form.Label className='mb-4 md:mb-6'>
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
            autoComplete='current-password'
          ></Form.Input>
          <Form.EyeButton isOpen={pwdVisible} onClick={togglePwd} />
        </div>
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
