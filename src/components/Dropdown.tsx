import cn from 'classnames'
import React, { createContext, ReactNode, useContext } from 'react'

import useToggle from '@/hooks/useToggle'

type Position = 'first' | 'last' | 'middle' | 'only'

interface Props {
  children: ReactNode
  className?: string
}

interface DropdownProps extends Props {}
interface TriggerProps extends Props {
  as?: (props: { toggle: () => void; className?: string }) => ReactNode
}
interface MenuProps extends Props {}
interface ItemProps extends Props {
  onClick: () => void
  position: Position
}

const DropdownContext = createContext({ isOpen: false, toggle: () => {} })

function Dropdown({ children, className }: DropdownProps) {
  const [isOpen, toggle] = useToggle(false)
  const containerStyle = cn('relative', className)

  return (
    <DropdownContext.Provider value={{ isOpen, toggle }}>
      <div className={containerStyle}>{children}</div>
    </DropdownContext.Provider>
  )
}

const Trigger = ({ children, className, as }: TriggerProps) => {
  const { toggle } = useContext(DropdownContext)
  const triggerStyle = cn('flex items-center', className)

  if (as) {
    return as({ toggle, className: triggerStyle })
  }

  return (
    <button className={triggerStyle} onClick={toggle} type='button'>
      {children}
    </button>
  )
}

const Menu = ({ children, className }: MenuProps) => {
  const { isOpen } = useContext(DropdownContext)
  const menuStyle = cn(
    'absolute right-0 mt-2 rounded-xl border border-solid border-gray-200 shadow-lg bg-white z-10',
    className
  )

  return isOpen ? <div className={menuStyle}>{children}</div> : null
}

const Item = ({
  children,
  className,
  onClick,
  position = 'middle',
}: ItemProps) => {
  const { toggle } = useContext(DropdownContext)

  const itemPositionStyle = styleByPosition[position]
  const itemStyle = cn(
    'flex justify-center items-center px-4 py-2 hover:bg-gray-100 cursor-pointer',
    itemPositionStyle,
    className
  )

  return (
    <div
      className={itemStyle}
      onClick={() => {
        onClick()
        toggle()
      }}
    >
      {children}
    </div>
  )
}

const styleByPosition: Record<Position, string> = {
  first: 'rounded-t-xl border-b border-solid border-gray-200',
  last: 'rounded-b-xl',
  middle: 'border-b border-solid border-gray-200',
  only: 'rounded-xl',
}

Dropdown.Trigger = Trigger
Dropdown.Menu = Menu
Dropdown.Item = Item

export default Dropdown
