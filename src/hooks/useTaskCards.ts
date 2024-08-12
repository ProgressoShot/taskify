import { useEffect, useState } from 'react'

import taskifyApi from '@/lib/axiosInstance'
import type { TaskCard } from '@/lib/types'

export const useTaskCards = (columnId: number) => {
  const [taskCards, setTaskCards] = useState<TaskCard[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchTaskCards = async () => {
      try {
        const res = await taskifyApi.get(
          `cards?size=10&cursorId=0&columnId=${columnId}`
        )
        const { cards, totalCount: count } = res.data
        setTaskCards(() => cards)
        setTotalCount(() => count)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    if (columnId) {
      fetchTaskCards()
    }
  }, [columnId])

  return { taskCards, totalCount, loading, error }
}
