import { useRouter } from 'next/navigation'

const useGoBack = (fallbackUrl = '/') => {
  const router = useRouter()

  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(fallbackUrl)
    }
  }

  return goBack
}

export default useGoBack
