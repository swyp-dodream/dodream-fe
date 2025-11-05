import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  className?: string;
}

/**
 * 한 줄 입력 필드 컴포넌트
 * @param isError - 에러 상태 여부 (border 색상 변경)
 * - input의 기본 속성은 모두 사용 가능합니다.
 *
 * @example
 * // 에러 상태
 * <Input
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   isError={!isValidEmail}
 *   placeholder="이메일"
 * />
 */
export default function Input({
  isError = false,
  className,
  ...props
}: InputProps) {
  return (
    <input
      className={clsx(
        'py-3 px-4 bg-surface border rounded-md placeholder:text-gray-400 body-lg-medium outline-none',
        {
          'border-border-primary': !isError,
          'border-border-error': isError,
        },
        className,
      )}
      {...props}
    />
  );
}
