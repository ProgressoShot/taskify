import cn from 'classnames'
import React, { createContext, ReactNode, useContext } from 'react'

import useToggle from '@/hooks/useToggle'

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
}

const DropdownContext = createContext({ isOpen: false, toggle: () => {} })

function Dropdown({ children, className }: DropdownProps) {
  const [isOpen, toggle] = useToggle(false)
  const containerStyle = cn('', className)

  return (
    <DropdownContext.Provider value={{ isOpen, toggle }}>
      <div className={containerStyle}>{children}</div>
    </DropdownContext.Provider>
  )
}

const Trigger = ({ children, className, as }: TriggerProps) => {
  const { toggle } = useContext(DropdownContext)

  if (as) {
    return as({ toggle, className })
  }
  return (
    <button className={className} onClick={toggle} type='button'>
      {children}
    </button>
  )
}

const Menu = ({ children, className }: MenuProps) => {
  const { isOpen } = useContext(DropdownContext)
  const menuStyle = cn(
    'rounded-container absolute right-0 z-10 mt-[2px] flex h-20 w-[92px] flex-col justify-between gap-1 p-[6px]',
    className
  )

  return isOpen ? <div className={menuStyle}>{children}</div> : null
}

const Item = ({ children, className, onClick }: ItemProps) => {
  const { toggle } = useContext(DropdownContext)

  const itemStyle = cn(
    'flex h-8 w-20 items-center justify-center rounded-[4px] text-sm text-custom-black-200',
    className
  )

  return (
    <button
      className={itemStyle}
      type='button'
      onClick={() => {
        onClick()
        toggle()
      }}
    >
      <div className=''></div>
      {children}
    </button>
  )
}

Dropdown.Trigger = Trigger
Dropdown.Menu = Menu
Dropdown.Item = Item

export default Dropdown
