import clsx from 'clsx';
import type { ComponentProps } from 'react';
import XIcon from '@/assets/icons/x/14.svg';
import { FormInput } from '@/components/commons/text-fields/input';

interface ClearableInputProps extends ComponentProps<typeof FormInput> {
  onClear: () => void;
}

/**
 * 삭제 버튼이 있는 input 컴포넌트
 * @param onClear - 삭제 버튼 핸들러
 */
export default function ClearableInput({
  onClear,
  className,
  ...props
}: ClearableInputProps) {
  return (
    <div className="relative">
      <FormInput className={clsx('pr-[26px]', className)} {...props} />
      <button
        type="button"
        onClick={onClear}
        className="absolute right-3.5 top-1/2 -translate-y-1/2"
        aria-label="삭제하기"
      >
        <XIcon className="text-icon-light" aria-hidden="true" />
      </button>
    </div>
  );
}
