import { cookies } from 'next/headers';
import { createApiMethods } from './create-api';
import { fetcher } from './fetcher';

/**
 * 서버 컴포넌트 전용 fetcher
 * - Next.js cookies()를 사용하여 쿠키를 Cookie 헤더로 자동 전달
 */
async function serverFetcher<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  let headers: HeadersInit = {
    ...options.headers,
  };

  // 쿠키를 Cookie 헤더에 추가
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    const cookieHeader = allCookies
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ');

    if (cookieHeader) {
      headers = {
        ...headers,
        Cookie: cookieHeader,
      };
    }
  } catch {
    console.warn('서버 컴포넌트 또는 서버 액션 필요');
  }

  // 기존 fetcher 호출
  return fetcher<T>(endpoint, {
    ...options,
    headers,
    cache: options.cache || 'no-store',
    credentials: undefined,
  });
}

/**
 * 서버 API
 * Next.js cookies()를 사용하여 쿠키 전달
 * 서버 컴포넌트/Server Actions에서만 사용
 *
 * @example
 * await serverApi.get('/api/auth/me');
 */
export const serverApi = createApiMethods(serverFetcher);
