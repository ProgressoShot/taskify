import axios from 'axios'
import { useForm } from 'react-hook-form'

import Close from '/public/icons/close.svg'
import api from '@/app/utils/axiosInstance'
import Button from '@/components/Button'
import ConfirmModalContent from '@/components/ConfirmModalContent'
import DeleteAlertModal from '@/components/DeleteAlertModal'
import Form from '@/components/Form'
import useModalStore from '@/store/useModalStore'

interface ColumnEditValue {
  title: string
}

interface ColumnEditFormProps extends ColumnEditValue {
  columnId: number
}

export default function ColumnEditForm({
  title: columnTitle,
  columnId,
}: ColumnEditFormProps) {
  const { openModal, closeModal } = useModalStore()
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<ColumnEditValue>({ defaultValues: { title: columnTitle } })

  const onSubmit = async (data: ColumnEditValue) => {
    closeModal()
    try {
      await api.put(`columns/${columnId}`, data)
    } catch (error) {
      let errorMessage = ''
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.message
      } else {
        errorMessage =
          '서버에 문제가 있는거 같아요. 잠시 후에 다시 시도해보시겠어요?'
      }
      openModal(<ConfirmModalContent message={errorMessage} />)
    }
  }

  const onDelete = async () => {
    closeModal()
    try {
      await api.delete(`columns/${columnId}`)
    } catch (error) {
      let errorMessage = ''
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.message
      } else {
        errorMessage =
          '서버에 문제가 있는거 같아요. 잠시 후에 다시 시도해보시겠어요?'
      }
      openModal(<ConfirmModalContent message={errorMessage} />)
    }
  }

  const isDisabled = !!(errors.title || isLoading)
  return (
    <section className='modal-container max-w-[568px] px-4 py-6 md:px-6'>
      <h2 className='mb-4 flex items-center justify-between text-xl font-bold text-custom-black-200 md:mb-6 md:text-2xl'>
        컬럼 관리
        <button type='button' onClick={closeModal}>
          <Close className='h-6 w-6 md:h-8 md:w-8' />
        </button>
      </h2>
      <Form onSubmit={handleSubmit(onSubmit)} formId='columnEditForm'>
        <Form.Label className='mb-6'>
          <Form.LabelHeader className='mb-2'>이름</Form.LabelHeader>
          <Form.Input
            type='text'
            register={register('title', {
              required: {
                value: true,
                message: '컬럼명을 입력해주세요.',
              },
              validate: value =>
                value !== columnTitle || '현재 컬렴명과 일치합니다.',
            })}
            placeholder={columnTitle}
            required
          />
          {errors.title && <Form.Error>{errors.title.message}</Form.Error>}
        </Form.Label>
        <div className='grid grid-cols-2 gap-2'>
          <Button
            color='secondary'
            className='h-[54px] w-full text-base font-medium text-custom-gray-500'
            onClick={() => {
              closeModal()
              openModal(
                <DeleteAlertModal
                  message='칼럼의 모든 카드가 삭제됩니다.'
                  onDelete={onDelete}
                />
              )
            }}
          >
            삭제
          </Button>
          <Button
            form='columnEditForm'
            className='h-[54px] w-full text-base font-semibold'
            type='submit'
            isDisabled={isDisabled}
          >
            변경
          </Button>
        </div>
      </Form>
    </section>
  )
}
