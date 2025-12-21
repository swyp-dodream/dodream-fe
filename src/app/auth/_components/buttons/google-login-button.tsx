'use client';

import { usePathname } from 'next/navigation';
import SocialLoginButton from './social-login-button';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

interface GoogleLoginButtonProps {
  onModalClose: () => void;
}

export default function GoogleLoginButton({
  onModalClose,
}: GoogleLoginButtonProps) {
  const pathname = usePathname();
  const callback = encodeURIComponent(pathname).toString();

  const login = async () => {
    window.location.href = `${BASE_URL}/api/auth/oauth2/authorize/google?frontend_url=${encodeURIComponent(
      callback,
    )}`;
    onModalClose();
  };

  return <SocialLoginButton provider="google" onClick={login} />;
}
