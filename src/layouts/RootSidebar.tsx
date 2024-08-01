'use client'

import AddSquareIcon from '@/assets/add-square.svg'

import { ChildrenProp } from './DashboardLayout'

export default function RootSidebar({ children }: ChildrenProp) {
  return (
    <div className='h-full w-full overflow-hidden border-r-[1px] border-[#d9d9d9]'>
      <div className='h-full w-full overflow-auto'>
        <section className='flex h-16 items-center justify-center px-6 md:justify-between'>
          <p className='hidden text-xs font-semibold text-[#787486] md:block'>
            Dash Boards
          </p>
          <button className='p-0.5'>
            <AddSquareIcon />
          </button>
        </section>
        <section
          className='px-6 py-5 text-slate-800'
          style={{
            maxHeight: 'calc(100% - 64px)',
          }}
        >
          {children}
        </section>
      </div>
    </div>
  )
}
