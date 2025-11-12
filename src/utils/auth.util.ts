import { TOKEN_STORAGE_KEY } from '@/constants/auth.constant';
import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';

/**
 * 로컬 스토리지 토큰 관리 함수
 */
export const tokenStorage = {
  // Access Token
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_STORAGE_KEY.token, token);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.user] });
    }
  },
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_STORAGE_KEY.token);
    }
    return null;
  },

  // Refresh Token
  setRefreshToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_STORAGE_KEY.refresh_token, token);
    }
  },
  getRefreshToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_STORAGE_KEY.refresh_token);
    }
    return null;
  },

  // 전체 토큰 삭제
  clearAll: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_STORAGE_KEY.token);
      localStorage.removeItem(TOKEN_STORAGE_KEY.refresh_token);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.user] });
    }
  },

  // 토큰 보유 여부
  hasToken: (): boolean => {
    return !!tokenStorage.getToken();
  },
};
