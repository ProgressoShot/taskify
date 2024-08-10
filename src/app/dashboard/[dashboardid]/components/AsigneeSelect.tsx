import Check from '/public/icons/check.svg'
import MenuDown from '/public/icons/menu-down.svg'
import ColumnChip from '@/app/dashboard/[dashboardid]/components/ColumnChip'
import Dropdown from '@/components/Dropdown'

const INITIAL_MEMBERS = [
  { userId: '1212', nickname: '배수지' },
  { userId: '1213', nickname: '배수진' },
  { userId: '1214', nickname: '배수저' },
]

interface Member {
  userId: string
  nickname: string
}

interface AsigneeSelectProps {
  setValue: (name: string, value: string) => void
  selectedUserId: string
  members?: Member[]
}

export default function AsigneeSelect({
  setValue,
  selectedUserId,
  members = INITIAL_MEMBERS,
}: AsigneeSelectProps) {
  const handleSelect = (value: string) => {
    setValue('columnId', value)
  }
  const slectedColumnTitle = members.filter(
    item => item.userId === selectedUserId
  )[0].nickname

  return (
    <Dropdown>
      <Dropdown.Trigger className='rounded-container flex h-12 w-full items-center justify-between p-2 text-base font-normal text-custom-black-200 focus:border-custom-violet'>
        {slectedColumnTitle}
        <MenuDown />
      </Dropdown.Trigger>
      <Dropdown.Menu className='w-full gap-0 p-0 text-base font-normal'>
        {members.map(member => {
          const isSelected = member.userId === selectedUserId
          return (
            <li key={member.userId}>
              <Dropdown.Item
                className='relative flex h-12 w-full items-center py-2 pl-[46px] pr-4'
                onClick={() => {
                  handleSelect(member.userId)
                }}
              >
                {isSelected && (
                  <Check className='absolute left-4 top-[13px] text-custom-gray-500' />
                )}
                {member.nickname}
              </Dropdown.Item>
            </li>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}
