import type { UserType } from '@/types/auth.type';
import { authApi } from './fetcher/api';

const profileApi = {
  /** 유저 정보 */
  getUser: () => authApi.get<UserType>('/api/auth/me'),

  /** 로그아웃 */
  logout: () => authApi.post('api/auth/logout'),

  /** 유저 프로필 존재 여부 */
  getProfileExists: () =>
    authApi.get<{ exists: boolean }>('/api/profiles/me/exists'),

  /** 유저 프로필 */
  getProfile: () => authApi.get<UserType>('/api/profiles/me'),
};

export default profileApi;
