import 'react-datepicker/dist/react-datepicker.css'

import cn from 'classnames'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Form from '@/components/Form'
import { createDashboard } from '@/lib/dashboardsApi'
import useDashboardStore from '@/store/useDashboardStore'
import useModalStore from '@/store/useModalStore'
import { Dashboard, DashboardColorHex } from '@/types/types'

import Button from './Button'
import ConfirmModalContent from './ConfirmModalContent'
import moduleCSS from './CreateDashboardModal.module.css'

export const COLOR_LIST: Array<DashboardColorHex> = [
  '#7AC555',
  '#760DDE',
  '#FFA500',
  '#76A5EA',
  '#E876EA',
]

interface newDashboardForm {
  title: string
  color: DashboardColorHex
}

export default function CreateDashboardModal() {
  const { dashboards, setDashboards } = useDashboardStore()
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isLoading },
  } = useForm<newDashboardForm>({
    defaultValues: {
      title: '',
      color: COLOR_LIST[0],
    },
  })
  const { openModal, closeModal } = useModalStore()
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

  const onSubmit = async (params: any) => {
    console.log(params)
    try {
      const data: Dashboard = await createDashboard(params.title, params.color)
      if (dashboards) setDashboards([data, ...dashboards])
      closeModal()
    } catch (error: any) {
      closeModal()
      openModal(
        <ConfirmModalContent
          message={error?.message || '오류가 발생했습니다. 다시 시도해주세요.'}
        />
      )
    }
  }

  return (
    <div className='w-[584px] rounded-2xl bg-white p-8'>
      <Form formId='AddTaskForm' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-8 h-8 text-2xl font-bold text-custom-black-200'>
          새로운 대시보드
        </div>
        <Form.Label className='mb-5'>
          <Form.LabelHeader className='labelHeader flex'>
            대시보드 이름
          </Form.LabelHeader>
          <Form.Input
            register={register('title', {
              onChange: event => {
                setButtonDisabled(Boolean(event.target.value))
              },
            })}
            type='text'
            placeholder='대시보드 이름을 입력해 주세요'
          />
        </Form.Label>

        <Form.Label className='mb-5'>
          <Form.LabelHeader className='labelHeader'>
            대시보드 색상
          </Form.LabelHeader>
          <div className='flex items-center justify-start gap-2'>
            {COLOR_LIST.map(item => (
              <Form.Input
                key={`color-radio-${item}`}
                register={register('color')}
                type='radio'
                value={item}
                className={cn(moduleCSS['radio'], moduleCSS[`bg-[${item}]`])}
              />
            ))}
          </div>
        </Form.Label>
        <div className='flex gap-2'>
          <Button
            className='h-[54px] w-1/2 flex-auto'
            color='secondary'
            onClick={closeModal}
          >
            취소
          </Button>
          <Button
            className='h-[54px] w-1/2 flex-auto'
            type='submit'
            color='primary'
            isDisabled={!buttonDisabled}
          >
            생성
          </Button>
        </div>
      </Form>
    </div>
  )
}
