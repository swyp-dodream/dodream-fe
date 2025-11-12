import { BASE_URL } from '@/constants/auth.constant';
import { tokenStorage } from '@/utils/auth.util';
import fetcher from './fetcher';

export default async function authenticatedFetcher<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const accessToken = tokenStorage.getToken();

  try {
    return await fetcher<T>(endpoint, {
      ...options,
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...options.headers,
      },
    });
  } catch (error) {
    // 401/402 에러 시 토큰 갱신 처리
    if (
      error instanceof Error &&
      (error.message.includes('401') || error.message.includes('402'))
    ) {
      const newToken = await refreshAccessToken();

      if (!newToken) {
        tokenStorage.clearAll(); // 모든 토큰 삭제
        window.location.href = '/';
        throw error;
      }

      // 새 토큰으로 재시도
      return fetcher<T>(endpoint, {
        ...options,
        headers: {
          Authorization: `Bearer ${newToken}`,
          ...options.headers,
        },
      });
    }

    throw error;
  }
}

/**
 * 리프레시 토큰 발급 함수
 */
async function refreshAccessToken(): Promise<string | null> {
  try {
    const refreshToken = tokenStorage.getRefreshToken();

    if (!refreshToken) return null;

    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!res.ok) return null;

    const { accessToken } = await res.json();
    tokenStorage.setToken(accessToken);

    return accessToken;
  } catch {
    return null;
  }
}
