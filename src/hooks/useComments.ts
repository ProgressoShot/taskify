import { useEffect, useState } from 'react'

import api from '@/lib/axiosInstance'
import type { Comment } from '@/types/types'

export const useComments = (cardId: number) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`comments?size=10&cardId=${cardId}`)
        const { comments } = res.data
        setComments(() => comments)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    if (cardId) {
      fetchComments()
    }
  }, [cardId])

  return { comments, loading, error }
}
