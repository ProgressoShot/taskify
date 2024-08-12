import { StrictPropsWithChildren } from '@/lib/types'

interface ModalFormLayoutProps {
  headerTitle: string
}

export default function ModalFormLayout({
  headerTitle,
  children,
}: StrictPropsWithChildren<ModalFormLayoutProps>) {
  return (
    <section className='modal-container w-full max-w-[568px] px-4 py-6 md:px-6'>
      <h2 className='mb-4 text-xl font-bold text-custom-black-200 md:mb-6 md:text-2xl'>
        {headerTitle}
      </h2>
      {children}
    </section>
  )
}
