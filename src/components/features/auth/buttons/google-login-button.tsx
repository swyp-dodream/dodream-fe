'use client';

import SocialLoginButton from './social-login-button';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

interface GoogleLoginButtonProps {
  onModalClose: () => void;
}

export default function GoogleLoginButton({
  onModalClose,
}: GoogleLoginButtonProps) {
  const login = () => {
    window.location.href = `${BASE_URL}/oauth2/authorization/google`;
    onModalClose();
  };

  return <SocialLoginButton provider="google" onClick={login} />;
}
