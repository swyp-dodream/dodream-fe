import type { UserType } from '@/types/auth.type';
import type { ProfileType } from '@/types/profile.type';
import { api } from './fetcher/api';

const userApi = {
  /** 유저 정보 */
  getUser: () => api.get<UserType>('/api/auth/me'),

  /** 로그아웃 */
  logout: () => api.post('/api/auth/logout'),

  /** 회원탈퇴 */
  deleteUser: () => api.delete<void>('/api/users/withdraw'),

  /** 유저 프로필 존재 여부 */
  getProfileExists: () =>
    api.get<{ exists: boolean }>('/api/profiles/me/exists'),

  /** 유저 프로필 */
  getProfile: () => api.get<ProfileType>('/api/profiles/me'),
};

export default userApi;
