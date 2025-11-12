'use client';

import clsx from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  variant?: 'light' | 'dark';
  className?: string;
}

/**
 * 한 줄 입력 필드 컴포넌트
 * - input의 기본 속성은 모두 사용 가능합니다.
 * @param isError - 에러 여부
 * @param variant - 스타일
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
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, isError = false, variant = 'light', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          'py-3 px-4 rounded-md outline-none',
          {
            'border-border-primary': !isError,
            'border-border-error': isError,
          },
          {
            'placeholder:text-gray-400 border bg-surface body-lg-medium':
              variant === 'light',
            'placeholder:text-subtle bg-primary body-md-regular':
              variant === 'dark',
          },
          className,
        )}
        {...props}
        aria-invalid={isError}
      />
    );
  },
);

Input.displayName = 'Input';

interface FormInputProps extends ComponentProps<typeof Input> {
  id: string;
  children?: React.ReactNode;
  errorMessage?: string;
}

/**
 * 에러 메시지를 포함하는 input
 * @param errorMessage - 에러 메시지
 * @param children - input과 에러 메시지 사이에 넣을 요소
 */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ children, errorMessage, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <Input
          id={id}
          ref={ref}
          isError={!!errorMessage}
          aria-describedby={errorMessage ? `${id}-error` : undefined}
          {...props}
        />
        {children}
        {errorMessage && (
          <p id={`${id}-error`} className="body-sm-medium text-error">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';

export default Input;
