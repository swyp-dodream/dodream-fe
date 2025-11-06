import clsx from 'clsx';
import { DropdownMenu } from 'radix-ui';
import ArrowIcon from '@/assets/icons/chevron-down/16.svg';

interface DropdownItem {
  label: string;
  onSelect?: () => void;
  disabled?: boolean;
}

interface DropdownProps {
  items: DropdownItem[];
  className?: string;
}

/**
 * 드롭다운 컴포넌트
 * @param items - 드롭다운 아이템
 * @example
 * <Dropdown
 *   items={[
 *     { label: '프로필', onSelect: () => console.log('프로필') },
 *     { label: '설정', onSelect: () => console.log('설정') },
 *     { label: '로그아웃', onSelect: () => console.log('로그아웃') },
 *   ]}
 * />
 */
export default function Dropdown({ items, className }: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="py-3 px-4 body-lg-medium bg-container-primary rounded-md flex items-center justify-between w-[180px] outline-none group"
        >
          메뉴 열기
          <ArrowIcon className="text-icon-light group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={clsx(
            'bg-surface rounded-md shadow-card p-3 w-[180px] space-y-2 body-md-medium',
            className,
          )}
        >
          {items.map((item) => (
            <DropdownMenu.Item
              key={item.label}
              onSelect={item.onSelect}
              disabled={item.disabled}
              className="px-2 py-2 cursor-pointer hover:bg-primary rounded outline-none"
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
