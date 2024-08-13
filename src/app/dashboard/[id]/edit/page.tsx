'use client'

import cn from 'classnames'
import { router } from 'next/client'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import AddBox from '/public/icons/add-box.svg'
import CaretLeft from '/public/icons/caret-left.svg'
import MemberList from '@/app/dashboard/[id]/edit/components/MemberList'
import SentInvitationList from '@/app/dashboard/[id]/edit/components/SentInvitationList'
import Button from '@/components/Button'
import ConfirmModalContent from '@/components/ConfirmModalContent'
import moduleCSS from '@/components/CreateDashboardModal.module.css'
import { InviteModal } from '@/components/DashboardFeature'
import DeleteAlertModal from '@/components/DeleteAlertModal'
import Form from '@/components/Form'
import Pagination from '@/components/Pagination'
import useGoBack from '@/hooks/useGoBack'
import usePagination from '@/hooks/usePagination'
import { getDashboard, updateDashboard } from '@/lib/api'
import { deleteDashboard } from '@/lib/dashboardsApi'
import { DASHBOARD_MEMBERS } from '@/lib/mock'
import useDashboardStore from '@/store/useDashboardStore'
import useModalStore from '@/store/useModalStore'
import {
  DASHBOARD_COLORS,
  DashboardFormValue,
  DashboardMember,
} from '@/types/types'

export default function DashboardIdEditPage() {
  const ITEM_PER_PAGE = 4
  const { id } = useParams()
  const dashboardId = Number(id)
  const { openModal } = useModalStore()
  const { dashboard, setDashboard, dashboards, setDashboards } =
    useDashboardStore()
  const handleGoBack = useGoBack()
  const { title, color } = dashboard
  const dashBoardForm = useForm<DashboardFormValue>({
    values: { title: title, color: color },
  })
  const { page, totalPages, prevPage, nextPage, noMorePrev, noMoreNext } =
    usePagination({
      totalItems: DASHBOARD_MEMBERS?.length,
      itemsPerPage: ITEM_PER_PAGE,
    })

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
          />
        )
      }
    }
  }

  if (!dashboard) return <div>로딩중...</div>

  return (
    <div className='h-full w-full px-3 py-4 pb-5 md:p-5'>
      <button
        className='mb-[10px] flex items-center gap-2 text-sm font-medium text-custom-black-200 md:mb-[20px] md:text-base xl:mb-[34px]'
        type='button'
        onClick={handleGoBack}
      >
        <CaretLeft className='h-[18px] w-[18px] md:h-5 md:w-5' />
        돌아가기
      </button>
      <section className='mb-4 max-w-[620px] rounded-lg bg-white px-4 py-5 md:mb-6 md:rounded-2xl md:px-7 md:py-8'>
        <h2 className='md:text-2x mb-6 text-xl font-bold text-custom-black-200'>
          대시보드 정보
        </h2>
        <Form
          className='max-w-full'
          onSubmit={handleSubmit}
          formId='dashboardForm'
        >
          <Form.Label className={'flex gap-5 justify-between'}>
            <div className={'w-fit grow-0'}>
              <Form.LabelHeader className={'text-lg'}>
                대시보드 이름
              </Form.LabelHeader>
            </div>

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

          <Form.Label className='mb-5'>
            <Form.LabelHeader className={'text-lg'}>
              대시보드 색상
            </Form.LabelHeader>
            <div className='flex items-center justify-start gap-2'>
              {Object.entries(DASHBOARD_COLORS).map(
                ([colorName, colorCode]) => (
                  <Form.Input
                    key={`dashboard-color-${colorName}`}
                    register={dashBoardForm.register('color')}
                    type='radio'
                    value={colorCode}
                    className={cn(
                      moduleCSS['radio'],
                      moduleCSS[`bg-custom-${colorName}`]
                    )}
                  />
                )
              )}
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
          {/*<Pagination>*/}
          {/*  <Pagination.Prev  />*/}
          {/*  <Pagination.Next />*/}
          {/*</Pagination>*/}
        </h2>
        <Pagination>
          <Pagination.Pages>
            {totalPages} 페이지 중 {page}
          </Pagination.Pages>
          <Pagination.Prev
            prevPage={() => {}}
            disabled={noMorePrev}
          ></Pagination.Prev>
          <Pagination.Next
            nextPage={() => {}}
            disabled={noMoreNext}
          ></Pagination.Next>
        </Pagination>
        <MemberList dashboardId={dashboardId} />
      </section>

      <section className='relative mb-4 max-w-[620px] rounded-lg bg-white px-4 py-5 md:mb-6 md:rounded-2xl md:px-7 md:py-8'>
        <h2 className='md:text-2x mb-6 flex justify-between text-xl font-bold text-custom-black-200'>
          초대 내역
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
        {/*<Pagination>*/}
        {/*  <Pagination.Prev />*/}
        {/*  <Pagination.Next />*/}
        {/*</Pagination>*/}
      </section>

      <Button
        className='mb-6 h-[52px] w-full max-w-[620px] gap-2.5 py-5 text-lg md:h-[62px]'
        color='tertiary'
        type='button'
        onClick={() => {
          openModal(
            <DeleteAlertModal
              message={`삭제한 대시보드는 복구할 수 없습니다. ${title} 대시보드를 정말로 삭제하시겠습니까?`}
              onDelete={handleDeleteDashboard}
            />
          )
        }}
      >
        대시보드 삭제하기
      </Button>
    </div>
  )
}
