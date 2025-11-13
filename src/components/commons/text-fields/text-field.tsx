import clsx from 'clsx';
import type { Ref } from 'react';

interface TextFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  resizable?: boolean;
  error?: string;
  className?: string;
  ref?: Ref<HTMLTextAreaElement>;
}

/**
 * 여러 줄 텍스트 필드
 * @param value - 텍스트 내용
 * @param maxLength - 텍스트 길이 제한 (전달할 경우 남은 글자수 노출)
 * @param resizable - 사이즈 조절 가능 여부
 * @param error - 검증 에러 메시지
 */
export default function TextField({
  value,
  maxLength,
  error,
  resizable = true,
  className,
  ref,
  ...props
}: TextFieldProps) {
  const currentLength = typeof value === 'string' ? value.length : 0;

  return (
    <div className="flex flex-col items-end gap-4">
      <textarea
        ref={ref}
        rows={6}
        value={value}
        maxLength={maxLength}
        className={clsx(
          'py-3 px-4 bg-surface border rounded-md placeholder:text-gray-400 body-lg-medium outline-none',
          resizable && 'resize-y',
          !resizable && 'resize-none',
          error ? 'border-border-error' : 'border-border-primary',
          className,
        )}
        {...props}
      />
      <div className="flex justify-between w-full items-center">
        {error && <p className="body-sm-medium text-error">{error}</p>}
        {maxLength && (
          <p className="body-sm-regular text-secondary ml-auto">
            {maxLength - currentLength >= 0 ? maxLength - currentLength : 0}자
            남음
          </p>
        )}
      </div>
    </div>
  );
}
