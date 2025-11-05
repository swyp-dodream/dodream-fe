import clsx from 'clsx';
import type { ComponentProps } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  className?: string;
}

/**
 * 한 줄 입력 필드 컴포넌트
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
  className,
  isError = false,
  ...props
}: InputProps) {
  return (
    <input
      className={clsx(
        'py-3 px-4 bg-surface border rounded-md placeholder:text-gray-400 body-lg-medium outline-none ',
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

interface FormInputProps extends ComponentProps<typeof Input> {
  children?: React.ReactNode;
  errorMessage?: string;
}

/**
 * 에러 메시지를 포함하는 input
 * @param errorMessage - 에러 메시지
 * @param children - input과 에러 메시지 사이에 넣을 요소
 */
export function FormInput({
  children,
  errorMessage,
  ...props
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <Input isError={!!errorMessage} {...props} />
      {children}
      {errorMessage && (
        <p className="body-sm-medium text-error">{errorMessage}</p>
      )}
    </div>
  );
}
