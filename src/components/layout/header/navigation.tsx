import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import Link from 'next/link';
import { serverApis } from '@/apis/server.api';
import EditIcon from '@/assets/icons/edit/20.svg';
import MessageCircleIcon from '@/assets/icons/message-circle/20.svg';
import NotificationDropdown from '@/components/features/notifications/notification-dropdown';
import { userQueryOptions } from '@/hooks/auth/use-get-user';
import { profileQueryOptions } from '@/hooks/profile/use-get-profile';
import { getQueryClient } from '@/lib/query-client';
import ProfileDropdown from './profile-dropdown';

/** 헤더의 네비게이션 컴포넌트 */
export default async function Navigation() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      ...userQueryOptions,
      queryFn: () => serverApis.user.getUser(),
    }),
    queryClient.prefetchQuery({
      ...profileQueryOptions,
      queryFn: () => serverApis.user.getProfile(),
    }),
  ]);

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
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ProfileDropdown />
          </HydrationBoundary>
        </li>
      </ul>
    </nav>
  );
}
