import 'react-datepicker/dist/react-datepicker.css'

import { format } from 'date-fns'
import React, { useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'

import AddBox from '/public/icons/add-box2.svg'
import Calendar from '/public/icons/calendar.svg'
import api from '@/app/utils/axiosInstance'
import Form from '@/components/Form'
import useModalStore from '@/store/useModalStore'

import Button from './Button'
import Chip from './Chip'
import Dropdown from './Dropdown'

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
  } = useForm<taskFormValue>({
    defaultValues: {
      title: '',
      description: '',
      tags: [],
      dueDate: undefined,
      imageUrl: undefined,
    },
  })

  const labelHeader = 'h-[26px] text-[18px] font-medium'
  const { closeModal } = useModalStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [tags, setTags] = useState<string[]>([])

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const input = event.currentTarget.value.trim()
      if (input && !tags.includes(input)) {
        setTags(prevTags => [...prevTags, input])
      }
      event.currentTarget.value = ''
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const onSubmit = async (data: taskFormValue) => {
    const formattedDueDate = data.dueDate
      ? format(new Date(data.dueDate), 'yyyy-MM-dd HH:mm')
      : undefined

    const newData = {
      ...data,
      tags: tags,
      dueDate: formattedDueDate,
      assigneeUserId: 4444,
      dashboardId: 11482,
      columnId: 38779,
      imageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image/7-2_38678_1723223277048.jpeg',
      //   imageUrl: watch('imageUrl'),
    }

    const filteredData = Object.fromEntries(
      Object.entries(newData).filter(([key, value]) => {
        if (key === 'imageUrl' && value instanceof FileList) {
          return value.length > 0
        }
        return value !== undefined
      })
    )

    console.log('Final data being sent:', filteredData)

    try {
      const response = await api.post('/cards', filteredData)
      console.log('Post 성공:', response.data)
      closeModal()
      window.location.reload()
    } catch (error) {
      console.error('Post 실패:', error)
      console.log('데이터:', filteredData)
    }
  }

  const [date, setDate] = React.useState<Date>(new Date(Date.now()))

  return (
    <div className='w-[584px] rounded-2xl bg-white p-8'>
      <Form formId='AddTaskForm' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-8 h-8 text-2xl font-bold'>할 일 생성</div>
        <Form.Label className='mb-5'>
          <Form.LabelHeader className={labelHeader}>담당자</Form.LabelHeader>
          <Dropdown>
            <Dropdown.Trigger className='border'>
              담당자 토글 클릭하세요
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => alert('첫 번째 담당자 선택됨')}>
                첫 번째 담당자
              </Dropdown.Item>
              <Dropdown.Item onClick={() => alert('두 번째 담당자 선택됨')}>
                두 번째 담당자
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
        </Form.Label>
        <Form.Label className='mb-5'>
          <Form.LabelHeader className='labelHeader'>마감일</Form.LabelHeader>
          <Controller
            control={control}
            name='dueDate'
            render={({ field }) => (
              <div className='rounded-container block flex w-full px-4 py-3 text-custom-black-200 outline-none placeholder:text-custom-gray-400 focus:border-custom-violet'>
                <Calendar className='mr-1 mt-[1px] h-5 w-5 text-custom-gray-500' />
                <DatePicker
                  placeholderText='마감일을 입력해 주세요'
                  selected={field.value ? new Date(field.value) : null}
                  onChange={date => {
                    setDate(date as Date)
                    field.onChange(date)
                  }}
                  showTimeInput
                  dateFormat='yyyy/MM/dd hh:mm'
                />
              </div>
            )}
          />
        </Form.Label>
        <Form.Label className='mb-5'>
          <Form.LabelHeader className='labelHeader'>태그</Form.LabelHeader>
          <input
            type='text'
            placeholder='태그를 입력해 주세요'
            onKeyDown={handleTagKeyDown}
            className='rounded-container block w-full px-4 py-3 text-custom-black-200 outline-none placeholder:text-custom-gray-400 focus:border-custom-violet'
          />
          <div className='mt-2 flex flex-wrap'>
            {tags.map(tag => (
              <Chip key={tag} onDelete={() => removeTag(tag)}>
                {tag}
              </Chip>
            ))}
          </div>
        </Form.Label>
        <Form.Label className='mb-5'>
          <Form.LabelHeader className='labelHeader'>이미지</Form.LabelHeader>
          <input
            type='file'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={e => {
              console.log(e.target.files)
            }}
            className='h-[76px] w-[76px]'
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
            className='mr-2 h-[54px] w-64'
            color='secondary'
            onClick={closeModal}
          >
            취소
          </Button>
          <Button className='h-[54px] w-64' type='submit' color='primary'>
            생성
          </Button>
        </div>
      </Form>
    </div>
  )
}
