import Check from '/public/icons/check.svg'
import Kebab from '/public/icons/kebab-menu.svg'
import MenuDown from '/public/icons/menu-down.svg'
import Dropdown from '@/components/Dropdown'

import ColumnChip from './ColumnChip'

const INITIAL_COLUMNS = [
  { id: '1212', title: 'To Do' },
  { id: '1213', title: 'On Progress' },
  { id: '1214', title: 'Done' },
]

interface Column {
  id: string
  title: string
}

interface ColumnSelectProps {
  setValue: (name: string, value: string) => void
  selectedColumnId: string
  columns?: Column[]
}

export default function ColumnSelect({
  setValue,
  selectedColumnId,
  columns = INITIAL_COLUMNS,
}: ColumnSelectProps) {
  const handleSelect = (value: string) => {
    setValue('columnId', value)
  }
  const slectedColumnTitle = columns.filter(
    item => item.id === selectedColumnId
  )[0].title

  return (
    <>
      <Dropdown>
        <Dropdown.Trigger className='rounded-container flex h-12 w-full items-center justify-between p-2'>
          <ColumnChip>{slectedColumnTitle}</ColumnChip>
          <MenuDown />
        </Dropdown.Trigger>
        <Dropdown.Menu className='w-full gap-0 p-0'>
          {columns.map(column => {
            const isSelected = column.id === selectedColumnId
            return (
              <li key={column.id}>
                <Dropdown.Item
                  className='relative flex h-12 w-full items-center py-2 pl-[46px] pr-4'
                  onClick={() => {
                    handleSelect(column.id)
                  }}
                >
                  {isSelected && (
                    <Check className='absolute left-4 top-[13px] text-custom-gray-500' />
                  )}
                  <ColumnChip>{column.title}</ColumnChip>
                </Dropdown.Item>
              </li>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className=''>
        <Dropdown.Trigger className='flex items-center justify-center'>
          <Kebab className='h-6 w-6 text-custom-black-200 md:h-8 md:w-8' />
        </Dropdown.Trigger>
        <Dropdown.Menu className='h-20 w-[92px]'>
          <Dropdown.Item
            className='h-8 justify-center hover:bg-custom-light-violet hover:text-custom-violet'
            onClick={() => {
              console.log('수정')
            }}
          >
            수정하기
          </Dropdown.Item>
          <Dropdown.Item
            className='h-8 justify-center hover:bg-custom-light-violet hover:text-custom-violet'
            onClick={() => {
              console.log('삭제')
            }}
          >
            삭제하기
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}
