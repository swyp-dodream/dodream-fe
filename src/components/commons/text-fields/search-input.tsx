import clsx from 'clsx';
import type { ComponentProps } from 'react';
import SearchIcon from '@/assets/icons/search/14.svg';
import Input from '@/components/commons/text-fields/input';

interface SearchInputProps extends ComponentProps<typeof Input> {
  onSearch: () => void;
  buttonType?: 'button' | 'reset' | 'submit';
  className?: string;
}

/**
 * 검색 버튼이 있는 input 컴포넌트
 * @param onSearch - 검색 버튼 핸들러
 * @param buttonType - button의 타입 (검색일 경우 submit)
 * TODO: 검색에 API 사용할 경우 로딩 처리
 */
export default function SearchInput({
  onSearch,
  buttonType = 'button',
  className,
  ...props
}: SearchInputProps) {
  return (
    <div className="relative">
      <Input className={clsx('pl-[34px]', className)} {...props} />
      <button
        type={buttonType}
        onClick={onSearch}
        className="absolute left-3.5 top-1/2 -translate-y-1/2"
        aria-label="검색하기"
      >
        <SearchIcon className="text-icon-light" />
      </button>
    </div>
  );
}
