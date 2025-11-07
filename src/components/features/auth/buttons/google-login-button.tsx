'use client';

import { useRouter } from 'next/navigation';
import SocialLoginButton from './social-login-button';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

interface GoogleLoginButtonProps {
  onModalClose: () => void;
}

export default function GoogleLoginButton({
  onModalClose,
}: GoogleLoginButtonProps) {
  const router = useRouter();

  const login = () => {
    router.push(`${BASE_URL}/oauth2/authorization/google`);
    onModalClose();
  };

  return <SocialLoginButton provider="google" onClick={login} />;
}
