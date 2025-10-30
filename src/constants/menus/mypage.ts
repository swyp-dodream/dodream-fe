import type { ComponentType, SVGProps } from 'react';
import BookmarkIcon from '@/assets/icons/book/20.svg';
import FileTextIcon from '@/assets/icons/file-text/20.svg';
import LogOutIcon from '@/assets/icons/log-out/20.svg';
import ParticipationsIcon from '@/assets/icons/send/20.svg';
import UserIcon from '@/assets/icons/user/20.svg';

export type MyPageMenu = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const MYPAGE_MENU_LIST = [
  {
    label: '북마크',
    href: '/mypage/bookmarks',
    icon: BookmarkIcon,
  },
  {
    label: '내가 쓴 글',
    href: '/mypage/posts',
    icon: FileTextIcon,
  },
  {
    label: '참여 내역',
    href: '/mypage/participations',
    icon: ParticipationsIcon,
  },
  {
    label: '계정 설정',
    href: '/mypage/settings',
    icon: UserIcon,
  },
  {
    label: '로그아웃',
    href: '/logout',
    icon: LogOutIcon,
  },
] as const satisfies ReadonlyArray<MyPageMenu>;
