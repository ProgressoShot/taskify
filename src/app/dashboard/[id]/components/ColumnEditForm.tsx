import Close from '/public/icons/close.svg'
import Button from '@/components/Button'
import Form from '@/components/Form'
import useModalStore from '@/store/useModalStore'

export default function ColumnEditForm({
  columnTitle,
}: {
  columnTitle: string
}) {
  const { closeModal } = useModalStore()
  return (
    <section className='modal-container max-w-[568px] px-4 py-6 md:px-6'>
      <h2 className='mb-4 flex items-center justify-between text-xl font-bold text-custom-black-200 md:mb-6 md:text-2xl'>
        컬럼 관리
        <button type='button' onClick={closeModal}>
          <Close className='h-6 w-6 md:h-8 md:w-8' />
        </button>
      </h2>
      <Form
        onSubmit={() => {
          console.log('야호')
        }}
        formId='columnEditForm'
      >
        <Form.Label className='mb-6'>
          <Form.LabelHeader className='mb-2'>이름</Form.LabelHeader>
          <Form.Input type='text' />
        </Form.Label>
        <div className='grid grid-cols-2 gap-2'>
          <Button
            color='secondary'
            className='h-[54px] w-full text-base font-medium text-custom-gray-500'
          >
            삭제
          </Button>
          <Button className='h-[54px] w-full text-base font-semibold'>
            변경
          </Button>
        </div>
      </Form>
    </section>
  )
}
