import cn from 'classnames'
import React, { createContext, ReactNode, useContext } from 'react'

import useToggle from '@/hooks/useToggle'

interface Props {
  children: ReactNode
  className?: string
}

interface DropdownProps extends Props {}
interface TriggerProps extends Props {
  onClick?: () => void
}
interface MenuProps extends Props {}
interface ItemProps extends Props {
  onClick: () => void
}

const DropdownContext = createContext({
  isOpen: false,
  toggle: () => {},
  toggleClose: () => {},
})

function Dropdown({ children, className }: DropdownProps) {
  const [isOpen, toggle, toggleClose] = useToggle(false)
  const containerStyle = cn('relative', className)

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, toggleClose }}>
      <div className={containerStyle} onBlur={toggleClose}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

const Trigger = ({ children, className, onClick }: TriggerProps) => {
  const { toggle, toggleClose } = useContext(DropdownContext)

  return (
    <button
      type='button'
      className={className}
      onClick={() => {
        if (onClick) {
          onClick()
        }
        toggle()
      }}
    >
      {children}
    </button>
  )
}

const Menu = ({ children, className }: MenuProps) => {
  const { isOpen } = useContext(DropdownContext)
  const menuStyle = cn(
    'rounded-container absolute right-0 z-10 mt-[2px] flex flex-col justify-between gap-1 p-[6px]',
    className
  )

  return isOpen ? <div className={menuStyle}>{children}</div> : null
}

const Item = ({ children, className, onClick }: ItemProps) => {
  const { toggle } = useContext(DropdownContext)

  const itemStyle = cn(
    'flex w-full items-center rounded-[4px] text-sm text-custom-black-200',
    className
  )

  return (
    <button
      className={itemStyle}
      type='button'
      onMouseDown={event => {
        event?.stopPropagation()
        onClick()
        toggle()
      }}
    >
      {children}
    </button>
  )
}

Dropdown.Trigger = Trigger
Dropdown.Menu = Menu
Dropdown.Item = Item

export default Dropdown
