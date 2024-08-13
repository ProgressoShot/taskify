'use client'

import SignupForm from '@/app/signup/components/SignupForm'
import useRedirect from '@/hooks/useRedirect'
import AuthPageLayout from '@/layouts/AuthPageLayout'

export default function SignupPage() {
  useRedirect({ requireAuth: false })
  return (
    <AuthPageLayout page='signup'>
      <SignupForm />
    </AuthPageLayout>
  )
}
