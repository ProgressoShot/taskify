import Button from '@/components/Button'
import useModalStore from '@/store/useModalStore'

interface ConfirmModalContentProps {
  message: string
}

export default function ConfirmModalContent({
  message,
}: ConfirmModalContentProps) {
  const { closeModal } = useModalStore()

  return (
    <div className='flex flex-col items-center justify-center gap-8 px-10 py-8 md:px-16 md:py-10'>
      <h2 className='text-base font-medium text-custom-black-200 md:text-xl'>
        {message}
      </h2>
      <Button
        className='h-[42px] w-48 font-semibold md:text-base'
        onClick={closeModal}
      >
        확인
      </Button>
    </div>
  )
}
