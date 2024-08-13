'use client'

import LoginForm from '@/app/login/components/LoginForm'
import useRedirect from '@/hooks/useRedirect'
import AuthPageLayout from '@/layouts/AuthPageLayout'

export default function LoginPage() {
  useRedirect({ requireAuth: false })
  return (
    <AuthPageLayout page='login'>
      <LoginForm />
    </AuthPageLayout>
  )
}
