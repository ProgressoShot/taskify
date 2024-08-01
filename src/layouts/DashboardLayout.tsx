/**
 * @JuhyeokC
 * @todo
 * 반응형크기 변수명 변경, module 로 분리하기
 * Aside 크기 반응형 작업
 */

import { ReactElement } from 'react'

import AddSquareIcon from '@/assets/add-square.svg'

interface ChildrenProp {
  children: ReactElement | any
}

const 반응형크기: {
  large: number
  medium: number
  small: number
} = {
  large: 300,
  medium: 160,
  small: 67,
}

function DashboardLayout({ children }: ChildrenProp) {
  return <main>{children}</main>
}

function Container({ children }: ChildrenProp) {
  return (
    <section
      className='grid h-screen w-screen bg-white'
      style={{
        gridTemplateColumns: '300px auto',
      }}
    >
      {children}
    </section>
  )
}

const Aside = ({ children }: ChildrenProp) => {
  return (
    <div className='h-full w-full overflow-hidden border-r-[1px] border-[#d9d9d9]'>
      <div className='h-full w-full overflow-auto'>
        <section className='flex h-16 items-center justify-between px-6'>
          <p className='text-xs font-semibold text-[#787486]'>Dash Boards</p>
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

const Content = ({ children }: ChildrenProp) => {
  return (
    <div className='h-full w-full overflow-hidden bg-[#fafafa]'>
      <div className='h-full w-full overflow-auto'>
        <article>{children}</article>
      </div>
    </div>
  )
}

DashboardLayout.Container = Container
DashboardLayout.Aside = Aside
DashboardLayout.Content = Content

export default DashboardLayout
