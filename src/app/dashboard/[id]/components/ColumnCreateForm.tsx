import { useForm } from 'react-hook-form'

import api from '@/app/utils/axiosInstance'
import Button from '@/components/Button'
import ConfirmModal from '@/components/ConfirmModal'
import Form from '@/components/Form'
import ModalFormLayout from '@/layouts/ModalFormLayout'
import useModalStore from '@/store/useModalStore'
import type { Column } from '@/types/types'

interface CreateColumnForm {
  title: string
  dashboardId: number
}

interface ColumnCreateFormProps {
  dashboardId: Column['dashboardId']
  columnTitles: Column['title'][]
}
export default function ColumnCreateForm({
  dashboardId,
  columnTitles,
}: ColumnCreateFormProps) {
  const { openModal, closeModal } = useModalStore()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isLoading },
  } = useForm<CreateColumnForm>()
  setValue('dashboardId', dashboardId)

  const isDisabled = !!(errors.title || isLoading)

  const onSubmit = async (data: CreateColumnForm) => {
    await api
      .post('columns', data)
      .finally(() => closeModal())
      .catch(error => {
        openModal(<ConfirmModal message={error.response.data.message} />)
      })
  }

  return (
    <ModalFormLayout headerTitle='새 칼럼 생성'>
      <Form onSubmit={handleSubmit(onSubmit)} formId='columnCreateForm'>
        <Form.Label className='mb-6'>
          <Form.LabelHeader className='mb-2'>제목</Form.LabelHeader>

          <Form.Input
            register={register('title', {
              required: { value: true, message: '칼럼 제목을 입력해주세요.' },
              validate: value =>
                !columnTitles.includes(value) || '중복된 컬럼 이름입니다.',
            })}
            hasError={!!errors.title}
            type='text'
            placeholder='칼럼 제목을 입력해주세요.'
            required
          />
          {errors.title && <Form.Error>{errors.title.message}</Form.Error>}
        </Form.Label>
      </Form>
      <div className='grid grid-cols-2 gap-2'>
        <Button
          color='secondary'
          className='h-[54px] w-full text-base font-medium text-custom-gray-500'
          onClick={closeModal}
        >
          취소
        </Button>
        <Button
          className='h-[54px] w-full text-base font-semibold'
          type='submit'
          form='columnCreateForm'
          isDisabled={isDisabled}
        >
          생성
        </Button>
      </div>
    </ModalFormLayout>
  )
}
