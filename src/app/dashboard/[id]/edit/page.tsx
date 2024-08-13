'use client'

import {router} from "next/client";
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import AddBox from '/public/icons/add-box.svg'
import CaretLeft from '/public/icons/caret-left.svg'
import SentInvitationList from '@/app/dashboard/[id]/edit/components/SentInvitationList'
import { getDashboard, updateDashboard } from '@/app/utils/api'
import { deleteDashboard } from '@/app/utils/dashboardsApi'
import Button from '@/components/Button'
import ConfirmModalContent from "@/components/ConfirmModalContent";
import { InviteModal } from '@/components/DashboardFeature'
import Form from '@/components/Form'
import Pagination from '@/components/Pagination'
import useGoBack from '@/hooks/useGoBack'
import useDashboardStore from '@/store/useDashboardStore'
import useModalStore from '@/store/useModalStore'
import { DashboardColor, DashboardFormValue } from '@/types/types'
import DeleteAlertModal from "@/components/DeleteAlertModal";

export default function DashboardIdEditPage() {
  const { id } = useParams()
  const dashboardId = Number(id)
  const { openModal } = useModalStore()
  const { dashboard, setDashboard, dashboards, setDashboards } = useDashboardStore()
  const handleGoBack = useGoBack()
  const { title, color } = dashboard
  const dashBoardForm = useForm<DashboardFormValue>({
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
          className={'hidden'}
          register={dashBoardForm.register('color')}
          type='radio'
          value={DASHBOARD_COLORS[colorName]}
        />
        <div className={'relative h-[30px] w-[30px]'}>
          <div
            className={`h-[30px] w-[30px] bg-custom-${colorName} rounded-full`}
            onClick={() => {
              dashBoardForm.setValue('color', DASHBOARD_COLORS[colorName])
            }}
          />
          <Image
            src={'/icons/check-white.svg'}
            width={24}
            height={24}
            alt={`${colorName} 색상 선택됨`}
            className={`absolute left-[3px] top-[3px] h-6 w-6 hover:cursor-pointer`}
            hidden={color !== DASHBOARD_COLORS[colorName]}
          />
        </div>
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

  const handleDeleteDashboard = async () => {
    if (dashboardId) {
      try {
        await deleteDashboard(dashboardId).then(() => {
          if (dashboards)
            setDashboards(
              dashboards?.filter(item => item.id !== Number(dashboardId)) ||
                null
            )
        })
        await router.push('/mydashboard')
      } catch (error) {
        openModal(
          <ConfirmModalContent
            message={`"${title}" 대시보드를 삭제하는 데 문제가 발생했습니다.`}
          />)
      }
    }
  }

  if (!dashboard) return <div>로딩중...</div>

  return (
    <div className={'flex-col'}>
      <div className={'flex gap-1'}>
        <Image
          src={'/icons/back.svg'}
          alt={'뒤로가기 아이콘'}
          width={20}
          height={20}
        />
        <Link href={`/dashboard/${id}`}>돌아가기</Link>
      </div>

      <div className={'container flex-col gap-1'}>
        <div className='w-[620px] rounded-lg bg-white'>
          <h1 className={'text-xl font-bold'}>대시보드 정보</h1>
          <Form
            className={'justify-end'}
            onSubmit={handleSubmit}
            formId='dashboardInfoForm'
          >
            <Form.Label className={'flex'}>
              <div className={'w-fit grow-0'}>
                <Form.LabelHeader className={'text-lg'}>
                  대시보드 이름
                </Form.LabelHeader>
              </div>

    {/*<div className='w-full px-3 py-4 md:p-5'>*/}
    {/*  <button*/}
    {/*    className='mb-[10px] flex items-center gap-2 text-sm font-medium text-custom-black-200 md:mb-[20px] md:text-base xl:mb-[34px]'*/}
    {/*    type='button'*/}
    {/*    onClick={handleGoBack}*/}
    {/*  >*/}
    {/*    <CaretLeft className='h-[18px] w-[18px] md:h-5 md:w-5' />*/}
    {/*    돌아가기*/}
    {/*  </button>*/}
    {/*  <section className='mb-4 max-w-[620px] rounded-lg bg-white px-4 py-5 md:mb-6 md:rounded-2xl md:px-7 md:py-8'>*/}
    {/*    <h2 className='md:text-2x mb-6 text-xl font-bold text-custom-black-200'>*/}
    {/*      대시보드 정보*/}
    {/*    </h2>*/}
    {/*    <Form*/}
    {/*      className='max-w-full'*/}
    {/*      onSubmit={handleSubmit}*/}
    {/*      formId='dashboardInfoForm'*/}
    {/*    >*/}
    {/*      <Form.Label className={'flex'}>*/}
    {/*        <div className={'w-fit grow-0'}>*/}
    {/*          <Form.LabelHeader className={'text-lg'}>*/}
    {/*            대시보드 이름*/}
    {/*          </Form.LabelHeader>*/}
    {/*        </div>*/}

            {title && (
              <Form.Input
                register={dashBoardForm.register('title', {
                  required: {
                    value: true,
                    message: '대시보드 이름을 입력해주세요',
                  },
                })}
                type='text'
                required={true}
                className={'grow'}
              />
            )}
          </Form.Label>

          <Form.Label className={'flex'}>
            <Form.LabelHeader className={'text-lg'}>
              대시보드 색상
            </Form.LabelHeader>
            <div className={'flex-row'}>
              <ColorRadioInput colorName={'green'} />
              <ColorRadioInput colorName={'purple'} />
              <ColorRadioInput colorName={'orange'} />
              <ColorRadioInput colorName={'blue'} />
              <ColorRadioInput colorName={'pink'} />
            </div>
          </Form.Label>

          <Button
            className='h-[54px] w-full text-sm font-semibold md:text-base'
            type='submit'
          >
            변경
          </Button>
        </Form>
      </section>
      <section className='mb-4 max-w-[620px] rounded-lg bg-white px-4 py-5 md:mb-6 md:rounded-2xl md:px-7 md:py-8'>
        <h2 className='md:text-2x mb-6 flex justify-between text-xl font-bold text-custom-black-200'>
          구성원
          <Pagination>
            <Pagination.Prev />
            <Pagination.Next />
          </Pagination>
        </h2>
      </section>
      <section className='relative mb-4 max-w-[620px] rounded-lg bg-white px-4 py-5 md:mb-6 md:rounded-2xl md:px-7 md:py-8'>
        <h2 className='md:text-2x mb-6 flex justify-between text-xl font-bold text-custom-black-200'>
          초대 내역
          <Pagination>
            <Pagination.Prev />
            <Pagination.Next />
          </Pagination>
        </h2>
        <Button
          className='absolute right-4 h-8 w-[105px] items-center gap-2 md:right-7 md:w-[105px]'
          onClick={() => openModal(<InviteModal dashboardId={dashboardId} />)}
          type='button'
        >
          <AddBox />
          초대하기
        </Button>

        <SentInvitationList dashboardId={dashboardId} />
      </section>

      <Button
        className='h-[52px] w-full max-w-[620px] gap-2.5 py-5 text-lg md:h-[62px]'
        color='tertiary'
        type='button'
        onClick={() => {
          openModal(
            <DeleteAlertModal
              message='한 번 삭제한 대시보드는 복구할 수 없습니다. 정말로 삭제하시겠습니까?'
              onDelete={handleDeleteDashboard}
            />
          )
        }}
      >
        대시보드 삭제하기
      </Button>

      </div>
    </div>
  )
}
