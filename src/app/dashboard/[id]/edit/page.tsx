'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import SentInvitationList from '@/app/dashboard/[id]/edit/components/SentInvitationList'
import Button from '@/components/Button'
import Form from '@/components/Form'
import { getDashboard, updateDashboard } from '@/lib/api'
import useDashboardStore from '@/store/useDashboardStore'
import { DashboardColor, DashboardFormValue } from '@/lib/types'

export default function DashboardIdEditPage() {
  const { id } = useParams()
  const dashboardId = Number(id)
  const { dashboard, setDashboard} = useDashboardStore()

  const { title, color } = dashboard

  const dashBoardInfoForm = useForm<DashboardFormValue>({
    values: { title: title, color: color },
  })

  const DASHBOARD_COLORS = {
    green: '#7AC555',
    purple: '#760DDE',
    orange: '#FFA500',
    blue: '#76A5EA',
    pink: '#E876EA',
  }

  function ColorRadioInput({ colorName }: { colorName: DashboardColor }) {
    return (
      <>
        <Form.Input
          register={dashBoardInfoForm.register('color')}
          type='radio'
          value={DASHBOARD_COLORS[colorName]}
        />
      </>
    )
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getDashboard(dashboardId)
      setDashboard(data)
    }

    fetchData().then()
  }, [dashboardId, setDashboard])

  const handleSubmit = (body: DashboardFormValue) => {
    updateDashboard(dashboardId, {
      title: body.title as string,
      color: body.color as string,
    }).then()
  }

  if (!dashboard) return <div>로딩중...</div>

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
                register={dashBoardInfoForm.register('title', {
                  required: {
                    value: true,
                    message: '대시보드 이름을 입력해주세요',
                  },
                })}
                type='text'
                required={true}
              />
            )}
          </Form.Label>
          <Form.Label>
            <Form.LabelHeader>대시보드 색상</Form.LabelHeader>
            <ColorRadioInput colorName={'green'} />
            <ColorRadioInput colorName={'purple'} />
            <ColorRadioInput colorName={'orange'} />
            <ColorRadioInput colorName={'blue'} />
            <ColorRadioInput colorName={'pink'} />
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
