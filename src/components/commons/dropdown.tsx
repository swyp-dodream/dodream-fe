import clsx from 'clsx';
import { DropdownMenu } from 'radix-ui';
import { forwardRef } from 'react';
import ArrowIcon from '@/assets/icons/chevron-down/16.svg';
import DropdownButton from './buttons/dropdown-button';

interface DropdownItem {
  label: string;
  onSelect?: () => void;
}

interface DropdownProps {
  items: DropdownItem[];
  label: string;
  isError?: boolean;
  className?: string;
}

/**
 * 드롭다운 컴포넌트
 * @param items - 드롭다운 아이템
 * @param label - 드롭다운 라벨 (텍스트 기본값)
 * @param isError - 에러 여부
 * @example
 * <Dropdown
 *   label="메뉴 선택"
 *   items={[
 *     { label: '프로필', onSelect: () => console.log('프로필') },
 *     { label: '설정', onSelect: () => console.log('설정') },
 *     { label: '로그아웃', onSelect: () => console.log('로그아웃') },
 *   ]}
 * />
 */
const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  ({ items, label, isError = false, className }, ref) => {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <DropdownButton ref={ref} label={label} isError={isError}>
            <ArrowIcon className="text-icon-light group-data-[state=open]:rotate-180" />
          </DropdownButton>
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
                className="px-2 py-2 cursor-pointer hover:bg-primary rounded outline-none"
              >
                {item.label}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  },
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
