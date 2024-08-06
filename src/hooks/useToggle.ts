import { useCallback, useState } from 'react'

export default function useToggle(
  initialValue: boolean = false
): [boolean, () => void] {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue(prevValue => !prevValue)
  }, [])

  return [value, toggle]
}
