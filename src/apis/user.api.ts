import type { UserType } from '@/types/auth.type';
import type { ProfileType } from '@/types/profile.type';
import { api } from './fetcher/fetcher';

const userApi = {
  /** 유저 정보 */
  getUser: () => api.get<UserType>('/api/auth/me'),

  /** 로그아웃 */
  logout: () => api.post('/api/auth/logout'),

  /** 회원탈퇴 */
  deleteUser: () => api.delete<void>('/api/users/withdraw'),

  /** 유저 프로필 존재 여부 */
  getProfileExists: async (): Promise<{ exists: boolean }> => {
    try {
      return await api.get<{ exists: boolean }>('/api/profiles/me/exists');
    } catch {
      // 401 등 에러 시 프로필 없음으로 처리
      return { exists: false };
    }
  },

  /** 유저 프로필 */
  getProfile: () => api.get<ProfileType>('/api/profiles/me'),
};

export default userApi;
