'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MYPAGE_MENU_LIST } from '@/constants/menus/mypage';

export default function MyPageNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="마이페이지 메뉴"
      className="col-span-2 h-full border-r-1 border-border-primary"
    >
      <ul className="flex flex-col gap-7 sticky top-32">
        {MYPAGE_MENU_LIST.map(({ label, href, icon }) => {
          const isActive = pathname.startsWith(href);
          const Icon = icon.default;

          return (
            <li key={href}>
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
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
