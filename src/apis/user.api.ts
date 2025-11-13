import { QUERY_KEY } from '@/constants/query-key.constant';
import { queryClient } from '@/lib/query-client';
import type { UserType } from '@/types/auth.type';
import { tokenStorage } from '@/utils/auth.util';
import { authApi } from './fetcher/api';

const userApi = {
  /** 유저 정보 */
  getUser: () => authApi.get<UserType>('/api/auth/me'),

  /** 로그아웃 */
  logout: async () => {
    try {
      await authApi.post('/api/auth/logout');
      tokenStorage.clearAll();
      queryClient.removeQueries({ queryKey: [QUERY_KEY.user] });
    } catch {
      throw Error('로그아웃 실패');
    }
  },

  /** 유저 프로필 존재 여부 */
  getProfileExists: () =>
    authApi.get<{ exists: boolean }>('/api/profiles/me/exists'),

  /** 유저 프로필 */
  getProfile: () => authApi.get<UserType>('/api/profiles/me'),
};

export default userApi;
