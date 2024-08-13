import React, { useState } from 'react'

import Check from '/public/icons/check-black.svg'
import MenuDown from '/public/icons/menu-down.svg'
import Dropdown from '@/components/Dropdown'

const INITIAL_MEMBERS = [
  { userId: 1212, nickname: '배수지' },
  { userId: 1213, nickname: '배수진' },
  { userId: 121, nickname: '배수저' },
]

interface Member {
  userId: number
  nickname: string
}

interface AsigneeSelectProps {
  handleAssigneeSelect: (value: number) => void
  selectedUserId: number
  members?: Member[]
}

export default function AsigneeSelect({
  handleAssigneeSelect,
  selectedUserId,
  members = INITIAL_MEMBERS,
}: AsigneeSelectProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isInputMode, setIsInputMode] = useState(true)

  const handleTriggerClick = () => {
    setIsInputMode(true)
  }

  const filteredMembers = members.filter(member =>
    member.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedMember = members.find(item => item.userId === selectedUserId)
  const selectedColumnTitle = selectedMember
    ? selectedMember.nickname
    : '이름을 입력해주세요'

  return (
    <Dropdown>
      <Dropdown.Trigger
        onClick={handleTriggerClick}
        className='rounded-container flex h-12 w-full items-center justify-between px-4 py-3 text-base font-normal text-custom-black-200 focus:border-custom-violet'
      >
        {isInputMode ? (
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder='이름을 입력해주세요'
            className='w-full'
          />
        ) : (
          <>{selectedColumnTitle}</>
        )}
        <MenuDown />
      </Dropdown.Trigger>
      <Dropdown.Menu className='mt-1 w-full gap-0 p-0 text-base font-normal'>
        {filteredMembers.length > 0 ? (
          filteredMembers.map(member => {
            const isSelected = member.userId === selectedUserId
            return (
              <li key={member.userId}>
                <Dropdown.Item
                  className='relative flex h-12 w-full items-center py-2 pl-[46px] pr-4'
                  onClick={() => {
                    handleAssigneeSelect(member.userId)
                    setIsInputMode(false)
                  }}
                >
                  {isSelected && (
                    <Check className='absolute left-4 top-[13px] text-custom-gray-500' />
                  )}
                  {member.nickname}
                </Dropdown.Item>
              </li>
            )
          })
        ) : (
          <li className='p-4 text-center text-custom-gray-500'>
            검색 결과가 없습니다.
          </li>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}
