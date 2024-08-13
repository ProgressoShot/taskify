import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface UseRedirect {
  requireAuth: boolean
}

const useRedirect = ({ requireAuth }: UseRedirect) => {
  const router = useRouter()
  useEffect(() => {
    const token = sessionStorage.getItem('accessToken')

    if (token && !requireAuth) {
      router.push('/mydashboard')
    } else if (!token && requireAuth) {
      router.push('/')
    }
  }, [router, requireAuth])
}

export default useRedirect
