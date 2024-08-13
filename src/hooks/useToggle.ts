import { useCallback, useState } from 'react'

export default function useToggle(
  initialValue: boolean = false
): [boolean, () => void, () => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue(prevValue => !prevValue)
  }, [])

  const close = useCallback(() => {
    setValue(prevValue => false)
  }, [])

  return [value, toggle, close]
}
