import cn from 'classnames'
import Bullet from '../../public/icons/bullet.svg'
import Setting from '../../public/icons/settings.svg'
import NewTaskButton from '@/components/NewTaskButton'
import TaskCard from '../components/TaskCard'

interface DashboardColProps {
  title: string
  colNum: number
}

export default function DashboardCol({ title, colNum }: DashboardColProps) {
  return (
    <div className='h-auto w-full flex-none overflow-hidden border-b border-custom-gray-200 lg:h-full lg:w-[354px] lg:border-r'>
      <div className='h-full w-full overflow-auto px-5'>
        <div className='mb-[25px] mt-[22px] flex'>
          <div className='flex items-center'>
            <Bullet className='text-2 mr-2 text-custom-violet' />
            <div className='mr-3 text-lg font-bold'>{title}</div>
            <span className='flex h-5 w-5 items-center justify-center rounded bg-custom-gray-200 text-[12px]'>
              {colNum}
            </span>
          </div>
          <button className='ml-auto'>
            <Setting className='h-[19px] w-[19px] text-custom-gray-500' />
          </button>
        </div>
        <NewTaskButton />
      </div>
    </div>
  )
}
