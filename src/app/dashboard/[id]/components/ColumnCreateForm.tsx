import Button from '@/components/Button'
import Form from '@/components/Form'
import ModalFormLayout from '@/layouts/ModalFormLayout'
import useModalStore from '@/store/useModalStore'

export default function ColumnCreateForm({}) {
  const { closeModal } = useModalStore()

  return (
    <ModalFormLayout headerTitle='새 칼럼 생성'>
      <Form
        onSubmit={() => {
          console.log('칼럼 생성')
        }}
        formId='columnCreateForm'
      >
        <Form.Label className='mb-6'>
          <Form.LabelHeader>이름</Form.LabelHeader>
          <Form.Input type='text' placeholder='칼럼 이름을 입력해주세요' />
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
        >
          생성
        </Button>
      </div>
    </ModalFormLayout>
  )
}
