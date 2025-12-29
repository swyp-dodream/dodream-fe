'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MYPAGE_MENU_LIST } from '@/constants/menus/mypage';
import { useLogout } from '@/hooks/auth/use-logout';

export default function MyPageNavigation() {
  const pathname = usePathname();
  const { logout } = useLogout();

  return (
    <nav
      aria-label="마이페이지 메뉴"
      className="col-span-2 h-full border-r-1 border-border-primary"
    >
      <ul className="flex flex-col gap-7 sticky top-32">
        {MYPAGE_MENU_LIST.map(({ label, href, icon, type = 'link' }) => {
          const isActive = type === 'link' && pathname.startsWith(href);
          const Icon = icon.default;

          return (
            <li key={label}>
              {type === 'button' ? (
                <button
                  type="button"
                  className="flex items-center gap-4 heading-md text-subtle"
                  onClick={logout}
                >
                  <Icon aria-hidden className="text-icon-light" />
                  <span>{label}</span>
                </button>
              ) : (
                <Link
                  aria-current={isActive ? 'page' : undefined}
                  className="flex items-center gap-4 heading-md"
                  href={href}
                >
                  <Icon
                    aria-hidden
                    className={isActive ? 'text-icon-dark' : 'text-icon-light'}
                  />
                  <span className={isActive ? 'text-primary' : 'text-subtle'}>
                    {label}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
