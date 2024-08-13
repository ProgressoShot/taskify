'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import IconAddBox from '/public/icons/add-box.svg'
import IconClose from '/public/icons/close.svg'
import IconSettings from '/public/icons/settings.svg'
import api from '@/lib/axiosInstance'
import { deleteDashboard } from '@/lib/dashboardsApi'
import useDashboardStore from '@/store/useDashboardStore'
import useModalStore from '@/store/useModalStore'
import { Dashboard } from '@/types/types'

import Button from './Button'
import ConfirmModalContent from './ConfirmModalContent'
import Form from './Form'

const BUTTON_CLASSNAME =
  'flex h-[30px] md:h-10 items-center justify-between gap-2 rounded-lg border border-custom-gray-300 px-2 md:px-4 text-sm md:text-base text-custom-gray-500'

export default function DashboardFeature() {
  const router = useRouter()
  const { id } = useParams()
  const dashboardId = Number(id)
  const { dashboards, setDashboards } = useDashboardStore()
  const { openModal } = useModalStore()
  const currentDashboard = dashboards
    ?.filter((dashboard: Dashboard) => dashboard.id === dashboardId)
    .pop()

  const createByMe = currentDashboard?.createdByMe



  if (!createByMe) return null

  return (
    <div className='flex gap-1.5 md:gap-3 lg:gap-4 lg:border-r lg:border-custom-gray-300 lg:pr-9'>
      <Link
        href={`/dashboard/${dashboardId}/edit`}
        className={BUTTON_CLASSNAME}
      >
        <IconSettings className='hidden md:block' />
        <p className='text-nowrap'>관리</p>
      </Link>
      <button
        onClick={() => openModal(<InviteModal dashboardId={dashboardId} />)}
        className={BUTTON_CLASSNAME}
      >
        <IconAddBox className='hidden md:block' />
        <p className='text-nowrap'>초대하기</p>
      </button>
    </div>
  )
}

interface InviteFormValue {
  email: string
}

const EMAIL_PATTERN = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

/**
 * @todo
 * 고도화: 이메일 리스트로 초대 요청하기
 */
export function InviteModal({ dashboardId }: { dashboardId: number }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<InviteFormValue>()
  const { openModal, closeModal } = useModalStore()

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

  const onSubmit = async (data: InviteFormValue) => {
    const inviteeCheck = await api
      .get(`dashboards/${dashboardId}/invitations?page=1&size=10`)
      .then(res =>
        res.data.invitations.some(
          (item: any) => item.invitee.email === data.email
        )
      )

    if (inviteeCheck)
      return (
        closeModal(),
        openModal(<ConfirmModalContent message={'이미 초대된 사용자입니다.'} />)
      )

    await api
      .post(`dashboards/${dashboardId}/invitations`, data)
      .then(function (response) {
        closeModal()
        openModal(<ConfirmModalContent message={'초대전송 완료!'} />)
      })
      .catch(function (error) {
        closeModal()
        openModal(<ConfirmModalContent message={error.response.data.message} />)
      })
  }

  return (
    <div className='modal-container max-w-[568px] px-4 py-6 text-custom-black-200'>
      <div className='flex items-center justify-between'>
        <h4 className='text-xl font-bold'>초대하기</h4>
        <button onClick={closeModal}>
          <IconClose className='text-[#6b6b6b]' />
        </button>
      </div>
      <Form
        formId='signupForm'
        className='mx-auto'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Label className='mb-6 mt-4'>
          <Form.LabelHeader>이메일</Form.LabelHeader>
          <Form.Input
            register={register('email', {
              required: { value: true, message: '이메일을 입력해주세요' },
              pattern: {
                value: EMAIL_PATTERN,
                message: '이메일 형식으로 작성해주세요.',
              },
              onChange: event => {
                setButtonDisabled(Boolean(event.target.value))
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

        <div className='flex h-14 items-center gap-2'>
          <Button
            color='secondary'
            className='h-full flex-auto'
            onClick={closeModal}
          >
            <span className='font-normal text-custom-gray-500'>취소</span>
          </Button>
          <Button
            className='h-full flex-auto'
            type='submit'
            isDisabled={!buttonDisabled}
          >
            전송
          </Button>
        </div>
      </Form>
    </div>
  )
}
