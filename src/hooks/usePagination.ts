import { useState } from 'react'

interface UsePaginationProps {
  totalItems: number
  itemsPerPage: number
  initialPage?: number
}

const usePagination = ({
  totalItems,
  itemsPerPage,
  initialPage = 1,
}: UsePaginationProps) => {
  const [page, setPage] = useState(initialPage)
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const nextPage = () => {
    setPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage))
  }

  const prevPage = () => {
    setPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage))
  }

  const noMorePrev = page === 1
  const noMoreNext = page === totalPages

  return {
    page,
    totalPages,
    prevPage,
    nextPage,
    noMorePrev,
    noMoreNext,
  }
}

export default usePagination
