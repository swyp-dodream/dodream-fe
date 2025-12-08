import Link from 'next/link';
import { serverApis } from '@/apis/server-api';
import EditIcon from '@/assets/icons/edit/20.svg';
import MessageCircleIcon from '@/assets/icons/message-circle/20.svg';
import Logo from '@/assets/logo/logo.svg';
import NotificationDropdown from '@/components/features/notifications/notification-dropdown';
import LoginButton from './login-button';
import ProfileDropdown from './profile-dropdown';

export default async function Header() {
  const isProfileExists = await serverApis.user.getProfileExists();
  const user = await serverApis.user.getUser();
  const profile = await serverApis.user.getProfile();

  return (
    <header className="h-13 sticky top-0 flex items-center shrink-0 bg-surface border-b border-border-primary z-50">
      <div className="content-layout flex justify-between items-center">
        <h1>
          <Link href="/">
            <Logo aria-hidden="true" className="text-brand" />
            <span className="sr-only">두드림</span>
          </Link>
        </h1>
        {isProfileExists ? (
          // 로그인 상태: 네비게이션 바 노출
          <nav className="flex" aria-label="사용자 메뉴">
            <ul className="flex items-center gap-7">
              <li>
                <Link href="/chat" aria-label="채팅">
                  <MessageCircleIcon className="text-icon-dark" />
                </Link>
              </li>

              {/* 알림 드롭다운 */}
              <li className="flex items-center">
                <NotificationDropdown />
              </li>

              {/* 글쓰기 */}
              <li>
                <Link href="/posts/new" aria-label="글쓰기">
                  <EditIcon className="text-icon-dark" />
                </Link>
              </li>

              {/* 프로필 드롭다운 */}
              <li className="ml-2">
                <ProfileDropdown user={user} profile={profile} />
              </li>
            </ul>
          </nav>
        ) : (
          // 미로그인 상태: 로그인 버튼 노출
          <LoginButton />
        )}
      </div>
    </header>
  );
}
