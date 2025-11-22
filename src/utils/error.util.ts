import type { ErrorType } from '@/types/error.type';

/**
 * 에러 타입인지 확인
 * @param error - 에러 객체
 */
export function isErrorType(error: unknown): error is ErrorType {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'error' in error &&
    'message' in error
  );
}
