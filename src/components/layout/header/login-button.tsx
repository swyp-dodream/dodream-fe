'use client';

import { overlay } from 'overlay-kit';
import LoginModal from '@/app/auth/_components/login-modal';
import Button from '@/components/commons/buttons/button';

export default function LoginButton() {
  const handleLogin = () => {
    overlay.open(({ isOpen, close }) => (
      <LoginModal isOpen={isOpen} onClose={close} />
    ));
  };

  return <Button onClick={handleLogin}>회원가입/로그인</Button>;
}
