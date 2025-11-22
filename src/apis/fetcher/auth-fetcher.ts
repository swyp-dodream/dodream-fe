import type { ErrorType } from '@/types/error.type';
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
        ...options.headers,
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    });
  } catch (error) {
    // 401/402 에러 시 토큰 갱신 처리
    const status = (error as ErrorType)?.code;

    if (status === 401 || status === 402) {
      const newToken = await refreshAccessToken();

      if (!newToken) {
        tokenStorage.clearAll();
        throw error;
      }

      // 새 토큰으로 재시도
      return fetcher<T>(endpoint, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        },
      });
    }

    throw error;
  }
}

/**
 * 리프레시 토큰으로 토큰 재발급
 */
async function refreshAccessToken(): Promise<string | null> {
  try {
    const refreshToken = tokenStorage.getRefreshToken();

    if (!refreshToken) return null;

    const res = await fetch(`/api/auth/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Refresh-Token': refreshToken,
      },
    });

    if (!res.ok) {
      console.error('토큰 재발급 실패', res.status);
      return null;
    }

    const { accessToken } = await res.json();
    tokenStorage.setToken(accessToken);

    return accessToken;
  } catch {
    return null;
  }
}
