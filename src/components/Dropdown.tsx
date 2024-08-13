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
  close: () => {},
})

function Dropdown({ children, className }: DropdownProps) {
  const [isOpen, toggle, close] = useToggle(false)
  const containerStyle = cn('relative', className)
  console.log(isOpen)
  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div className={containerStyle}>{children}</div>
    </DropdownContext.Provider>
  )
}

const Trigger = ({ children, className, onClick }: TriggerProps) => {
  const { toggle } = useContext(DropdownContext)

  return (
    <button className={className} onClick={toggle} type='button'>
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
  const { toggle, close, isOpen } = useContext(DropdownContext)

  const itemStyle = cn(
    'flex w-full items-center rounded-[4px] text-sm text-custom-black-200',
    className
  )

  return (
    <button
      className={itemStyle}
      type='button'
      onClick={() => {
        onClick()
        close()
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
