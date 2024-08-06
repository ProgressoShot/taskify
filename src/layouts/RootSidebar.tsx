import AddIcon from '/public/icons/add-box.svg'

export default function RootSidebar({ children }: React.PropsWithChildren) {
  return (
    <div className='h-full w-full overflow-hidden border-r border-custom-gray-300'>
      <section className='flex h-16 items-center justify-center px-6 md:justify-between'>
        <p className='hidden whitespace-nowrap text-xs font-semibold text-custom-gray-500 md:block'>
          Dash Boards
        </p>
        <button className='p-0.5'>
          <AddIcon className='text-custom-gray-500' />
        </button>
      </section>
      <section
        className='flex flex-col gap-2 overflow-auto p-2 pb-6 text-slate-800'
        style={{
          maxHeight: 'calc(100% - 4rem)',
        }}
      >
        {children}
      </section>
    </div>
  )
}
