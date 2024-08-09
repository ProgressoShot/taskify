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
  columns: Column[]
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
      <Dropdown.Trigger>{slectedColumnTitle}</Dropdown.Trigger>
      <Dropdown.Menu>
        {columns.map(column => (
          <li key={column.id}>
            <Dropdown.Item
              onClick={() => {
                handleSelect(column.id)
              }}
            >
              {column.title}
            </Dropdown.Item>
          </li>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
