'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import { MYPAGE_MENU_LIST } from '@/constants/menus/mypage';
import useGetUser from '@/hooks/auth/use-get-user';

export default function NavigationProfile() {
  const { data: user } = useGetUser();

  if (!user) return null;

  return (
    <DropdownMenu.Root>
      {/* 트리거 - 헤더 프로필 이미지 */}
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="프로필 메뉴"
          className="flex h-8 w-8 relative rounded-full overflow-hidden focus:outline-none"
        >
          <Image
            src={user.profileImageUrl ?? '/avatar/default-avatar.png'}
            alt="프로필 이미지"
            fill
            sizes="32px"
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="w-[200px] flex flex-col gap-4 bg-dropdown-black-90 text-text-on-brand shadow-card rounded-lg overflow-hidden z-50 p-5"
          sideOffset={8}
          align="end"
        >
          {/* 사용자 정보 섹션 */}
          <section aria-labelledby="user-info-heading">
            <h2 id="user-info-heading" className="sr-only">
              사용자 정보
            </h2>
            <div className="flex flex-col">
              <strong className="body-md-medium">{user.name}</strong>
              <span className="body-sm-regular text-subtle">{user.email}</span>
              <DropdownMenu.Item asChild>
                <Link
                  href={`/profile/${user.id}`}
                  className="py-3 bg-dropdown-white-10 rounded-full text-center mt-4 outline-none"
                >
                  내 프로필 보기
                </Link>
              </DropdownMenu.Item>
            </div>
          </section>

          <DropdownMenu.Separator className="h-px bg-border-dropdown" />

          {/* 메뉴 네비게이션 */}
          <nav aria-label="마이페이지 메뉴">
            <ul className="flex flex-col gap-3">
              {MYPAGE_MENU_LIST.map(({ label, href, icon }) => {
                const Icon = icon.small;

                return (
                  <li key={href}>
                    <DropdownMenu.Item asChild>
                      <Link
                        className="flex items-center body-md-medium gap-4 p-2 outline-none"
                        href={href}
                      >
                        <Icon aria-hidden className="text-white" />
                        <span className="text-white">{label}</span>
                      </Link>
                    </DropdownMenu.Item>
                  </li>
                );
              })}
            </ul>
          </nav>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
