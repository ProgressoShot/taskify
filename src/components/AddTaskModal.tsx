import React, { useRef } from 'react'

import AddBox from '/public/icons/add-box2.svg'
import Button from './Button'
// import Calendar from 'react-calendar';
import Dropdown from './Dropdown'
import Form from '@/components/Form'
import useModalStore from '@/store/useModalStore'

export default function AddTaskModal() {
  function temp() {} // TODO: onSubmit 함수 작업하기
  const labelHeader = 'h-[26px] text-[18px] font-medium'

  // 파일 입력을 위한 ref 생성
  const fileInputRef = useRef<HTMLInputElement>(null)

  // AddBox 클릭 시 파일 선택 창을 여는 함수
  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const { closeModal } = useModalStore()

  return (
    <div className='w-[584px] rounded-2xl bg-white p-8'>
      <Form formId='AddTaskForm' onSubmit={temp}>
        <div className='mb-8 h-8 text-2xl font-bold'>할 일 생성</div>
        <Form.Label className='mb-5'>
          <Form.LabelHeader className='labelHeader'>담당자</Form.LabelHeader>
          <Form.Input type='text' placeholder='담당자를 입력해 주세요' />
        </Form.Label>
        <Form.Label className='mb-5'>
          <Form.LabelHeader className='labelHeader flex'>
            제목
            <span className='ml-0.5 flex items-center text-custom-violet'>
              *
            </span>
          </Form.LabelHeader>
          <Form.Input type='text' placeholder='제목을 입력해 주세요' />
          {/* 텍스트 인풋 */}
        </Form.Label>
        <Form.Label className='mb-5'>
          <Form.LabelHeader className='labelHeader flex'>
            설명
            <span className='ml-0.5 flex items-center text-custom-violet'>
              *
            </span>
          </Form.LabelHeader>
          <Form.TextArea
            placeholder='설명을 입력해 주세요'
            className='h-[126px]'
          />
          {/* 텍스트 인풋 */}
        </Form.Label>
        <Form.Label className='mb-5'>
          <Form.LabelHeader className='labelHeader'>마감일</Form.LabelHeader>
          {/* 캘린더 선택 라이브러리 */}
          <Form.Input type='text' placeholder='마감일을 입력해 주세요' />
        </Form.Label>
        <Form.Label className='mb-5'>
          <Form.LabelHeader className='labelHeader'>태그</Form.LabelHeader>
          <Form.Input type='text' placeholder='태그를 입력해 주세요' />
          {/* 입력 후 Enter */}
        </Form.Label>
        <Form.Label className='mb-5'>
          <Form.LabelHeader className='labelHeader'>이미지</Form.LabelHeader>
          {/* 숨겨진 파일 입력 */}
          <input
            type='file'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={e => {
              // 파일이 선택되었을 때의 로직
              console.log(e.target.files)
            }}
          />
          <button
            className='h-[76px] w-[76px]'
            type='button'
            onClick={handleFileUploadClick}
          >
            <AddBox className='h-[76px] w-[76px]' viewBox='0 0 25 25' />
          </button>
        </Form.Label>
        <div className='flex'>
          <Button
            className='h-[54px] w-[256px] gap-[8px]'
            color='secondary'
            onClick={closeModal}
          >
            취소
          </Button>
          <Button
            className='h-[54px] w-[256px] gap-[8px]'
            type='submit'
            color='primary'
          >
            생성
          </Button>
        </div>
      </Form>
    </div>
  )
}
