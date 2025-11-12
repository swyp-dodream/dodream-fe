// mypage-menu.constant.ts
import type { ComponentType, SVGProps } from 'react';
import BookmarkIcon16 from '@/assets/icons/book/16.svg';
import BookmarkIcon20 from '@/assets/icons/book/20.svg';
import FileTextIcon16 from '@/assets/icons/file-text/16.svg';
import FileTextIcon20 from '@/assets/icons/file-text/20.svg';
import LogOutIcon16 from '@/assets/icons/log-out/16.svg';
import LogOutIcon20 from '@/assets/icons/log-out/20.svg';
import ParticipationsIcon16 from '@/assets/icons/send/16.svg';
import ParticipationsIcon20 from '@/assets/icons/send/20.svg';
import UserIcon16 from '@/assets/icons/user/16.svg';
import UserIcon20 from '@/assets/icons/user/20.svg';

export type MyPageMenu = {
  label: string;
  href: string;
  icon: {
    small: ComponentType<SVGProps<SVGSVGElement>>;
    default: ComponentType<SVGProps<SVGSVGElement>>;
  };
  type?: 'link' | 'button';
  onClick?: () => void;
};

export const MYPAGE_MENU_LIST = [
  {
    label: '북마크',
    href: '/mypage/bookmarks',
    icon: {
      small: BookmarkIcon16,
      default: BookmarkIcon20,
    },
    type: 'link',
  },
  {
    label: '내가 쓴 글',
    href: '/mypage/posts',
    icon: {
      small: FileTextIcon16,
      default: FileTextIcon20,
    },
    type: 'link',
  },
  {
    label: '참여 내역',
    href: '/mypage/participations',
    icon: {
      small: ParticipationsIcon16,
      default: ParticipationsIcon20,
    },
    type: 'link',
  },
  {
    label: '계정 설정',
    href: '/mypage/settings',
    icon: {
      small: UserIcon16,
      default: UserIcon20,
    },
    type: 'link',
  },
  {
    label: '로그아웃',
    href: '#',
    icon: {
      small: LogOutIcon16,
      default: LogOutIcon20,
    },
    type: 'button',
  },
] as const satisfies ReadonlyArray<MyPageMenu>;
