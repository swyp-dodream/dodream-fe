'use client';

import Link from 'next/link';
import { overlay } from 'overlay-kit';
import LoginModal from '@/app/auth/_components/login-modal';
import EditIcon from '@/assets/icons/edit/20.svg';
import MessageCircleIcon from '@/assets/icons/message-circle/20.svg';
import { useGetProfileExists } from '@/hooks/profile/use-get-profile';
import Button from '../commons/buttons/button';
import NotificationDropdown from '../features/notifications/notification-dropdown';
import NavigationProfile from './navigation-profile';

/**
 * 헤더의 네비게이션
 */
export default function Navigation() {
  const { data: profileExists } = useGetProfileExists();

  const handleLogin = () => {
    overlay.open(({ isOpen, close }) => (
      <LoginModal isOpen={isOpen} onClose={close} />
    ));
  };

  return profileExists?.exists ? (
    // 로그인 상태: 네비게이션 바 노출
    <nav className="flex" aria-label="사용자 메뉴">
      <ul className="flex items-center gap-7">
        <li>
          <Link href="/chat" aria-label="채팅">
            <MessageCircleIcon className="text-icon-dark" />
          </Link>
        </li>

        <li className="flex items-center">
          <NotificationDropdown />
        </li>

        <li>
          <Link href="/posts/new" aria-label="글쓰기">
            <EditIcon className="text-icon-dark" />
          </Link>
        </li>

        <li className="ml-2">
          <NavigationProfile />
        </li>
      </ul>
    </nav>
  ) : (
    // 미로그인 상태: 로그인 버튼 노출
    <Button onClick={handleLogin}>회원가입/로그인</Button>
  );
}
