import Link from 'next/link';
import { serverApis } from '@/apis/server.api';
import EditIcon from '@/assets/icons/edit/20.svg';
import MessageCircleIcon from '@/assets/icons/message-circle/20.svg';
import NotificationDropdown from '@/components/features/notifications/notification-dropdown';
import ProfileDropdown from './profile-dropdown';

/** 헤더의 네비게이션 컴포넌트 */
export default async function Navigation() {
  const user = await serverApis.user.getUser();
  const profile = await serverApis.user.getProfile();

  return (
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
  );
}
