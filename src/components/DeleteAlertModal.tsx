import Button from '@/components/Button'
import useModalStore from '@/store/useModalStore'

interface DeleteAlertModalProps {
  message: string
  onDelete: () => void
}

export default function DeleteAlertModal({
  message,
  onDelete,
}: DeleteAlertModalProps) {
  const { closeModal } = useModalStore()

  return (
    <div className='modal-container flex max-w-[568px] flex-col items-center justify-center gap-8 px-4 py-6 md:gap-10 md:px-6'>
      <h2 className='keep-all text-center text-base font-medium text-custom-black-200 md:text-xl'>
        {message}
      </h2>
      <div className='grid w-full grid-cols-2 gap-2'>
        <Button
          color='secondary'
          className='h-[54px] w-full text-base font-medium text-custom-gray-500'
          onClick={closeModal}
        >
          취소
        </Button>
        <Button
          className='h-[54px] w-full text-base font-medium'
          onClick={() => {
            onDelete()
            closeModal()
          }}
        >
          삭제
        </Button>
      </div>
    </div>
  )
}
