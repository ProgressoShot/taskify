import React, { useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css' //datepicker 스타일 import

import AddBox from '/public/icons/add-box2.svg'
import api from '@/app/utils/axiosInstance'
import Button from './Button'
import Dropdown from './Dropdown'
import Form from '@/components/Form'
import useModalStore from '@/store/useModalStore'

interface taskFormValue {
  title: string
  description: string
  dueDate: string
  tags: string[]
  imageUrl?: string
}

export default function AddTaskModal() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isLoading },
  } = useForm<taskFormValue>()
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

  const onSubmit = async (data: taskFormValue) => {
    try {
      const response = await api.post('/cards', data) // POST 요청으로 데이터를 전송합니다.
      console.log('post성공: ', response.data)
      closeModal()
    } catch (error) {
      console.error('post실패: ', error)
      console.log('이렇게: ', data)
    }
  }
  const [date, setDate] = React.useState<Date>(new Date(Date.now()))

  return (
    <div className='w-[584px] rounded-2xl bg-white p-8'>
      <Form formId='AddTaskForm' onSubmit={handleSubmit(onSubmit)}>
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
          <Form.Input
            register={register('title')}
            type='text'
            placeholder='제목을 입력해 주세요'
          />
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
            register={register('description')}
            placeholder='설명을 입력해 주세요'
            className='h-[126px]'
          />
          {/* 텍스트 인풋 */}
        </Form.Label>
        <Form.Label className='mb-5'>
          <Form.LabelHeader className='labelHeader'>마감일</Form.LabelHeader>
          <Controller
            control={control}
            name='dueDate'
            render={({ field }) => (
              <DatePicker
                placeholderText='마감일을 입력해 주세요'
                selected={field.value ? new Date(field.value) : null}
                onChange={date => {
                  setDate(date as Date)
                  field.onChange(date)
                }}
                dateFormat='yyyy/MM/dd hh:mm'
                className='rounded-container block w-full px-4 py-3 text-custom-black-200 outline-none placeholder:text-custom-gray-400 focus:border-custom-violet'
              />
            )}
          />
        </Form.Label>
        <Form.Label className='mb-5'>
          <Form.LabelHeader className='labelHeader'>태그</Form.LabelHeader>
          <Form.Input
            register={register('tags')}
            type='text'
            placeholder='태그를 입력해 주세요'
          />
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
