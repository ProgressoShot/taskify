import LoginForm from '@/app/login/components/LoginForm'
import AuthPageLayout from '@/layouts/AuthPageLayout'

export default function LoginPage() {
  return (
    <AuthPageLayout page='login'>
      <LoginForm />
    </AuthPageLayout>
  )
}
