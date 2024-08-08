'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import SentInvitationList from '@/app/dashboard/[id]/edit/components/SentInvitationList'
import {getDashboardInfoById, updateDashboardInfo} from '@/app/utils/api'
import Button from '@/components/Button'
import Form from '@/components/Form'
import Modal from '@/components/Modal'
import { useState } from 'react'

export default function DashboardIdEditPage() {
  const { id } = useParams()
  const [dashboardInfo, setDashboardInfo] = useState({ title: '', color: '' })
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { title: '', color: '' },
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const colors = {
    green: '#7AC555',
    purple: '#760DDE',
    orange: '#FFA500',
    blue: '#76A5EA',
    pink: '#E876EA',
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getDashboardInfoById(id)
      setDashboardInfo(data)
      setValue('title', data.title)
      setValue('color', data.color)
    }
    fetchData()
  }, [id, setValue])

  const onSubmit = () => {
    updateDashboardInfo(id, dashboardInfo).then()
  }

  return (
    <>
      <Link href='#'>돌아가기</Link>
      <div className='rounded-lg bg-white'>
        <h1> 대시보드 정보</h1>
        <p>{createdAt}</p>
        <Form onSubmit={onSubmit} formId='dashboardInfoForm'>
          <Form.Label>
            <Form.LabelHeader>대시보드 이름</Form.LabelHeader>
            <Form.Input
              register={register('title', {
                required: {
                  value: true,
                  message: '대시보드 이름을 입력해주세요',
                },
                defaultValues: title,
              })}
              type='text'
              required
              placeholder='대시보드 이름을 입력해주세요'
            ></Form.Input>
          </Form.Label>
          <Form.Label>
            <Form.LabelHeader>대시보드 색상</Form.LabelHeader>
            <Form.Input
              register={register('green', {
                name: 'color',
                id: 'green',
                value: colors.green,
              })}
              type='radio'
              checked={color === colors.green}
            />
            <Form.Input
              register={register('purple', {
                name: 'color',
                id: 'purple',
                value: colors.purple,
              })}
              type='radio'
              checked={color === colors.purple}
            />
            <Form.Input
              register={register('orange', {
                name: 'color',
                id: 'orange',
                value: colors.orange,
              })}
              type='radio'
              checked={color === colors.orange}
            />
            <Form.Input
              register={register('blue', {
                name: 'color',
                id: 'blue',
                value: colors.blue,
              })}
              type='radio'
              checked={color === colors.blue}
            />
            <Form.Input
              register={register('pink', {
                name: 'color',
                id: 'pink',
                value: colors.pink,
              })}
              type='radio'
              checked={color === colors.pink}
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
        <SentInvitationList dashbordId={id} />
        <Modal isOpen={isModalOpen}>
          <Form>
            <Form.Label>
              <Form.LabelHeader>대시보드 초대하기</Form.LabelHeader>
              <Form.Input
                register={register('email', {
                  required: {
                    value: true,
                    message: '이메일을 입력해주세요',
                  },
                })}
                type='email'
                required
                placeholder='이메일을 입력해주세요'
              ></Form.Input>
            </Form.Label>
            <Button type='submit'>초대하기</Button>
        </Modal>
      </div>
      <Button color='transparent' type='button'>
        대시보드 삭제하기
      </Button>
    </>
  )
}