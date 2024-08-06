import SignupForm from '@/app/signup/components/SignupForm'
import AuthPageLayout from '@/layouts/AuthPageLayout'

export default function SignupPage() {
  return (
    <AuthPageLayout page='signup'>
      <SignupForm />
    </AuthPageLayout>
  )
}
