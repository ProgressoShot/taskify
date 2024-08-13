import 'react-datepicker/dist/react-datepicker.css'

import { format } from 'date-fns'
import React, { useEffect,useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'

import AddBox from '/public/icons/add-box2.svg'
import Calendar from '/public/icons/calendar.svg'
import AsigneeSelect from '@/app/dashboard/[id]/components/AsigneeSelect'
import { imageUpload } from '@/app/utils/api'
import api from '@/app/utils/axiosInstance'
import Form from '@/components/Form'
import useModalStore from '@/store/useModalStore'
import useUserStore from '@/store/useUserStore'

import Button from './Button'
import Chip from './Chip'

interface taskFormValue {
  assigneeUserId: number
  dashboardId: number
  columnId: number
  title: string
  description: string
  dueDate: string
  tags: string[]
  imageUrl: string
}

interface AddTaskModalProps {
  columnId: taskFormValue['columnId']
  dashboardId: taskFormValue['dashboardId']
}

export default function AddTaskModal({
  dashboardId,
  columnId,
}: AddTaskModalProps) {
  const { closeModal } = useModalStore()

  const user = JSON.parse(sessionStorage.user)

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isLoading },
  } = useForm<taskFormValue>({
    defaultValues: {
      dashboardId: dashboardId,
      columnId: columnId,
    },
  })
  const [tags, setTags] = useState<string[]>([])
  const [members, setMembers] = useState<[]>([])

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const input = event.currentTarget.value.trim()
      if (event.nativeEvent.isComposing) return
      else if (input && !tags.includes(input)) {
        setTags(prevTags => [...prevTags, input])
      }
      event.currentTarget.value = ''
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const onSubmit = async (data: taskFormValue) => {
    try {
      const res = await imageUpload({
        type: 'card',
        columnId: columnId,
        image: data.imageUrl[0],
      })
      data.imageUrl = res.imageUrl
    } catch (error) {
      return '이미지 업로드 실패'
    }

    const formattedDueDate = data.dueDate
      ? format(new Date(data.dueDate), 'yyyy-MM-dd HH:mm')
      : undefined

    const newData = {
      ...data,
      assigneeUserId: user.id,
      dashboardId: dashboardId,
      columnId: columnId,
      tags: tags,
      dueDate: formattedDueDate,
      imageUrl: watch('imageUrl'),
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

  const handleAssigneeSelect = (value: number) => {
    setValue('assigneeUserId', value)
  }

  const assigneeUserId = watch('assigneeUserId')

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await api.get(
          `/members?page=1&size=20&dashboardId=${dashboardId}`
        )
        setMembers(response.data.members)
      } catch (error) {
        console.error('Failed to fetch members:', error)
      }
    }

    fetchMembers()
  }, [dashboardId])

  return (
    <div className='w-[584px] rounded-2xl bg-white p-8'>
      <Form formId='AddTaskForm' onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-8 h-8 text-2xl font-bold text-custom-black-200'>
          할 일 생성
        </div>
        <Form.Label className='mb-5'>
          <Form.LabelHeader className={labelHeader}>담당자</Form.LabelHeader>
          <AsigneeSelect
            handleAssigneeSelect={handleAssigneeSelect}
            selectedUserId={assigneeUserId}
            members={members}
          />
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
          <label className='h-[76px] w-[76px] cursor-pointer'>
            <AddBox className='h-full w-full' viewBox='0 0 22 22' />
            <Form.Input
              register={register('imageUrl')}
              type='file'
              className='hidden'
            />
          </label>
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

const labelHeader = 'h-[26px] text-[18px] font-medium'
