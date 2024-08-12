import { useEffect, useRef, useState } from 'react'

import IconSearch from '/public/icons/search.svg'
import ImageEmptyInvitation from '/public/images/not-invited.svg'
import Button from '@/components/Button'
import { listReceivedInvitiations } from '@/lib/api'

import ReceivedInvitiation from './ReceivedInvitiation'

type Dashboard = {
  id: number
  title: string
}

type User = {
  id: number
  email: string
  nickname: string
}

export type ReceivedInvitiationType = {
  id: number
  dashboard: Dashboard
  teamId: string
  inviter: User
  invitee: User
  inviteAccepted: boolean
  createdAt: string
  updatedAt: string
}

function EmptyInvitationList() {
  return (
    <div className='flex h-80 flex-col items-center justify-center p-6'>
      <ImageEmptyInvitation />
      <p className='mb-10 p-6 text-center text-lg font-normal text-custom-gray-400'>
        아직 초대받은 대시보드가 없어요
      </p>
    </div>
  )
}

const ITEM_PER_PAGE: number = 10

export default function ReceivedInvitiationList() {
  const searchInput = useRef<HTMLInputElement | null>(null)
  const [value, setValue] = useState<string>('')
  const [list, setList] = useState<ReceivedInvitiationType[] | null>(null)
  const [cursor, setCursor] = useState<number | null>(null)

  type ParametersType = Parameters<typeof listReceivedInvitiations>

  const getReceivedInvitiation = async ([
    size = ITEM_PER_PAGE,
    cursorId = cursor,
    title = value,
  ]: ParametersType) => {
    const data = await listReceivedInvitiations(size, cursorId, title)
    setList(prev =>
      Boolean(cursorId) && prev !== null
        ? [...prev, ...data.invitations]
        : data.invitations
    )
    setCursor(data.cursorId)
  }

  const handleClick = async () => {
    getReceivedInvitiation([ITEM_PER_PAGE, cursor, value])
  }

  useEffect(() => {
    if (list === null) getReceivedInvitiation([ITEM_PER_PAGE])
    if (searchInput.current) searchInput.current.focus()
  })

  useEffect(() => {
    getReceivedInvitiation([ITEM_PER_PAGE, cursor, value])
  }, [cursor, getReceivedInvitiation, value])

  if (list === null || list.length === 0) return <EmptyInvitationList />

  return (
    <>
      <div className='px-6 md:px-8'>
        <article className='relative'>
          <label
            htmlFor='dashboardSearchInput'
            className='flex h-10 w-full items-center justify-start gap-1 rounded-md border border-custom-gray-300 px-4 text-custom-black-200 outline-none placeholder:text-custom-gray-400 focus:border-custom-violet'
          >
            <IconSearch className='flex-none' />
            <input
              ref={searchInput}
              type='text'
              name='dashboardSearch'
              id='dashboardSearchInput'
              value={value}
              placeholder='검색'
              onChange={e => {
                e.preventDefault()
                setValue(e.target.value)
              }}
              className='h-full flex-1'
            />
          </label>
        </article>
      </div>
      <ReceivedInvitiation>
        {list &&
          list.map((item: ReceivedInvitiationType) => {
            return (
              <ReceivedInvitiation.Item
                key={`invite-dashboard-${item.id}`}
                invitation={item}
                callBackFunction={getReceivedInvitiation}
              />
            )
          })}
        {cursor !== null && (
          <ReceivedInvitiation.Foot>
            <Button color='secondary' onClick={handleClick}>
              더보기
            </Button>
          </ReceivedInvitiation.Foot>
        )}
      </ReceivedInvitiation>
    </>
  )
}
