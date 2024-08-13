'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import backIcon from '/public/icons/back.svg'
import SentInvitationList from '@/app/dashboard/[id]/edit/components/SentInvitationList'
import { getDashboard, updateDashboard } from '@/app/utils/api'
import Button from '@/components/Button'
import { InviteModal } from '@/components/DashboardFeature'
import Form from '@/components/Form'
import Pagination from '@/components/Pagination'
import useDashboardStore from '@/store/useDashboardStore'
import useModalStore from '@/store/useModalStore'
import { DashboardColor, DashboardFormValue } from '@/types/types'

export default function DashboardIdEditPage() {
  const { id } = useParams()
  const dashboardId = Number(id)
  const { openModal } = useModalStore()
  const { dashboard, setDashboard } = useDashboardStore()
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
        <div
          className={`h-[30px] w-[30px] bg-custom-${colorName} rounded-full`}
        >
          <Form.Input
            className={'hidden'}
            register={dashBoardForm.register('color')}
            type='radio'
            value={DASHBOARD_COLORS[colorName]}
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

  if (!dashboard) return <div>로딩중...</div>

  return (
    <div className={'flex-col'}>
      <div className={'flex-row gap-1'}>
        <Image src={backIcon} alt={'뒤로가기 아이콘'} />
        <Link href='#'>돌아가기</Link>
      </div>

      <div className={'container flex-col gap-1'}>
        <div className='w-[620px] rounded-lg bg-white'>
          <h1 className={'text-xl font-bold'}>대시보드 정보</h1>

          <Form
            className={'justify-end'}
            onSubmit={handleSubmit}
            formId='dashboardInfoForm'
          >
            <Form.Label className={'flex-low'}>
              <Form.LabelHeader className={'text-lg'}>
                대시보드 이름
              </Form.LabelHeader>
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
                />
              )}
            </Form.Label>

            <Form.Label className={'flex-row'}>
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

            <Button type='submit'>변경</Button>
          </Form>
        </div>

        <div className='w-[620px] rounded-lg bg-white'>
          <h1 className={'text-xl font-bold'}>구성원</h1>
        </div>

        <div className='w-[620px] rounded-lg bg-white'>
          <h1 className={'text-xl font-bold'}>초대 내역</h1>
          <Button
            onClick={() => openModal(<InviteModal dashboardId={dashboardId} />)}
            type='button'
          >
            초대하기
          </Button>
          <Pagination>
            <SentInvitationList dashboardId={dashboardId} />
          </Pagination>
        </div>

        <Button
          className={'w-full gap-2.5 py-5 text-lg'}
          color='tertiary'
          type='button'
        >
          대시보드 삭제하기
        </Button>
      </div>
    </div>
  )

  // return (
  //   <div className="w-[1920px] h-[1453px] relative bg-neutral-50">
  //     <div className="w-[1920px] h-[70px] left-0 top-0 absolute">
  //       <div className="w-[1920px] h-[70px] left-0 top-0 absolute bg-white"/>
  //       <div className="w-[116px] h-10 left-[1370px] top-[15px] absolute bg-white rounded-lg border border-[#d9d9d9]"/>
  //       <div
  //         className="left-[1414px] top-[26px] absolute text-[#787486] text-base font-medium font-['Pretendard']">초대하기
  //       </div>
  //       <div className="w-5 h-5 left-[1386px] top-[25px] absolute"/>
  //       <div
  //         className="w-[38px] h-[38px] left-[1526px] top-[16px] absolute bg-[#ffc85a] rounded-full border-2 border-white"/>
  //       <div
  //         className="left-[1539px] top-[25px] absolute text-center text-white text-base font-semibold font-['Montserrat']">Y
  //       </div>
  //       <div
  //         className="w-[38px] h-[38px] left-[1556px] top-[16px] absolute bg-[#fdd446] rounded-full border-2 border-white"/>
  //       <div
  //         className="left-[1569px] top-[25px] absolute text-center text-white text-base font-semibold font-['Montserrat']">C
  //       </div>
  //       <div
  //         className="w-[38px] h-[38px] left-[1586px] top-[16px] absolute bg-[#9dd7ed] rounded-full border-2 border-white"/>
  //       <div
  //         className="left-[1599px] top-[25px] absolute text-center text-white text-base font-semibold font-['Montserrat']">K
  //       </div>
  //       <div
  //         className="w-[38px] h-[38px] left-[1616px] top-[16px] absolute bg-[#c4b1a2] rounded-full border-2 border-white"/>
  //       <div
  //         className="left-[1631px] top-[25px] absolute text-center text-white text-base font-semibold font-['Montserrat']">J
  //       </div>
  //       <div
  //         className="w-[38px] h-[38px] left-[1646px] top-[16px] absolute bg-[#f3d7da] rounded-full border-2 border-white"/>
  //       <div
  //         className="left-[1655px] top-[26px] absolute text-center text-[#d25b68] text-base font-medium font-['Pretendard']">+2
  //       </div>
  //       <div className="w-[38px] h-[38px] left-[1748px] top-[16px] absolute">
  //         <div className="w-[38px] h-[38px] left-0 top-0 absolute bg-[#a3c4a2] rounded-full border-2 border-white"/>
  //         <div
  //           className="left-[13px] top-[9px] absolute text-center text-white text-base font-semibold font-['Montserrat']">B
  //         </div>
  //       </div>
  //       <div
  //         className="left-[1798px] top-[26px] absolute text-[#333236] text-base font-medium font-['Pretendard']">배유철
  //       </div>
  //       <div className="left-[340px] top-[23px] absolute text-[#333236] text-xl font-bold font-['Pretendard']">비브리지
  //       </div>
  //       <div className="w-[88px] h-10 left-[1266px] top-[15px] absolute bg-white rounded-lg border border-[#d9d9d9]"/>
  //       <div className="w-5 h-5 left-[1282px] top-[25px] absolute"/>
  //       <div className="w-[20.10px] h-4 left-[418px] top-[27px] absolute"/>
  //     </div>
  //     <div className="w-5 h-5 left-[340px] top-[110px] absolute origin-top-left -rotate-180"/>
  //     <Link href={'#'} className="left-[346px] top-[90px] absolute text-[#333236] text-base font-medium font-['Pretendard']">돌아가기
  //     </Link>
  //     <div className="w-[620px] h-64 left-[320px] top-[134px] absolute bg-white rounded-lg"/>
  //     <div className="left-[722px] top-[163px] absolute justify-center items-center gap-2.5 inline-flex">
  //       <div className="w-[30px] h-[30px] relative">
  //         <div className="w-[30px] h-[30px] left-0 top-0 absolute bg-[#7ac555] rounded-full"/>
  //         <div className="w-6 h-6 left-[3px] top-[3px] absolute"/>
  //       </div>
  //       <div className="w-[30px] h-[30px] bg-[#750cde] rounded-full"/>
  //       <div className="w-[30px] h-[30px] bg-[#ffa500] rounded-full"/>
  //       <div className="w-[30px] h-[30px] bg-[#76a5ea] rounded-full"/>
  //       <div className="w-[30px] h-[30px] bg-[#e876ea] rounded-full"/>
  //     </div>
  //     <div className="w-[564px] h-12 left-[348px] top-[258px] absolute bg-white rounded-md border border-[#d9d9d9]"/>
  //     <div
  //       className="left-[364px] top-[273px] absolute text-[#333236] text-base font-normal font-['Pretendard']">뉴프로젝트
  //     </div>
  //     <div className="left-[348px] top-[227px] absolute text-[#333236] text-lg font-medium font-['Pretendard']">대시보드
  //       이름
  //     </div>
  //     <div className="left-[348px] top-[166px] absolute text-[#333236] text-xl font-bold font-['Pretendard']">비브리지</div>
  //     <div
  //       className="w-80 h-[62px] px-[95px] py-5 left-[320px] top-[1335px] absolute bg-neutral-50 rounded-lg border border-[#d9d9d9] justify-center items-center gap-2.5 inline-flex">
  //       <div className="text-center text-[#333236] text-lg font-medium font-['Pretendard']">대시보드 삭제하기</div>
  //     </div>
  //     <div className="w-[620px] h-[404px] left-[320px] top-[402px] absolute">
  //       <div className="w-[620px] h-[404px] left-0 top-0 absolute bg-white rounded-lg"/>
  //       <div className="left-[28px] top-[93px] absolute text-[#9fa6b2] text-base font-normal font-['Pretendard']">이름
  //       </div>
  //       <div className="w-[620px] h-[38px] px-7 left-0 top-[136px] absolute justify-between items-center inline-flex">
  //         <div className="justify-start items-center gap-3 flex">
  //           <div className="w-[38px] h-[38px] bg-[#c4b1a2] rounded-full border-2 border-white"/>
  //           <div className="text-[#333236] text-base font-normal font-['Pretendard']">정만철</div>
  //           <div
  //             className="left-[15px] top-[9px] absolute text-center text-white text-base font-semibold font-['Montserrat']">J
  //           </div>
  //         </div>
  //         <div
  //           className="w-[84px] h-8 px-[29px] py-[7px] bg-white rounded border border-[#d9d9d9] justify-center items-center gap-2.5 flex">
  //           <div className="text-center text-[#5533da] text-sm font-medium font-['Pretendard']">삭제</div>
  //         </div>
  //       </div>
  //       <div className="w-[620px] h-[38px] px-7 left-0 top-[276px] absolute justify-between items-center inline-flex">
  //         <div className="justify-start items-center gap-3 flex">
  //           <div className="w-[38px] h-[38px] bg-[#fdd446] rounded-full border-2 border-white"/>
  //           <div className="text-[#333236] text-base font-normal font-['Pretendard']">최주협</div>
  //           <div
  //             className="left-[13px] top-[9px] absolute text-center text-white text-base font-semibold font-['Montserrat']">C
  //           </div>
  //         </div>
  //         <div
  //           className="w-[84px] h-8 px-[29px] py-[7px] bg-white rounded border border-[#d9d9d9] justify-center items-center gap-2.5 flex">
  //           <div className="text-center text-[#5533da] text-sm font-medium font-['Pretendard']">삭제</div>
  //         </div>
  //       </div>
  //       <div className="w-[620px] h-[38px] px-7 left-0 top-[206px] absolute justify-between items-center inline-flex">
  //         <div className="justify-start items-center gap-3 flex">
  //           <div className="w-[38px] h-[38px] bg-[#9dd7ed] rounded-full border-2 border-white"/>
  //           <div className="text-[#333236] text-base font-normal font-['Pretendard']">김태순</div>
  //           <div
  //             className="left-[13px] top-[9px] absolute text-center text-white text-base font-semibold font-['Montserrat']">K
  //           </div>
  //         </div>
  //         <div
  //           className="w-[84px] h-8 px-[29px] py-[7px] bg-white rounded border border-[#d9d9d9] justify-center items-center gap-2.5 flex">
  //           <div className="text-center text-[#5533da] text-sm font-medium font-['Pretendard']">삭제</div>
  //         </div>
  //       </div>
  //       <div className="w-[620px] h-[38px] px-7 left-0 top-[346px] absolute justify-between items-center inline-flex">
  //         <div className="justify-start items-center gap-3 flex">
  //           <div className="w-[38px] h-[38px] bg-[#ffc85a] rounded-full border-2 border-white"/>
  //           <div className="text-[#333236] text-base font-normal font-['Pretendard']">윤지현</div>
  //           <div
  //             className="left-[14px] top-[9px] absolute text-center text-white text-base font-semibold font-['Montserrat']">Y
  //           </div>
  //         </div>
  //         <div
  //           className="w-[84px] h-8 px-[29px] py-[7px] bg-white rounded border border-[#d9d9d9] justify-center items-center gap-2.5 flex">
  //           <div className="text-center text-[#5533da] text-sm font-medium font-['Pretendard']">삭제</div>
  //         </div>
  //       </div>
  //       <div className="w-[620px] h-10 px-7 left-0 top-[26px] absolute justify-between items-center inline-flex">
  //         <div className="text-[#333236] text-2xl font-bold font-['Pretendard']">구성원</div>
  //         <div className="justify-start items-center gap-4 flex">
  //           <div className="text-[#333236] text-sm font-normal font-['Pretendard']">1 페이지 중 1</div>
  //           <div className="justify-center items-center flex">
  //             <div className="justify-start items-start gap-2.5 flex">
  //               <div className="w-10 h-10 bg-white rounded-tl rounded-bl border border-[#d9d9d9]"/>
  //               <div className="w-4 h-4 left-[28px] top-[28px] absolute origin-top-left -rotate-180"/>
  //             </div>
  //             <div className="justify-start items-start gap-2.5 flex">
  //               <div className="w-10 h-10 bg-white rounded-tr rounded-br border border-[#d9d9d9]"/>
  //               <div className="w-4 h-4 left-[12px] top-[12px] absolute"/>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="w-[620px] h-[477px] left-[320px] top-[818px] absolute">
  //       <div className="w-[620px] h-[477px] left-0 top-0 absolute">
  //         <div className="w-[620px] h-[477px] left-0 top-0 absolute bg-white rounded-lg"/>
  //         <div
  //           className="left-[28px] top-[96px] absolute text-[#9fa6b2] text-base font-normal font-['Pretendard']">이메일
  //         </div>
  //         <div className="w-[620px] h-8 px-7 left-0 top-[32px] absolute justify-between items-center inline-flex">
  //           <div className="text-[#333236] text-2xl font-bold font-['Pretendard']">초대 내역</div>
  //           <div className="w-[105px] h-8 relative">
  //             <div className="w-[105px] h-8 left-0 top-0 absolute bg-[#5533da] rounded"/>
  //             <div className="left-[40px] top-[8px] absolute text-white text-sm font-medium font-['Pretendard']">초대하기
  //             </div>
  //             <div className="w-4 h-4 left-[16px] top-[8px] absolute"/>
  //           </div>
  //         </div>
  //         <div className="w-[620px] h-[38px] px-7 left-0 top-[139px] absolute justify-between items-center inline-flex">
  //           <div className="justify-start items-center gap-3 flex">
  //             <div className="text-[#333236] text-base font-normal font-['Pretendard']">codeitA@codeit.com</div>
  //             <img className="w-[10.91px] h-[12.49px] left-[13px] top-[13px] absolute"
  //                  src="https://via.placeholder.com/11x12"/>
  //           </div>
  //           <div
  //             className="w-[84px] h-8 px-[29px] py-[7px] bg-white rounded border border-[#d9d9d9] justify-center items-center gap-2.5 flex">
  //             <div className="text-center text-[#5533da] text-sm font-medium font-['Pretendard']">취소</div>
  //           </div>
  //         </div>
  //         <div className="w-[620px] h-[38px] px-7 left-0 top-[209px] absolute justify-between items-center inline-flex">
  //           <div className="justify-start items-center gap-3 flex">
  //             <div className="text-[#333236] text-base font-normal font-['Pretendard']">codeitB@codeit.com</div>
  //             <img className="w-[10.91px] h-[12.49px] left-[13px] top-[13px] absolute"
  //                  src="https://via.placeholder.com/11x12"/>
  //           </div>
  //           <div
  //             className="w-[84px] h-8 px-[29px] py-[7px] bg-white rounded border border-[#d9d9d9] justify-center items-center gap-2.5 flex">
  //             <div className="text-center text-[#5533da] text-sm font-medium font-['Pretendard']">취소</div>
  //           </div>
  //         </div>
  //         <div className="w-[620px] h-[38px] px-7 left-0 top-[349px] absolute justify-between items-center inline-flex">
  //           <div className="justify-start items-center gap-3 flex">
  //             <div className="text-[#333236] text-base font-normal font-['Pretendard']">codeitD@codeit.com</div>
  //           </div>
  //           <div
  //             className="w-[84px] h-8 px-[29px] py-[7px] bg-white rounded border border-[#d9d9d9] justify-center items-center gap-2.5 flex">
  //             <div className="text-center text-[#5533da] text-sm font-medium font-['Pretendard']">취소</div>
  //           </div>
  //         </div>
  //         <div className="w-[620px] h-[38px] px-7 left-0 top-[279px] absolute justify-between items-center inline-flex">
  //           <div className="justify-start items-center gap-3 flex">
  //             <div className="text-[#333236] text-base font-normal font-['Pretendard']">codeitC@codeit.com</div>
  //             <img className="w-[10.91px] h-[12.49px] left-[13px] top-[13px] absolute"
  //                  src="https://via.placeholder.com/11x12"/>
  //           </div>
  //           <div
  //             className="w-[84px] h-8 px-[29px] py-[7px] bg-white rounded border border-[#d9d9d9] justify-center items-center gap-2.5 flex">
  //             <div className="text-center text-[#5533da] text-sm font-medium font-['Pretendard']">취소</div>
  //           </div>
  //         </div>
  //         <div className="w-[620px] h-[38px] px-7 left-0 top-[419px] absolute justify-between items-center inline-flex">
  //           <div className="justify-start items-center gap-3 flex">
  //             <div className="text-[#333236] text-base font-normal font-['Pretendard']">codeitE@codeit.com</div>
  //             <img className="w-[10.91px] h-[12.49px] left-[13px] top-[13px] absolute"
  //                  src="https://via.placeholder.com/11x12"/>
  //           </div>
  //           <div
  //             className="w-[84px] h-8 px-[29px] py-[7px] bg-white rounded border border-[#d9d9d9] justify-center items-center gap-2.5 flex">
  //             <div className="text-center text-[#5533da] text-sm font-medium font-['Pretendard']">취소</div>
  //           </div>
  //         </div>
  //         <div className="left-[303px] top-[28px] absolute justify-start items-center gap-4 inline-flex">
  //           <div className="text-[#333236] text-sm font-normal font-['Pretendard']">1 페이지 중 1</div>
  //           <div className="justify-center items-center flex">
  //             <div className="justify-start items-start gap-2.5 flex">
  //               <div className="w-10 h-10 bg-white rounded-tl rounded-bl border border-[#d9d9d9]"/>
  //               <div className="w-4 h-4 left-[28px] top-[28px] absolute origin-top-left -rotate-180"/>
  //             </div>
  //             <div className="justify-start items-start gap-2.5 flex">
  //               <div className="w-10 h-10 bg-white rounded-tr rounded-br border border-[#d9d9d9]"/>
  //               <div className="w-4 h-4 left-[12px] top-[12px] absolute"/>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="w-[300px] h-[1080px] left-0 top-0 absolute">
  //       <div className="w-[300px] h-[1080px] left-0 top-0 absolute">
  //         <div className="w-[300px] h-[1550px] left-0 top-0 absolute">
  //           <div className="w-[300px] h-[1550px] left-0 top-0 absolute bg-white"/>
  //         </div>
  //         <div className="left-[24px] top-[113px] absolute text-[#787486] text-xs font-bold font-['Pretendard']">Dash
  //           Boards
  //         </div>
  //         <div className="w-5 h-5 left-[256px] top-[110px] absolute"/>
  //         <div className="w-[108.80px] h-[33.07px] left-[24px] top-[20px] absolute">
  //           <div className="w-[28.82px] h-[33.07px] left-0 top-0 absolute">
  //           </div>
  //         </div>
  //       </div>
  //       <div className="w-[276px] h-[849px] left-[12px] top-[145px] absolute">
  //         <div className="w-[276px] h-[45px] left-0 top-0 absolute bg-[#f1effd] rounded"/>
  //         <div className="w-2 h-2 left-[12px] top-[19px] absolute bg-[#7ac555] rounded-full"/>
  //         <div className="left-[36px] top-[12px] absolute text-[#333236] text-lg font-medium font-['Pretendard']">비브리지
  //         </div>
  //         <div className="w-2 h-2 left-[12px] top-[67px] absolute bg-[#750cde] rounded-full"/>
  //         <div className="w-2 h-2 left-[12px] top-[115px] absolute bg-[#ffa500] rounded-full"/>
  //         <div className="w-2 h-2 left-[12px] top-[163px] absolute bg-[#76a5ea] rounded-full"/>
  //         <div className="w-2 h-2 left-[12px] top-[211px] absolute bg-[#e876ea] rounded-full"/>
  //         <div className="left-[36px] top-[108px] absolute text-[#787486] text-lg font-medium font-['Pretendard']">3분기
  //           계획
  //         </div>
  //         <div className="left-[36px] top-[156px] absolute text-[#787486] text-lg font-medium font-['Pretendard']">회의록
  //         </div>
  //         <div className="left-[36px] top-[60px] absolute text-[#787486] text-lg font-medium font-['Pretendard']">코드잇
  //         </div>
  //         <div className="left-[36px] top-[204px] absolute text-[#787486] text-lg font-medium font-['Pretendard']">중요
  //           문서함
  //         </div>
  //         <div className="w-[17.59px] h-3.5 left-[89px] top-[63px] absolute"/>
  //         <div className="w-[17.59px] h-3.5 left-[105px] top-[15px] absolute"/>
  //         <div className="left-[36px] top-[444px] absolute text-[#787486] text-lg font-medium font-['Pretendard']">중요
  //           문서함
  //         </div>
  //         <div className="left-[36px] top-[300px] absolute text-[#787486] text-lg font-medium font-['Pretendard']">코드잇
  //         </div>
  //         <div className="left-[36px] top-[396px] absolute text-[#787486] text-lg font-medium font-['Pretendard']">회의록
  //         </div>
  //         <div className="left-[36px] top-[348px] absolute text-[#787486] text-lg font-medium font-['Pretendard']">3분기
  //           계획
  //         </div>
  //         <div className="w-2 h-2 left-[12px] top-[451px] absolute bg-[#e876ea] rounded-full"/>
  //         <div className="w-2 h-2 left-[12px] top-[403px] absolute bg-[#76a5ea] rounded-full"/>
  //         <div className="w-2 h-2 left-[12px] top-[355px] absolute bg-[#ffa500] rounded-full"/>
  //         <div className="w-2 h-2 left-[12px] top-[307px] absolute bg-[#750cde] rounded-full"/>
  //         <div
  //           className="left-[36px] top-[252px] absolute text-[#787486] text-lg font-medium font-['Pretendard']">비브리지
  //         </div>
  //         <div className="w-2 h-2 left-[12px] top-[259px] absolute bg-[#7ac555] rounded-full"/>
  //         <div className="left-[36px] top-[684px] absolute text-[#787486] text-lg font-medium font-['Pretendard']">중요
  //           문서함
  //         </div>
  //         <div className="left-[36px] top-[540px] absolute text-[#787486] text-lg font-medium font-['Pretendard']">코드잇
  //         </div>
  //         <div className="left-[36px] top-[636px] absolute text-[#787486] text-lg font-medium font-['Pretendard']">회의록
  //         </div>
  //         <div className="left-[36px] top-[588px] absolute text-[#787486] text-lg font-medium font-['Pretendard']">3분기
  //           계획
  //         </div>
  //         <div className="w-2 h-2 left-[12px] top-[691px] absolute bg-[#e876ea] rounded-full"/>
  //         <div className="w-2 h-2 left-[12px] top-[643px] absolute bg-[#76a5ea] rounded-full"/>
  //         <div className="w-2 h-2 left-[12px] top-[595px] absolute bg-[#ffa500] rounded-full"/>
  //         <div className="w-2 h-2 left-[12px] top-[547px] absolute bg-[#750cde] rounded-full"/>
  //         <div
  //           className="left-[36px] top-[492px] absolute text-[#787486] text-lg font-medium font-['Pretendard']">비브리지
  //         </div>
  //         <div className="w-2 h-2 left-[12px] top-[499px] absolute bg-[#7ac555] rounded-full"/>
  //         <div className="left-[36px] top-[780px] absolute text-[#787486] text-lg font-medium font-['Pretendard']">코드잇
  //         </div>
  //         <div className="left-[36px] top-[828px] absolute text-[#787486] text-lg font-medium font-['Pretendard']">3분기
  //           계획
  //         </div>
  //         <div className="w-2 h-2 left-[12px] top-[835px] absolute bg-[#ffa500] rounded-full"/>
  //         <div className="w-2 h-2 left-[12px] top-[787px] absolute bg-[#750cde] rounded-full"/>
  //         <div
  //           className="left-[36px] top-[732px] absolute text-[#787486] text-lg font-medium font-['Pretendard']">비브리지
  //         </div>
  //         <div className="w-2 h-2 left-[12px] top-[739px] absolute bg-[#7ac555] rounded-full"/>
  //       </div>
  //       <div className="h-10 left-[12px] top-[1025px] absolute justify-center items-center inline-flex">
  //         <div className="justify-start items-start gap-2.5 flex">
  //           <div className="w-10 h-10 bg-white rounded-tl rounded-bl border border-[#d9d9d9]"/>
  //           <div className="w-4 h-4 left-[28px] top-[28px] absolute origin-top-left -rotate-180"/>
  //         </div>
  //         <div className="justify-start items-start gap-2.5 flex">
  //           <div className="w-10 h-10 bg-white rounded-tr rounded-br border border-[#d9d9d9]"/>
  //           <div className="w-4 h-4 left-[12px] top-[12px] absolute"/>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
}
