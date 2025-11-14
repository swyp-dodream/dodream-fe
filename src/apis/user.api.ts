import type { ProfileType, UserType } from '@/types/auth.type';
import { tokenStorage } from '@/utils/auth.util';
import { authApi } from './fetcher/api';

const userApi = {
  /** 유저 정보 */
  getUser: () => authApi.get<UserType>('/api/auth/me'),

  /** 로그아웃 */
  logout: async () => {
    try {
      await authApi.post('/api/auth/logout');
      console.log('로그아웃 성공');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    } finally {
      // API 성공/실패 관계없이 로컬 정리
      tokenStorage.clearAll();
    }
  },

  /** 유저 프로필 존재 여부 */
  getProfileExists: () =>
    authApi.get<{ exists: boolean }>('/api/profiles/me/exists'),

  /** 유저 프로필 */
  getProfile: () => authApi.get<ProfileType>('/api/profiles/me'),
};

export default userApi;
