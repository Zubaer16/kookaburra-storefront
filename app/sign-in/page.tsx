import type { Metadata } from 'next'
import { AuthPreview } from '@/components/account/auth-preview'
export const metadata: Metadata = {
  title: 'Sign In Preview',
  robots: { index: false, follow: false },
}
export default function SignInPage() {
  return <AuthPreview mode="sign-in" />
}
