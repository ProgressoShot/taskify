'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import SentInvitationList from '@/app/dashboard/[id]/edit/components/SentInvitationList'
import { getDashboard, updateDashboard } from '@/app/utils/api'
import Button from '@/components/Button'
import Form from '@/components/Form'
import useDashboardStore from '@/store/useDashboardStore'
import { DashboardFormValue } from '@/types/types'

export default function DashboardIdEditPage() {
  const { id } = useParams()
  const dashboardId = Number(id)
  const { dashboard, setDashboard } = useDashboardStore()
  const { title, color, createdAt } = dashboard

  const dashBoardInfoForm = useForm<DashboardFormValue>({
    defaultValues: { title: title, color: color },
  })

  const COLORS = {
    green: '#7AC555',
    purple: '#760DDE',
    orange: '#FFA500',
    blue: '#76A5EA',
    pink: '#E876EA',
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getDashboard(dashboardId)
      setDashboard(data)
    }

    fetchData()
  }, [dashboardId, setDashboard])

  const handleSubmit = (body: DashboardFormValue) => {
    updateDashboard(dashboardId, body).then()
  }

  return (
    <>
      <Link href='#'>돌아가기</Link>
      <div className='rounded-lg bg-white'>
        <h1>대시보드 정보</h1>
        <Form onSubmit={handleSubmit} formId='dashboardInfoForm'>
          <Form.Label>
            <Form.LabelHeader>대시보드 이름</Form.LabelHeader>
            {title && (
              <Form.Input
                {...dashBoardInfoForm.register('title', {
                  required: {
                    value: true,
                    message: '대시보드 이름을 입력해주세요',
                  },
                  value: title,
                })}
                type='text'
                required={true}
                placeholder='대시보드 이름을 입력해주세요'
              />
            )}
          </Form.Label>
          <Form.Label>
            <Form.LabelHeader>대시보드 색상</Form.LabelHeader>
            <Form.Input
              {...dashBoardInfoForm.register('color', { value: COLORS.green })}
              type='radio'
              checked={color === COLORS.green}
            />
            <Form.Input
              {...dashBoardInfoForm.register('color', { value: COLORS.purple })}
              type='radio'
              checked={color === COLORS.purple}
            />
            <Form.Input
              {...dashBoardInfoForm.register('color', { value: COLORS.orange })}
              type='radio'
              checked={color === COLORS.orange}
            />
            <Form.Input
              {...dashBoardInfoForm.register('color', { value: COLORS.blue })}
              type='radio'
              checked={color === COLORS.blue}
            />
            <Form.Input
              {...dashBoardInfoForm.register('color', { value: COLORS.pink })}
              type='radio'
              checked={color === COLORS.pink}
            />
          </Form.Label>
          <Button type='submit'>변경</Button>
        </Form>
      </div>
      <div className='rounded-lg bg-white'>
        <h1>구성원</h1>
      </div>
      <div className='rounded-lg bg-white'>
        <h1>초대 내역</h1>
        <Button type='button'>초대하기</Button>
        <SentInvitationList dashboardId={dashboardId} />
        {/*초대 모달*/}
      </div>
      <Button color='tertiary' type='button'>
        대시보드 삭제하기
      </Button>
    </>
  )
}
