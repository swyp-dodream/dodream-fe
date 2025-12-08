import type { UserType } from '@/types/auth.type';
import type { ProfileType } from '@/types/profile.type';
import { tokenStorage } from '@/utils/auth.util';
import { api } from './fetcher/api';

const userApi = {
  /** 유저 정보 */
  getUser: () => api.get<UserType>('/api/auth/me'),

  /** 로그아웃 */
  logout: async () => {
    try {
      await api.post('/api/auth/logout');
      console.log('로그아웃 성공');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    } finally {
      // TODO: 삭제
      tokenStorage.clearAll();
    }
  },

  /** 회원탈퇴 */
  deleteUser: () => api.delete<void>('/api/users/withdraw'),

  /** 유저 프로필 존재 여부 */
  getProfileExists: () =>
    api.get<{ exists: boolean }>('/api/profiles/me/exists'),

  /** 유저 프로필 */
  getProfile: () => api.get<ProfileType>('/api/profiles/me'),
};

export default userApi;
