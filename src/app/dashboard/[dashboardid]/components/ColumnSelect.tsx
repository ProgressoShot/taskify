import Check from '/public/icons/check.svg'
import MenuDown from '/public/icons/menu-down.svg'
import ColumnChip from '@/app/dashboard/[dashboardid]/components/ColumnChip'
import Dropdown from '@/components/Dropdown'

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
    <Dropdown>
      <Dropdown.Trigger className='rounded-container flex h-12 w-full items-center justify-between p-2'>
        <ColumnChip>{slectedColumnTitle}</ColumnChip>
        <MenuDown />
      </Dropdown.Trigger>
      <Dropdown.Menu className='mt-1 w-full gap-0 p-0'>
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
  )
}
