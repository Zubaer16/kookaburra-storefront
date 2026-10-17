import type { Metadata } from 'next'
import { AuthPreview } from '@/components/account/auth-preview'
export const metadata: Metadata = {
  title: 'Sign Up Preview',
  robots: { index: false, follow: false },
}
export default function SignUpPage() {
  return <AuthPreview mode="sign-up" />
}
