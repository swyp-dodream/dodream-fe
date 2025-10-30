'use client';

import Image from 'next/image';
import Link from 'next/link';
import { overlay } from 'overlay-kit';
import BellIcon from '@/assets/icons/bell/20.svg';
import EditIcon from '@/assets/icons/edit/20.svg';
import MessageCircleIcon from '@/assets/icons/message-circle/20.svg';
import Button from '../commons/buttons/button';
import LoginModal from '../features/auth/login-modal';

/**
 * 헤더의 네비게이션
 */
export default function Navigation() {
  // TODO: 로그인 여부 로직 변경
  const isAuthenticated = false;

  return isAuthenticated ? (
    // TODO: 네비게이션 링크 URL 변경
    // 로그인 상태: 네비게이션 바 노출
    <nav className="flex" aria-label="사용자 메뉴">
      <ul className="flex items-center gap-7">
        <li>
          <Link href="/" aria-label="채팅">
            <MessageCircleIcon className="text-icon-dark" />
          </Link>
        </li>

        <li className="flex items-center">
          <button type="button" aria-label="알림">
            <BellIcon className="text-icon-dark" />
          </button>
        </li>

        <li>
          <Link href="/" aria-label="글쓰기">
            <EditIcon className="text-icon-dark" />
          </Link>
        </li>

        <li className="ml-2">
          <Link href="/" aria-label="프로필" className="flex h-8 w-8 relative">
            <Image
              src="/avatar/default-avatar.png"
              alt="프로필 이미지"
              fill
              sizes="32px"
            />
          </Link>
        </li>
      </ul>
    </nav>
  ) : (
    // 미로그인 상태: 로그인 버튼 노출
    <Button
      onClick={() => {
        overlay.open(({ isOpen, close }) => (
          <LoginModal isOpen={isOpen} onClose={close} />
        ));
      }}
    >
      회원가입/로그인
    </Button>
  );
}
